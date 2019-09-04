import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import ZingTouch from 'zingtouch/src/ZingTouch';

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

const zingTouch = new ZingTouch.Region(document.body);
const swipeGesture = new ZingTouch.Swipe({
  maxRestTime: 100,
});

const CardsList = (props) => {
  const { cards } = props;
  const [cardNumber, setCardNumber] = React.useState(0);
  const cardListRef = React.useRef(null);

  React.useLayoutEffect(() => {
    zingTouch.bind(cardListRef.current, swipeGesture, (e) => {
      const direction = e.detail.data[0].currentDirection;

      if (direction > 45 && direction <= 135) {
        setCardNumber(prevValue => Math.min(prevValue + 1, cards.length + 1));
      } else if (direction > 225 && direction <= 315) {
        setCardNumber(prevValue => Math.max(prevValue - 1, 0));
      }
    });

    return () => {
      zingTouch.unbind(cardListRef.current, swipeGesture);
    };
  }, []);

  return (
    <div className={cnCardsList()} ref={cardListRef}>
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
