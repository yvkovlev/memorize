import { createAction, handleActions } from 'redux-actions';

const defaultState = {
  activeStory: 'sets',
  activePanel: undefined,
};

// Actions

const SET_ACTIVE_LAYOUT = 'memorize/SET_ACTIVE_LAYOUT';
export const setActiveLayout = createAction(SET_ACTIVE_LAYOUT);

// Reducer

const reducer = handleActions(
  {
    [setActiveLayout]: (
      state,
      { payload: { activeStory, activePanel } },
    ) => ({ ...defaultState, activeStory, activePanel }),
  },
  defaultState,
);

export default reducer;
