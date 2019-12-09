import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

import { region, swipeGesture, tapGesture } from 'utils/zingTouchConfig';
import { cardsListItemShape } from './CardsListItem.shape';

import swipeUp from './images/swipe-up.svg';

const cnCardsListItem = cn('CardsListItem');

const CardsListItem = (props) => {
  const { content, type, isFlippable } = props;
  const [flipCount, setFlipCount] = React.useState(0);
  const cardListItemRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const swipeArea = cardListItemRef.current;

    region.bind(swipeArea, swipeGesture, (e) => {
      const direction = e.detail.data[0].currentDirection;

      if (type === 'middle' && isFlippable) {
        // eslint-disable-next-line no-mixed-operators
        if (direction >= 0 && direction < 45 || direction > 315 && direction <= 360) {
          setFlipCount(prevValue => prevValue + 1);
        } else if (direction > 135 && direction < 225) {
          setFlipCount(prevValue => prevValue - 1);
        }
      }
    });

    region.bind(swipeArea, tapGesture, () => {
      if (type === 'middle' && isFlippable) {
        if (flipCount % 2 === 0) {
          setFlipCount(prevValue => prevValue + 1);
        } else {
          setFlipCount(prevValue => prevValue - 1);
        }
      }
    });

    return () => {
      region.unbind(swipeArea);
    };
  }, [flipCount, isFlippable, type]);

  return (
    <div
      className={cnCardsListItem()}
      role="presentation"
      tabIndex={undefined}
      ref={cardListItemRef}
    >
      <div className={cnCardsListItem('Flipper')} style={{ '--flipCount': flipCount }}>
        <div className={cnCardsListItem('Front')}>
          <div className={cnCardsListItem('Content')}>
            <div className={cnCardsListItem('PhotoWrapper')} style={{ backgroundImage: `url(${content.photoURL})` }} />
            <h3 className={cnCardsListItem('Title', ['title-xl'])}>{content.title}</h3>
            <h4 className={cnCardsListItem('Subtitle', ['caption-s'])}>{content.subtitle}</h4>
          </div>
          <div
            className={cnCardsListItem('Context')}
          >
            { type === 'first' && (
              <div className={cnCardsListItem('ContextImageWrapper')}>
                <img
                  className={cnCardsListItem('ContextImage')}
                  src={swipeUp}
                  alt="Свайпните вверх"
                />
              </div>
            )}
            { type !== 'last' && (
              <div className={cnCardsListItem('ContextText', ['caption-s'])}>
                {
                  type === 'first'
                    ? 'Для начала обучения пролистни вверх'
                    : 'Клик по карточке, чтобы увидеть перевод'
                }
              </div>
            )}
          </div>
        </div>
        <div className={cnCardsListItem('Back')}>
          <div className={cnCardsListItem('Content')}>
            <div className={cnCardsListItem('PhotoWrapper')} />
            <h3 className={cnCardsListItem('Title', ['title-xl'])}>{content.definition}</h3>
            <h4 className={cnCardsListItem('Subtitle', ['caption-s'])}>{null}</h4>
          </div>
          <div
            className={cnCardsListItem('Context')}
          >
            { type !== 'last' && (
              <div className={cnCardsListItem('ContextText', ['caption-s'])}>
                Клик по карточке, чтобы увидеть термин
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CardsListItem.propTypes = {
  content: PropTypes.shape(cardsListItemShape).isRequired,
  type: PropTypes.string.isRequired,
  isFlippable: PropTypes.bool.isRequired,
};

export default CardsListItem;
