import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Epic, View } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import Home from 'panels/Home/index';
import Sets from 'panels/Sets';
import ViewSet from 'panels/ViewSet';
import Tabbar from 'components/Tabbar';

// TODO: обрабатывать activePanel
const App = ({ layout }) => {
  const { activeStory, activePanel } = layout;

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
        <Home id="editSet" go={() => {}} />
        <ViewSet id="viewSet" />
        <Home id="studySet" go={() => {}} />
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
};

const mapStateToProps = state => ({
  layout: state.layout,
});

export default connect(
  mapStateToProps,
)(App);
