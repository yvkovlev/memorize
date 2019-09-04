import { createAction, handleActions } from 'redux-actions';
import { takeEvery, put, select } from 'redux-saga/effects';

import { database } from 'utils/firebase';
import { clearSetForm } from './setForm';

const defaultState = {
  activeStory: 'sets',
  activePanel: undefined,
};

// Actions

const INITIATE_LAYOUT_CHANGE = 'memorize/layout/INITIATE_LAYOUT_CHANGE';
const SET_ACTIVE_LAYOUT = 'memorize/layout/SET_ACTIVE_LAYOUT';

export const initiateLayoutChange = createAction(INITIATE_LAYOUT_CHANGE);
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

// Saga

export function* setActiveLayoutSaga() {
  yield takeEvery(INITIATE_LAYOUT_CHANGE, function* workerSaga(action) {
    const { activeStory, activePanel } = action.payload;

    if (activeStory === 'control' && activePanel === 'viewSet') {
      const userId = yield select(state => state.user.data.id);
      const setToCreate = yield select(state => state.setForm.set);

      const newSetKey = database.ref().child('sets').push().key;
      const updates = {
        [`/user_sets/${userId}/${newSetKey}`]: {
          title: setToCreate.title,
          cardsCount: setToCreate.cards.length,
          photoUrl: '/images/image.png',
        },
        [`/sets/${newSetKey}`]: {
          title: setToCreate.title,
          cards: setToCreate.cards,
          photoUrl: '/images/image.png',
          ownerId: `${userId}`,
          isPublic: false,
        },
      };

      yield database.ref().update(updates);
      yield put(clearSetForm());
      yield put(setActiveLayout(action.payload));
    } else {
      yield put(setActiveLayout(action.payload));
    }
  });
}

export default reducer;
