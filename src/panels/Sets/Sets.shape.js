import PropTypes from 'prop-types';

export const cardShape = PropTypes.shape({
  term: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export const setShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  cards: PropTypes.arrayOf(cardShape),
  photo: PropTypes.string,
});
