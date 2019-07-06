import { SET_ACTIVE_PANEL } from '../actions';

const activePanel = (state = 'home', action) => {
  switch (action.type) {
    case SET_ACTIVE_PANEL:
      return action.activePanel;
    default:
      return state;
  }
};

export default activePanel;
