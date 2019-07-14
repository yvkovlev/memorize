import React from 'react';
import PropTypes from 'prop-types';

import Pluralize from 'utils/pluralize';
import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';

import defaultCover from './images/default.png';

const pluralizeCard = new Pluralize('карточка', 'карточки', 'карточек');

const SetsListItem = ({ photo, title, cardsCount, onClick }) => (
  <div className="SetsListItem" onClick={onClick}>
    <img className="SetsListItem__cover" src={photo} alt="" />
    <div className="SetsListItem__body">
      <div className="SetsListItem__meta">
        <span className="SetsListItem__title headline">{ title }</span>
        <span className="caption-m">
          { `${cardsCount} ${pluralizeCard.getNoun(cardsCount)}` }
        </span>
      </div>
      <div className="SetsListItem__actions">
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
