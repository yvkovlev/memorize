import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

const cnCardsListItem = cn('CardsListItem');

const CardsListItem = ({ content, isScrollableUp, isScrollableDown, isFlippable }) => (
  <div 
    className={cnCardsListItem()}
    role="presentation"
    tabIndex={undefined}
  >
    <div className={cnCardsListItem('Content')}>
      <img src={content.photoURL} />
      <h3 className={cnCardsListItem('Title', ['title-xl'])}>{content.title}</h3>
      <h4 className={cnCardsListItem('Subtitle', ['caption-s'])}>{content.subtitle}</h4>
    </div>
  </div>
);

CardsListItem.propTypes = {
  content: PropTypes.object,
  isScrollableUp: PropTypes.bool,
  isScrollableDown: PropTypes.bool,
  isFlippable: PropTypes.bool,
};

/*const SetsListItem = ({
  photo, title, cardsCount, onClick,
}) => (
  <div
    className={cnSetsListItem()}
    onClick={onClick}
    onKeyPress={() => {}}
    role="presentation"
    tabIndex={undefined}
  >
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
};*/

export default CardsListItem;
