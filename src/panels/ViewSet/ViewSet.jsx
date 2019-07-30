import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Panel,
  PanelHeader,
  Group,
  CellButton,
  List,
  Cell,
} from '@vkontakte/vkui';
import { getActiveSet } from 'redux/sets';
import { setShape } from 'panels/Sets/Sets.shape';
import Pluralize from 'utils/pluralize';

import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

const pluralizeCard = new Pluralize('карточка', 'карточки', 'карточек');

class ViewSet extends React.Component {
  render() {
    const { id, set } = this.props;
    const cardsCount = set.cards.length;

    return (
      <Panel id={id} theme="gray">
        <PanelHeader>Просмотр сета</PanelHeader>
        <div className="ViewSet">

          <Group className="ViewSet__headerGroup">
            <div className="ViewSet__setInfo">
              <div className="ViewSet__meta">
                <span className="caption-m">
                  { `${cardsCount} ${pluralizeCard.getNoun(cardsCount)}` }
                </span>
                <h1 className="ViewSet__title title-xxl">{set.title}</h1>
              </div>
              <img src="/images/image.png" alt="" className="ViewSet__cover" />
            </div>
            <div className="ViewSet__actions">
              <CellButton before={<Icon24Write />}>Редактировать</CellButton>
              <div className="ViewSet__separator" />
              <CellButton before={<Icon24Cancel />} level="danger">Удалить</CellButton>
            </div>
          </Group>

          <div className="ViewSet__cards">
            <Group className="ViewSet__card">
              <List>
                <Cell>
                  <span className="subhead">Пятница</span>
                </Cell>
                <div className="ViewSet__horizontalSeparator" />
                <Cell>
                  <span className="caption-s">Суббота</span>
                </Cell>
              </List>
            </Group>
            <Group className="ViewSet__card">
              <List>
                <Cell>
                  <span className="subhead">Пятница</span>
                </Cell>
                <div className="ViewSet__horizontalSeparator" />
                <Cell>
                  <span className="caption-s">Суббота</span>
                </Cell>
              </List>
            </Group>
          </div>

        </div>
      </Panel>
    );
  }
}

ViewSet.propTypes = {
  id: PropTypes.string.isRequired,
  set: setShape.isRequired,
};

const mapStateToProps = state => ({
  set: getActiveSet(state),
});

export default connect(
  mapStateToProps,
)(ViewSet);
