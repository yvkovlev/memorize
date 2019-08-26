import { createAction, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect';

const defaultState = {
  isRequesting: false,
  list: [],
  activeSetId: null,
};

const mockSets = [
  {
    id: 1, title: 'IELTS 12.06.19', cards: new Array(2), photo: '/images/image.png',
  },
  {
    id: 2, title: 'IELTS 10.06.19', cards: new Array(15), photo: '/images/image2.png',
  },
  {
    id: 3, title: 'Awesome very loooooooooong title for set', cards: new Array(9),
  },
];

const mockRequestSets = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockSets);
  }, 300);
});

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
  yield takeEvery(REQUEST_SETS, function* workerSaga() {
    yield put(requestSetsStarted());
    try {
      const sets = yield call(mockRequestSets);
      yield put(requestSetsSuccess(sets));
    } catch (err) {
      yield put(requestSetsFailure(err));
      throw new Error(err.message);
    }
  });
}

// Reducer

const reducer = handleActions(
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

export default reducer;
