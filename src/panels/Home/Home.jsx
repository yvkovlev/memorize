import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  List,
  PanelHeader,
} from '@vkontakte/vkui';
import ListItem from 'components/SetsListItem';

const Home = ({ id, go }) => (
  <Panel id={id} theme="white">
    <PanelHeader>Memorize</PanelHeader>
    <List>
      <ListItem go={go} />
    </List>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Home;
