import PropTypes from 'prop-types';

export const cardsListItemShape = PropTypes.shape({
  photoURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  definition: PropTypes.string,
});

export default cardsListItemShape;
