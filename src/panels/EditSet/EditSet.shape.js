import PropTypes from 'prop-types';
import { setShape } from 'panels/Sets/Sets.shape';

export const setFormShape = {
  panelHeaderTitle: PropTypes.string.isRequired,
  set: PropTypes.shape(setShape),
  isRequesting: PropTypes.bool.isRequired,
};

export default setFormShape;
