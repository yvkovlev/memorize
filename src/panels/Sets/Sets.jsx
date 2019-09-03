import React, { useCallback, useEffect, useState } from 'react';
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
import { userShape } from 'redux/user';
import { setShape } from 'panels/Sets/Sets.shape';
import { PANEL_HEADER } from 'panels/common';

const cnSets = cn('Sets');

const Sets = (props) => {
  const {
    id,
    sets,
    requestSets,
    setActiveSet,
    setActiveLayout,
    user,
  } = props;

  const [isBeforeRequestingSets, setIsBeforeRequestingSets] = useState(true);

  const isRequestingUser = user.data === null || user.isRequesting;
  const isRequesting = isBeforeRequestingSets || isRequestingUser || sets.isRequesting;

  useEffect(() => {
    if (user.data !== null && !user.isRequesting) {
      setIsBeforeRequestingSets(false);
      requestSets(user.data.id);
    }
  }, [user, requestSets]);

  const handleSetClick = useCallback(setId => () => {
    setActiveSet(setId);
    setActiveLayout({
      activeStory: 'control',
      activePanel: 'viewSet',
    });
  }, [setActiveSet, setActiveLayout]);

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
    if (isRequesting || sets.list.length !== 0) {
      return null;
    }

    return (
      <div className={cnSets('', { centered: true })}>
        <h3 className={cnSets('Title', ['title-l'])}>Кажется, сетов еще нет</h3>
        <span className={cnSets('', ['subhead', 'subhead_secondary'])}>Но их можно легко добавить нажав на плюсик ниже :)</span>
      </div>
    );
  }, [isRequesting, sets.list]);

  const renderSets = useCallback(() => {
    if (isRequesting || sets.list.length === 0) {
      return null;
    }

    return (
      <>
        <span className={cnSets('Headline', ['headline'])}>Твои сеты</span>
        <SetsList
          sets={sets.list}
          onClick={handleSetClick}
        />
      </>
    );
  }, [handleSetClick, isRequesting, sets]);

  return (
    <Panel id={id} theme="white">
      <PanelHeader>{ PANEL_HEADER }</PanelHeader>
      <div className={cnSets()}>
        { renderLoading() }
        { renderEmptySets() }
        { renderSets() }
      </div>
    </Panel>
  );
};

Sets.propTypes = {
  // Own props
  id: PropTypes.string.isRequired,

  // State to props
  sets: PropTypes.shape({
    list: PropTypes.arrayOf(setShape).isRequired,
    isRequesting: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.shape(userShape),
    isRequesting: PropTypes.bool.isRequired,
  }),

  // Dispatch to props
  requestSets: PropTypes.func.isRequired,
  setActiveSet: PropTypes.func.isRequired,
  setActiveLayout: PropTypes.func.isRequired,
};

Sets.defaultProps = {
  user: {
    data: null,
  },
};

const mapStateToProps = state => ({
  sets: state.sets,
  user: state.user,
});

const mapDispatchToProps = {
  requestSets: requestSetsAction,
  setActiveSet: setActiveSetAction,
  setActiveLayout: setActiveLayoutAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sets);
