import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

import Pluralize from 'utils/pluralize';
import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';

import defaultCover from './images/default.png';

const pluralizeCard = new Pluralize('карточка', 'карточки', 'карточек');

const cnSetsListItem = cn('SetsListItem');

const SetsListItem = ({
  photo, title, cardsCount, onClick,
}) => (
  <div className={cnSetsListItem()} onClick={onClick}>
    <img className={cnSetsListItem('Cover')} src={photo} alt="" />
    <div className={cnSetsListItem('Body')}>
      <div className={cnSetsListItem('Meta')}>
        <span className={cnSetsListItem('Title', ['headline'])}>{ title }</span>
        <span className="caption-m">
          { `${cardsCount} ${pluralizeCard.getNoun(cardsCount)}` }
        </span>
      </div>
      <div className={cnSetsListItem('Actions')}>
        <Icon16MoreHorizontal />
      </div>
    </div>
  </div>
);

SetsListItem.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  cardsCount: PropTypes.number.isRequired,
};

SetsListItem.defaultProps = {
  photo: defaultCover,
};

export default SetsListItem;
