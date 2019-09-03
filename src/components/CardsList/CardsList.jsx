import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

import CardsListItem from 'components/CardsListItem';

import defaultCover from './images/default.png';
import doneCover from './images/done.png';

const cnCardsList = cn('CardsList');
const staticCards = [
  {
    content: {
      photoURL: defaultCover,
      title: 'Kitchen',
      subtitle: '2 карточки',
      definition: '',
    },
  },
  {
    content: {
      photoURL: doneCover,
      title: 'Отлично! Вы закончили сет.',
      subtitle: 'Вы можете начать заново или перейти к другим сетам',
      definition: '',
    },
  },
];

const CardsList = (props) => {
  const { cards } = props;
  const [cardNumber] = React.useState(2);

  return (
    <div className={cnCardsList()}>
      <div className={cnCardsList('Wrapper')} style={{ '--card-number': cardNumber }}>
        <CardsListItem
          content={staticCards[0].content}
          type="first"
        />
        {
          cards.map((card, i) => (
            <CardsListItem
              key={card.id}
              content={card.content}
              type="middle"
              isFlippable={i === cardNumber - 1}
            />
          ))
        }
        <CardsListItem
          content={staticCards[staticCards.length - 1].content}
          type="last"
        />
      </div>
    </div>
  );
};

CardsList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardsList;
