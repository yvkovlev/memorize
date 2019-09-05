import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, debounce } from 'lodash';
import { connect } from 'react-redux';
import { cn } from '@bem-react/classname';

import {
  Group,
  Panel,
  PanelHeader,
  Button,
} from '@vkontakte/vkui';
import Icon16Add from '@vkontakte/icons/dist/16/add';

import CardEdit from 'components/CardEdit';
// import { userShape } from 'redux/user';
import { requestSet, cardInitialState, changeSetForm } from 'redux/setForm';
import { setFormShape } from './EditSet.shape';

import defaultCover from './images/deafault.png';

const CREATE_SET = 'CREATE_SET';
const UPDATE_SET = 'UPDATE_SET';

const useScrollDown = (cardsCount) => {
  const [memoCardsCount, setMemoCardsCount] = useState(cardsCount);
  useEffect(() => {
    if (cardsCount > memoCardsCount) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
    setMemoCardsCount(cardsCount);
  }, [cardsCount, memoCardsCount]);
};

const cnEditSet = cn('EditSet');

const EditSet = (props) => {
  const {
    id,
    setForm: { set },
    requestSet: requestSetAction,
    changeSet: changeSetAction,
  } = props;

  const setId = set.id;
  const editSetState = setId === undefined ? CREATE_SET : UPDATE_SET;

  const debouncedChangeSet = debounce(changeSetAction, 500);

  const [innerTitle, setInnerTitle] = useState(set.title);
  const handleTitleChange = useCallback((event) => {
    const newValue = event.target.value;
    setInnerTitle(newValue);
    debouncedChangeSet({
      ...set,
      title: newValue,
    });
  }, [debouncedChangeSet, set]);

  const handleCardChange = useCallback(targetCardIndex => (term = '', description = '') => {
    const newCards = cloneDeep(set.cards).map((card, index) => {
      if (targetCardIndex !== index) {
        return card;
      }

      return {
        term,
        description,
      };
    });
    changeSetAction({
      ...set,
      cards: newCards,
    });
  }, [changeSetAction, set]);

  const onAddCard = useCallback(() => {
    changeSetAction({
      ...set,
      cards: [
        ...set.cards,
        { ...cardInitialState },
      ],
    });
  }, [changeSetAction, set]);
  useScrollDown(set.cards.length);

  useEffect(() => {
    if (editSetState === UPDATE_SET) {
      requestSetAction(setId);
    }
  }, [requestSetAction, editSetState, setId]);

  return (
    <Panel id={id}>
      <PanelHeader>Создать сет</PanelHeader>
      <div className={cnEditSet()}>
        <Group className={cnEditSet('HeaderGroup')}>
          <div className={cnEditSet('HeaderContent')}>
            <img src={defaultCover} alt="" />
            <input
              type="text"
              placeholder="Название сета"
              className={cnEditSet('HeaderInput', ['title-xl'])}
              value={innerTitle}
              onChange={handleTitleChange}
            />
            <span className={cnEditSet('Tip', ['caption-s'])}>Кликни для редактирования</span>
          </div>
          <div className={cnEditSet('Subheader')}>
            <span className={cnEditSet('Subtitle', ['caption-m'])}>Карточки</span>
          </div>
        </Group>

        { set.cards.map((card, index) => (
          <CardEdit
            key={card.id || index}
            onChange={debounce(handleCardChange(index), 200)}
          />
        ))
        }

        <Button
          className={cnEditSet('Button')}
          level="outline"
          onClick={onAddCard}
        >
          <Icon16Add />
          Добавить карточку
        </Button>
      </div>
    </Panel>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  setForm: state.setForm,
});

const mapDispatchToProps = {
  requestSet,
  changeSet: changeSetForm,
};

EditSet.propTypes = {
  // Own props
  id: PropTypes.string.isRequired,

  // State to props
  setForm: PropTypes.shape(setFormShape),
  // user: PropTypes.shape(userShape),

  // Dispatch to props
  requestSet: PropTypes.func.isRequired,
  changeSet: PropTypes.func.isRequired,
};

EditSet.defaultProps = {
  setForm: undefined,
  // user: undefined,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSet);
