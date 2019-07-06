import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel, PanelHeader, HeaderButton, platform, IOS,
} from '@vkontakte/vkui';
import './Persik.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import persik from '../img/persik.png';

const osname = platform();

const Persik = ({ id, go }) => (
  <Panel id={id}>
    <PanelHeader
      left={(
        <HeaderButton onClick={() => go('home')} data-to="home">
          { osname === IOS ? <Icon28ChevronBack /> : <Icon24Back /> }
        </HeaderButton>
      )}
    >
      Persik
    </PanelHeader>
    <img className="Persik" src={persik} alt="Persik The Cat" />
  </Panel>
);

Persik.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Persik;
