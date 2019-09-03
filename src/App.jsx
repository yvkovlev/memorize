import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import vkConnect from '@vkontakte/vkui-connect-promise';
import { Epic, View } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import { getToken } from 'utils/firebase';
import Home from 'panels/Home/index';
import Sets from 'panels/Sets';
import ViewSet from 'panels/ViewSet';
import EditSet from 'panels/EditSet';
import Tabbar from 'components/Tabbar';
import { StudySet } from 'panels/StudySet';
import { cn } from '@bem-react/classname';
import {
  requestUser as requestUserAction,
  receiveUser as receiveUserActions,
} from 'redux/user';

const cnApp = cn('App');

// TODO: обрабатывать activePanel
const App = (props) => {
  const { requestUser, receiveUser, layout } = props;
  const { activeStory, activePanel } = layout;

  useEffect(() => {
    async function getUserInfo() {
      try {
        requestUser();

        const userInfo = await vkConnect.send('VKWebAppGetUserInfo', {});
        const { token } = await getToken(userInfo.data.id);
        const receivedUser = {
          id: userInfo.data.id,
          firstName: userInfo.data.first_name,
          lastName: userInfo.data.last_name,
          token,
        };

        receiveUser(receivedUser);
      } catch (err) {
        throw new Error(err);
      }
    }
    getUserInfo();
  }, [receiveUser, requestUser]);

  return (
    <Epic
      activeStory={activeStory}
      tabbar={(
        <Tabbar />
      )}
    >
      <View id="sets" activePanel="sets">
        <Sets id="sets" />
      </View>
      <View id="control" activePanel={activePanel}>
        <EditSet id="editSet" />
        <ViewSet id="viewSet" />
        <StudySet id="studySet" className={cnApp('StudySet')} />
      </View>
      <View id="profile" activePanel="profile">
        <Home id="profile" go={() => {}} />
      </View>
    </Epic>
  );
};

App.propTypes = {
  layout: PropTypes.shape({
    activeStory: PropTypes.string.isRequired,
    activePanel: PropTypes.string,
  }).isRequired,
  requestUser: PropTypes.func.isRequired,
  receiveUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  layout: state.layout,
});

const mapDispatchToProps = {
  requestUser: requestUserAction,
  receiveUser: receiveUserActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
