import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Panel,
  PanelHeader,
  Spinner,
} from '@vkontakte/vkui';

import SetsList from 'components/SetsList';
import {
  requestSets as requestSetsAction,
  setActiveSet as setActiveSetAction,
} from 'redux/sets';
import {
  setActiveLayout as setActiveLayoutAction,
} from 'redux/layout';
import { setShape } from 'panels/Sets/Sets.shape';

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
      <div className="Sets_centered">
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
      <div className="Sets_centered">
        <h3 className="Sets__title title-l">Кажется, сетов еще нет</h3>
        <span className="subhead subhead_secondary">Но их можно легко добавить нажав на плюсик ниже :)</span>
      </div>
    );
  }

  renderSets() {
    const { sets, isRequesting } = this.props;

    if (isRequesting || sets.length === 0) {
      return null;
    }

    return (
      <div>
        <span className="Sets__headline headline">Твои сеты</span>
        <SetsList
          sets={sets}
          onClick={this.handleSetClick}
        />
      </div>
    );
  }

  render() {
    const { id } = this.props;
    return (
      <Panel id={id} theme="white">
        <PanelHeader>Memorize</PanelHeader>
        <div className="Sets">
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
