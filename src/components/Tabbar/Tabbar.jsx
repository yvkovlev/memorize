import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { cn } from '@bem-react/classname';

import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import Icon28User from '@vkontakte/icons/dist/28/user';
import { ReactComponent as AddIcon } from './icons/add.svg';
import { ReactComponent as ApproveIcon } from './icons/approve.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';

import './Tabbar.css';

const icons = new Map([
  ['add', AddIcon],
  ['approve', ApproveIcon],
  ['play', PlayIcon],
]);

const cnTabbar = cn('Tabbar');

const AppTabbar = (props) => {
  const {
    icon,
    selected,
    hidden,
    onClick,
    isSaveButtonActive,
  } = props;

  const IconComponent = icons.get(icon);

  const handleCreateButtonClick = useCallback(() => {
    if (isSaveButtonActive || icon !== 'approve') {
      onClick('control')();
    }
  }, [isSaveButtonActive, onClick, icon]);

  if (hidden) {
    return null;
  }

  return (
    <Tabbar shadow={false} className={cnTabbar()}>
      <TabbarItem
        onClick={onClick('sets')}
        selected={selected === 'sets'}
      >
        <Icon28Menu />
      </TabbarItem>
      { /* Todo: Визуально обработать disabled кнопку */ }
      <TabbarItem
        onClick={handleCreateButtonClick}
        selected={selected === 'control'}
        className={cnTabbar('MiddleBar', { disabled: !isSaveButtonActive })}
      >
        <div className={cnTabbar('Icon')}>
          <IconComponent />
        </div>
      </TabbarItem>
      <TabbarItem
        onClick={onClick('profile')}
        selected={selected === 'profile'}
      >
        <Icon28User />
      </TabbarItem>
    </Tabbar>
  );
};

AppTabbar.propTypes = {
  icon: PropTypes.oneOf(['add', 'approve', 'play']),
  selected: PropTypes.oneOf(['sets', 'control', 'profile']).isRequired,
  hidden: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isSaveButtonActive: PropTypes.bool.isRequired,
};

AppTabbar.defaultProps = {
  icon: undefined,
};

export default AppTabbar;
