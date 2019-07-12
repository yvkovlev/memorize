import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setActiveLayout as setActiveLayoutAction } from 'redux/layout';
import { getNextActivePanel } from 'components/Tabbar/Tabbar.util';
import BaseTabbar from './Tabbar';

const panelToIconConformance = new Map([
  [undefined, 'add'],
  ['editSet', 'approve'],
  ['viewSet', 'play'],
]);

const Tabbar = ({ activeStory, activePanel, setActiveLayout }) => {
  const switchLayout = story => () => setActiveLayout({
    activeStory: story,
    activePanel: getNextActivePanel(story, activePanel),
  });
  const icon = panelToIconConformance.get(activePanel);

  return (
    <BaseTabbar
      icon={icon}
      selected={activeStory}
      hidden={activePanel === 'studySet'}
      onClick={switchLayout}
    />
  );
};

Tabbar.propTypes = {
  setActiveLayout: PropTypes.func.isRequired,
  activeStory: PropTypes.string.isRequired,
  activePanel: PropTypes.string,
};

Tabbar.defaultProps = {
  activePanel: undefined,
};

const mapStateToProps = state => ({
  activeStory: state.layout.activeStory,
  activePanel: state.layout.activePanel,
});

const mapDispatchToProps = dispatch => ({
  setActiveLayout: layout => dispatch(setActiveLayoutAction(layout)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabbar);
