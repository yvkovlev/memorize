import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';

import { PANEL_HEADER } from 'panels/common';

const Home = ({ id }) => (
  <Panel id={id} theme="white">
    <PanelHeader>{ PANEL_HEADER }</PanelHeader>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Home;
