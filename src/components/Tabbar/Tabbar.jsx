import React from 'react';
import PropTypes from 'prop-types';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';

import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import Icon28User from '@vkontakte/icons/dist/28/user';
import { ReactComponent as AddIcon } from './icons/add.svg';
import { ReactComponent as ApproveIcon } from './icons/approve.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';

import './Tabbar.css';

const AppTabbar = ({ activeStory, onClick, middleIcon }) => {
  const switchStory = story => onClick(story);

  let ActualIcon;
  switch (middleIcon) {
    case 'add':
      ActualIcon = AddIcon;
      break;
    case 'approve':
      ActualIcon = ApproveIcon;
      break;
    case 'play':
      ActualIcon = PlayIcon;
      break;
    default:
      break;
  }

  return (
    <Tabbar shadow={false} className="Tabbar">
      <TabbarItem
        onClick={switchStory('sets')}
        selected={activeStory === 'sets'}
      >
        <Icon28Menu />
      </TabbarItem>
      <TabbarItem
        onClick={switchStory('control')}
        selected={activeStory === 'control'}
      >
        <div className="Tabbar__icon">
          <ActualIcon />
        </div>
      </TabbarItem>
      <TabbarItem
        onClick={switchStory('profile')}
        selected={activeStory === 'profile'}
      >
        <Icon28User />
      </TabbarItem>
    </Tabbar>
  );
};

AppTabbar.propTypes = {
  activeStory: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  middleIcon: PropTypes.oneOf(['add', 'approve', 'play']).isRequired,
};

export default AppTabbar;
