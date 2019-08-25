import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Panel,
  PanelHeader,
  Spinner,
} from '@vkontakte/vkui';
import { cn } from '@bem-react/classname';

import SetsList from 'components/SetsList';
import {
  requestSets as requestSetsAction,
  setActiveSet as setActiveSetAction,
} from 'redux/sets';
import {
  setActiveLayout as setActiveLayoutAction,
} from 'redux/layout';
import { setShape } from 'panels/Sets/Sets.shape';

const cnSets = cn('Sets');

const Sets = ({
  id, sets, isRequesting, requestSets, setActiveSet, setActiveLayout,
}) => {
  const handleSetClick = useCallback(setId => () => {
    setActiveSet(setId);
    setActiveLayout({
      activeStory: 'control',
      activePanel: 'viewSet',
    });
  }, [setActiveSet, setActiveLayout]);

  useEffect(() => {
    requestSets();
  }, [requestSets]);

  const renderLoading = useCallback(() => {
    if (!isRequesting) {
      return null;
    }

    return (
      <div className={cnSets('', { centered: true })}>
        <Spinner size="medium" />
      </div>
    );
  }, [isRequesting]);

  const renderEmptySets = useCallback(() => {
    if (isRequesting || sets.length !== 0) {
      return null;
    }

    return (
      <div className={cnSets('', { centered: true })}>
        <h3 className={cnSets('Title', ['title-l'])}>Кажется, сетов еще нет</h3>
        <span className={cnSets('', ['subhead', 'subhead_secondary'])}>Но их можно легко добавить нажав на плюсик ниже :)</span>
      </div>
    );
  }, [isRequesting, sets.length]);

  const renderSets = useCallback(() => {
    if (isRequesting || sets.length === 0) {
      return null;
    }

    return (
      <>
        <span className={cnSets('Headline', ['headline'])}>Твои сеты</span>
        <SetsList
          sets={sets}
          onClick={handleSetClick}
        />
      </>
    );
  }, [handleSetClick, isRequesting, sets]);

  return (
    <Panel id={id} theme="white">
      <PanelHeader>Memorize</PanelHeader>
      <div className={cnSets()}>
        { renderLoading() }
        { renderEmptySets() }
        { renderSets() }
      </div>
    </Panel>
  );
};

Sets.propTypes = {
  id: PropTypes.string.isRequired,
  isRequesting: PropTypes.bool.isRequired,
  sets: PropTypes.arrayOf(setShape).isRequired,
  requestSets: PropTypes.func.isRequired,
  setActiveSet: PropTypes.func.isRequired,
  setActiveLayout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isRequesting: state.sets.isRequesting,
  sets: state.sets.list,
});

const mapDispatchToProps = dispatch => ({
  requestSets: () => dispatch(requestSetsAction()),
  setActiveSet: setId => dispatch(setActiveSetAction(setId)),
  setActiveLayout: layout => dispatch(setActiveLayoutAction(layout)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sets);
