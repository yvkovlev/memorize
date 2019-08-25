import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cn } from '@bem-react/classname';

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

const cnViewSet = cn('ViewSet');

class ViewSet extends React.Component {
  render() {
    const { id, set } = this.props;
    const cardsCount = set.cards.length;

    return (
      <Panel id={id} theme="gray">
        <PanelHeader>Просмотр сета</PanelHeader>
        <div className={cnViewSet()}>

          <Group className={cnViewSet('HeaderGroup')}>
            <div className={cnViewSet('SetInfo')}>
              <div className={cnViewSet('Meta')}>
                <span className="caption-m">
                  { `${cardsCount} ${pluralizeCard.getNoun(cardsCount)}` }
                </span>
                <h1 className={cnViewSet('Title', ['title-xxl'])}>{set.title}</h1>
              </div>
              <img src="/images/image.png" alt="" className={cnViewSet('Cover')} />
            </div>
            <div className={cnViewSet('Actions')}>
              <CellButton before={<Icon24Write />}>Редактировать</CellButton>
              <div className={cnViewSet('Separator')} />
              <CellButton before={<Icon24Cancel />} level="danger">Удалить</CellButton>
            </div>
          </Group>

          <div className={cnViewSet('Cards')}>
            <Group className={cnViewSet('Card')}>
              <List>
                <Cell>
                  <span className="subhead">Пятница</span>
                </Cell>
                <div className={cnViewSet('HorizontalSeparator')} />
                <Cell>
                  <span className="caption-s">Суббота</span>
                </Cell>
              </List>
            </Group>
            <Group className={cnViewSet('Card')}>
              <List>
                <Cell>
                  <span className="subhead">Пятница</span>
                </Cell>
                <div className={cnViewSet('HorizontalSeparator')} />
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
