import React from 'react';
import PropTypes from 'prop-types';

import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';

import defaultCover from './images/default.png';

const SetsListItem = ({ photo, title }) => (
  <div className="SetsListItem">
    <img className="SetsListItem__cover" src={photo} alt="" />
    <div className="SetsListItem__body">
      <div className="SetsListItem__meta">
        <span className="headline">{ title }</span>
        <span className="caption-m">13 карточек</span>
      </div>
      <div className="SetsListItem__actions">
        <Icon16MoreHorizontal />
      </div>
    </div>
  </div>
);

SetsListItem.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SetsListItem.defaultProps = {
  photo: defaultCover,
};

export default SetsListItem;
