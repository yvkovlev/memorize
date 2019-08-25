import React from 'react';
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

class Sets extends React.Component {
  componentDidMount() {
    const { requestSets } = this.props;
    requestSets();
  }

  handleSetClick = (setId) => {
    const { setActiveSet, setActiveLayout } = this.props;
    return () => {
      setActiveSet(setId);
      setActiveLayout({
        activeStory: 'control',
        activePanel: 'viewSet',
      });
    };
  };

  renderLoading() {
    const { isRequesting } = this.props;

    if (!isRequesting) {
      return null;
    }

    return (
      <div className={cnSets('', { centered: true })}>
        <Spinner size="medium" />
      </div>
    );
  }

  renderEmptySets() {
    const { sets, isRequesting } = this.props;

    if (isRequesting || sets.length !== 0) {
      return null;
    }

    return (
      <div className={cnSets('', { centered: true })}>
        <h3 className={cnSets('Title', ['title-l'])}>Кажется, сетов еще нет</h3>
        <span className={cnSets('', ['subhead', 'subhead_secondary'])}>Но их можно легко добавить нажав на плюсик ниже :)</span>
      </div>
    );
  }

  renderSets() {
    const { sets, isRequesting } = this.props;

    if (isRequesting || sets.length === 0) {
      return null;
    }

    return (
      <>
        <span className={cnSets('Headline', ['headline'])}>Твои сеты</span>
        <SetsList
          sets={sets}
          onClick={this.handleSetClick}
        />
      </>
    );
  }

  render() {
    const { id } = this.props;
    return (
      <Panel id={id} theme="white">
        <PanelHeader>Memorize</PanelHeader>
        <div className={cnSets()}>
          { this.renderLoading() }
          { this.renderEmptySets() }
          { this.renderSets() }
        </div>
      </Panel>
    );
  }
}

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
