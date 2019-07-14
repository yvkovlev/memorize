import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';

const Home = ({ id }) => (
  <Panel id={id} theme="white">
    <PanelHeader>Memorize</PanelHeader>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Home;
