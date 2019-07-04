import React from 'react';
import PropTypes from 'prop-types';
import {
	Panel,
	Group,
	List,
	PanelHeader
} from '@vkontakte/vkui';
import ListItem from '../components/SetsListItem';

const Home = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>Memorize</PanelHeader>
		<Group title="Ваши наборы слов" description="Выберите любой набор и начните изучать слова.">
			<List>
				{Array(10).fill(0).map((value, index) => <ListItem key={index} go={go} />)}
			</List>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
