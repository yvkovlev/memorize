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

class Sets extends React.Component {
  componentDidMount() {
    const { requestSets } = this.props;
    requestSets();
  }

  handleSetClick = (setId) => {
    const { setActiveSet } = this.props;
    return () => {
      setActiveSet(setId);
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
  // TODO: заменит PropTypes.object на более конкретное описание
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRequesting: PropTypes.bool.isRequired,
  requestSets: PropTypes.func.isRequired,
  setActiveSet: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isRequesting: state.sets.isRequesting,
  sets: state.sets.list,
});

const mapDispatchToProps = dispatch => ({
  requestSets: () => dispatch(requestSetsAction()),
  setActiveSet: setId => dispatch(setActiveSetAction(setId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sets);
