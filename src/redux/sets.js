import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { database } from 'utils/firebase';

const defaultState = {
  isRequesting: false,
  list: [],
  activeSetId: null,
};

// Selectors

const getSets = state => state.sets.list;
const getActiveSetId = state => state.sets.activeSetId;

export const getActiveSet = createSelector(
  [getSets, getActiveSetId],
  (sets, activeSetId) => sets.find(set => set.id === activeSetId),
);

// Actions

const REQUEST_SETS = 'memorize/REQUEST_SETS';
const REQUEST_SETS_STARTED = 'memorize/REQUEST_SETS_STARTED';
const REQUEST_SETS_SUCCESS = 'memorize/REQUEST_SETS_SUCCESS';
const REQUEST_SETS_FAILURE = 'memorize/REQUEST_SETS_FAILURE';
const SET_ACTIVE_SET = 'memorize/SET_ACTIVE_SET';

export const requestSets = createAction(REQUEST_SETS);
const requestSetsStarted = createAction(REQUEST_SETS_STARTED);
const requestSetsSuccess = createAction(REQUEST_SETS_SUCCESS);
const requestSetsFailure = createAction(REQUEST_SETS_FAILURE);
export const setActiveSet = createAction(SET_ACTIVE_SET);

export function* requestSetsSaga() {
  yield takeEvery(REQUEST_SETS, function* workerSaga(action) {
    const userId = action.payload;
    yield put(requestSetsStarted());
    try {
      const snapshot = yield database.ref(`/user_sets/${userId}`).once('value');
      const sets = snapshot.val();
      let formattedSets;

      if (!sets) {
        formattedSets = [];
      } else {
        formattedSets = Object.entries(sets).map(([id, fields]) => {
          const { title, photoUrl, cardsCount } = fields;
          const cards = Array(cardsCount).fill(null);

          return {
            id,
            title,
            photoUrl,
            cards,
          };
        });
      }

      yield put(requestSetsSuccess(formattedSets || []));
    } catch (err) {
      yield put(requestSetsFailure(err));
      throw new Error(err.message);
    }
  });
}

// Reducer

export const reducer = handleActions(
  {
    [REQUEST_SETS_STARTED]: state => ({
      ...state,
      isRequesting: true,
    }),

    [REQUEST_SETS_SUCCESS]: (state, { payload }) => ({
      ...state,
      isRequesting: false,
      list: payload,
    }),

    // TODO: проработать
    [REQUEST_SETS_FAILURE]: state => ({
      ...state,
      isRequesting: false,
    }),

    [SET_ACTIVE_SET]: (state, { payload }) => ({
      ...state,
      activeSetId: payload,
    }),
  },
  defaultState,
);
