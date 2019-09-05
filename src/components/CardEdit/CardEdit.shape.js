import PropTypes from 'prop-types';

export const cardEditShape = {
  term: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
