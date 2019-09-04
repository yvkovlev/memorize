import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
  HeaderButton,
  platform,
  IOS,
} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

import { cn } from '@bem-react/classname';
import { PANEL_HEADER } from 'panels/common';

import CardsList from 'components/CardsList';

import './StudySet.css';

const OS = platform();
const cnStudySet = cn('StudySet');

const cards = [
  {
    id: 1,
    content: {
      photoURL: '',
      title: 'Spoon',
      subtitle: '',
      definition: 'Ложка',
    },
  },
  {
    id: 2,
    content: {
      photoURL: '',
      title: 'Fork',
      subtitle: '',
      definition: 'Вилка',
    },
  },
  {
    id: 3,
    content: {
      photoURL: '',
      title: 'Plate',
      subtitle: '',
      definition: 'Тарелка',
    },
  },
];

export const StudySet = ({ id, className }) => {
  const studySetRef = React.useRef(null);

  React.useEffect(() => {
    studySetRef.current.ontouchstart = (e) => {
      e.preventDefault();
    };
  }, []);

  return (
    <Panel id={id} className={className}>
      <PanelHeader
        addon={<HeaderButton>Назад</HeaderButton>}
        left={<HeaderButton>{OS === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
      >
        {PANEL_HEADER}
      </PanelHeader>
      <div className={cnStudySet()} ref={studySetRef}>
        <CardsList
          cards={cards}
        />
      </div>
    </Panel>
  );
};

StudySet.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default StudySet;
