import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initiateLayoutChange as initiateLayoutChangeAction } from 'redux/layout';
import { isSetFormValidSelector } from 'redux/setForm';
import { getNextActivePanel } from 'components/Tabbar/Tabbar.util';
import BaseTabbar from './Tabbar';

const panelToIconConformance = new Map([
  [undefined, 'add'],
  ['editSet', 'approve'],
  ['viewSet', 'play'],
]);

const Tabbar = (props) => {
  const {
    activeStory,
    activePanel,
    initiateLayoutChange,
    isSetFormValid,
  } = props;

  const switchLayout = useCallback(story => () => {
    initiateLayoutChange({
      activeStory: story,
      activePanel: getNextActivePanel(story, activePanel),
    });
  }, [activePanel, initiateLayoutChange]);

  const icon = panelToIconConformance.get(activePanel);

  return (
    <BaseTabbar
      icon={icon}
      selected={activeStory}
      hidden={activePanel === 'studySet'}
      isSaveButtonActive={isSetFormValid}
      onClick={switchLayout}
    />
  );
};

Tabbar.propTypes = {
  // State to props
  activeStory: PropTypes.string.isRequired,
  activePanel: PropTypes.string,
  isSetFormValid: PropTypes.bool.isRequired,

  // Dispatch to props
  initiateLayoutChange: PropTypes.func.isRequired,
};

Tabbar.defaultProps = {
  activePanel: undefined,
};

const mapStateToProps = state => ({
  activeStory: state.layout.activeStory,
  activePanel: state.layout.activePanel,
  isSetFormValid: isSetFormValidSelector(state),
});

const mapDispatchToProps = dispatch => ({
  initiateLayoutChange: layout => dispatch(initiateLayoutChangeAction(layout)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabbar);
