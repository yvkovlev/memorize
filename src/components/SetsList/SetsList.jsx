import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';

import SetsListItem from 'components/SetsListItem';

const cnSetsList = cn('SetsList');

const SetsList = ({ sets, onClick }) => {
  return (
    <div className={cnSetsList()}>
      { sets.map(set => (
        <SetsListItem
          key={set.id}
          title={set.title}
          photo={set.photo}
          cardsCount={set.cards.length}
          onClick={onClick(set.id)}
        />
      )) }
    </div>
  );
};

SetsList.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SetsList;
