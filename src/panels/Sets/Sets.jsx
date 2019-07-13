import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Panel,
  PanelHeader,
} from '@vkontakte/vkui/src';

import { requestSets as requestSetsAction } from 'redux/sets';

class Sets extends React.Component {
  componentDidMount() {
    const { requestSets } = this.props;
    requestSets();
  }

  render() {
    const { sets, isRequesting, id } = this.props;
    console.log(sets, isRequesting);

    return (
      <Panel id={id} theme="white">
        <PanelHeader>Memorize</PanelHeader>
      </Panel>
    );
  }
}

Sets.propTypes = {
  // TODO: заменит PropTypes.object на более конкретное описание
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRequesting: PropTypes.bool.isRequired,
  requestSets: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isRequesting: state.sets.isRequesting,
  sets: state.sets.list,
});

const mapDispatchToProps = dispatch => ({
  requestSets: () => dispatch(requestSetsAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sets);
