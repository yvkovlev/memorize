import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from '@vkontakte/vkui';
import { setActivePanel as setActivePanelAction } from './actions';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

const App = ({ activePanel, setActivePanel }) => {
  const switchPanel = panel => setActivePanel(panel);
  return (
    <View activePanel={activePanel}>
      <Home id="home" go={switchPanel} />
      <Persik id="persik" go={switchPanel} />
    </View>
  );
};

App.propTypes = {
  activePanel: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activePanel: state.activePanel,
});

const mapDispatchToProps = dispatch => ({
  setActivePanel: activePanel => dispatch(setActivePanelAction(activePanel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
