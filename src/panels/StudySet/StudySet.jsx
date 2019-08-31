import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';
import { cn } from '@bem-react/classname';

import CardsList from 'components/CardsList';

import './StudySet.css';

const cnStudySet = cn('StudySet');

const cards = [
  {
    id: 1,
    content: {
      photoURL: '',
      title: 'Spoon',
      subtitle: '',
      'definition': 'Ложка',
    },
  },
  {
    id: 2,
    content: {
      photoURL: '',
      title: 'Fork',
      subtitle: '',
      'definition': 'Вилка',
    },
  },
  {
    id: 3,
    content: {
      photoURL: '',
      title: 'Plate',
      subtitle: '',
      'definition': 'Тарелка',
    },
  },
];

export const StudySet = ({ id }) => (
  <Panel id={id} className={cnStudySet('Panel')}>
    <PanelHeader>Memorize</PanelHeader>
    <div className={cnStudySet()}>
      <CardsList
        cards={cards}
      />
    </div>
  </Panel>
);

StudySet.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StudySet;
