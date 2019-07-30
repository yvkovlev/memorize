import PropTypes from 'prop-types';

export const cardShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  term: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export const setShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(cardShape).isRequired,
  photo: PropTypes.string,
});
