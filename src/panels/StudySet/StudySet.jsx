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
			photoURL: 'photo_url.png',
			title: 'Kitchen',
			subtitle: '2 карточки'
		},
	},
	{
		id: 2,
		content: {
			photoURL: 'photo_url2.png',
			title: 'Fork',
			subtitle: ''
		},
	},
	{
		id: 3,
		content: {
			photoURL: 'photo_url3.png',
			title: 'Отлично! Вы закончили сет.',
			subtitle: 'Вы можете начать заново или перейти к другим сетам'
		},
	},
];

export const StudySet = ({ id }) => (
  <Panel id={id}>
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
