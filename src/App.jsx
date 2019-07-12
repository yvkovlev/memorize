import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Epic, View } from '@vkontakte/vkui';
import Tabbar from './components/Tabbar';
import { setActiveLayout as setActiveLayoutAction } from './redux/layout';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home/index';

// TODO: обрабатывать activePanel
const App = ({ layout, setActiveLayout }) => {
  const { activeStory, activePanel } = layout;

  return (
    <Epic
      activeStory={activeStory}
      tabbar={(
        <Tabbar />
      )}
    >
      <View id="sets" activePanel="home">
        <Home id="home" go={() => {}} />
      </View>
      <View id="control" activePanel={activePanel}>
        <Home id="editSet" go={() => {}} />
        <Home id="viewSet" go={() => {}} />
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
  setActiveLayout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  layout: state.layout,
});

const mapDispatchToProps = dispatch => ({
  setActiveLayout: layout => dispatch(setActiveLayoutAction(layout)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
