import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

import CardsListItem from 'components/CardsListItem';

const cnCardsList = cn('CardsList');

const CardsList = ({ cards, onClick, onSwipe}) => (
  <div className={cnCardsList()}>
    {
      cards.map((card, i) => (
        <CardsListItem
          key={card.id}
          content={card.content}
          isScrollableUp={!(i === 1)}
          isScrollableDown={!(i === cards.length - 1)}
          isFlippable={!(i === 1) && !(i === cards.length - 1)}
        />
      ))
    }
  </div>
);

CardsList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func,
  onSwipe: PropTypes.func,
};

/*const SetsList = ({ sets, onClick }) => (
  <div className={cnSetsList()}>
    { sets.map(set => (
      <SetsListItem
        key={set.id}
        title={set.title}
        photo={set.photo}
        cardsCount={set.cards.length}
        onClick={onClick(set.id)}
      />
    )) }
  </div>
);

SetsList.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};*/

export default CardsList;
