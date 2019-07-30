import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Group,
  Panel,
  PanelHeader,
  Button,
} from '@vkontakte/vkui';
import Icon16Add from '@vkontakte/icons/dist/16/add';

import CardEdit from 'components/CardEdit';
import { requestSet, cardInitialState } from 'redux/setForm';
import { setFormShape } from './EditSet.shape';

import defaultCover from './images/deafault.png';

const CREATE_SET = 'CREATE_SET';
const UPDATE_SET = 'UPDATE_SET';

const useScrollDown = (cardsCount) => {
  const [memoCardsCount, setMemoCardsCount] = React.useState(cardsCount);
  React.useEffect(() => {
    if (cardsCount > memoCardsCount) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
    setMemoCardsCount(cardsCount);
  }, [cardsCount]);
};

const EditSet = ({ id, setForm }) => {
  const setId = setForm.set.id;
  const editSetState = setId === undefined ? CREATE_SET : UPDATE_SET;

  const [internalSet, applyInternalSet] = React.useState(setForm.set);
  const onAddCard = React.useCallback(() => {
    applyInternalSet(prevState => ({
      ...prevState,
      cards: [
        ...prevState.cards,
        { ...cardInitialState },
      ],
    }));
  });
  useScrollDown(internalSet.cards.length);

  React.useEffect(() => {
    if (editSetState === UPDATE_SET) {
      requestSet(setId);
    }
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Создать сет</PanelHeader>
      <div className="EditSet">
        <Group className="EditSet__headerGroup">
          <div className="EditSet__headerContent">
            <img src={defaultCover} alt="" />
            <input type="text" placeholder="Название сета" className="EditSet__headerInput title-xl" />
            <span className="EditSet__tip caption-s">Кликни для редактирования</span>
          </div>
          <div className="EditSet__subheader">
            <span className="EditSet__subtitle caption-m">Карточки</span>
          </div>
        </Group>

        { internalSet.cards.map((card, index) => (
          <CardEdit
            key={card.id || index}
          />
        ))
        }

        <Button
          className="EditSet__button"
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
  setForm: state.setForm,
});

const mapDispatchToProps = {
  requestSet,
};

EditSet.propTypes = {
  id: PropTypes.string.isRequired,
  setForm: PropTypes.shape(setFormShape).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSet);
