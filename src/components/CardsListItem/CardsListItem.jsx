import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

import { cardsListItemShape } from './CardsListItem.shape';

import swipeUp from './images/swipe-up.svg';

const cnCardsListItem = cn('CardsListItem');

const CardsListItem = (props) => {
  const { content, type, isFlippable } = props;
  const [isFlipped, setIsFlipped] = React.useState(false);

  const onTouchEnd = React.useCallback(
    () => {
      if (type === 'middle' && isFlippable) {
        setIsFlipped(prevValue => !prevValue);
      }
    },
    [type, isFlippable],
  );

  return (
    <div
      className={cnCardsListItem('', { isFlipped })}
      onTouchEnd={onTouchEnd}
      onClick={onTouchEnd}
      role="presentation"
      tabIndex={undefined}
    >
      <div className={cnCardsListItem('Flipper')}>
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
  isFlippable: PropTypes.bool.isRequired
};

export default CardsListItem;
