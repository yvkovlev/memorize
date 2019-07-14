import { createAction, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';

const defaultState = {
  isRequesting: false,
  list: [],
};

const mockSets = [
  { id: 1, title: 'Phrasal verbs', cards: [] },
  { id: 2, title: 'Phrasal verbs v2', cards: [] },
  { id: 3, title: 'Awesome very loooooooooong title for set', cards: [] },
];

const mockRequestSets = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockSets);
  }, 500);
});


// Actions

const REQUEST_SETS = 'memorize/REQUEST_SETS';
const REQUEST_SETS_STARTED = 'memorize/REQUEST_SETS_STARTED';
const REQUEST_SETS_SUCCESS = 'memorize/REQUEST_SETS_SUCCESS';
const REQUEST_SETS_FAILURE = 'memorize/REQUEST_SETS_FAILURE';

export const requestSets = createAction(REQUEST_SETS);
const requestSetsStarted = createAction(REQUEST_SETS_STARTED);
const requestSetsSuccess = createAction(REQUEST_SETS_SUCCESS);
const requestSetsFailure = createAction(REQUEST_SETS_FAILURE);

export function* requestSetsSaga() {
  yield takeEvery(REQUEST_SETS, function* () {
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
      isRequesting: false,
      list: payload,
    }),

    // TODO: проработать
    [REQUEST_SETS_FAILURE]: state => ({
      ...state,
      isRequesting: false,
    }),
  },
  defaultState,
);

export default reducer;
