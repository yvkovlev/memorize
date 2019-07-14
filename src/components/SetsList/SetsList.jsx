import React from 'react';
import PropTypes from 'prop-types';

import SetsListItem from 'components/SetsListItem';

const SetsList = ({ sets }) => {
  return (
    <div className="SetsList">
      { sets.map(set => (
        <SetsListItem
          key={set.id}
          title={set.title}
          photo={set.photo}
        />
      )) }
    </div>
  );
};

SetsList.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SetsList;
