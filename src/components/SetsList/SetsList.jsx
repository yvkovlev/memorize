import React from 'react';
import PropTypes from 'prop-types';

import SetsListItem from 'components/SetsListItem';

const SetsList = ({ sets, onClick }) => {
  return (
    <div className="SetsList">
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
