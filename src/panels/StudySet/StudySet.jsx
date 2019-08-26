import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';
import { cn } from '@bem-react/classname';

import './StudySet.css';

const cnStudySet = cn('StudySet');

export const StudySet = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Memorize</PanelHeader>
    <div className={cnStudySet()}>
        test
    </div>
  </Panel>
);

StudySet.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StudySet;
