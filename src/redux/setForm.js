import { createAction, handleActions } from 'redux-actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { cloneDeep } from 'lodash';

const MIN_CARDS_COUNT = 2;
export const cardInitialState = {
  term: '',
  description: '',
};

const initialState = {
  panelHeaderTitle: 'Создать сет',
  set: {
    id: undefined,
    title: '',
    cards:
      Array(MIN_CARDS_COUNT)
        .fill(null)
        .map(() => ({ ...cardInitialState })),
    photo: '',
  },
  isRequesting: false,
};

const mockRequestSet = setId => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      id: setId,
      title: 'Test set',
      cards: [
        { term: 'test term 1', description: 'test description 1' },
        { term: 'test term 2', description: 'test description 2' },
      ],
    });
  });
});

// Actions

const REQUEST_SET = 'memorize/REQUEST_SET';
const REQUEST_SET_STARTED = 'memorize/REQUEST_SET_STARTED';
const REQUEST_SET_SUCCESS = 'memorize/REQUEST_SET_SUCCESS';
const REQUEST_SET_FAILURE = 'memorize/REQUEST_SET_FAILURE';

const POPULATE_SET_FORM = 'memorize/POPULATE_SET_FORM';
const SAVE_SET_STARTED = 'memorize/SAVE_SET_STARTED';
const SAVE_SET_SUCCESS = 'memorize/SAVE_SET_SUCCESS';

const CHANGE = 'memorize/setForm/CHANGE';
const CLEAR = 'memorize/setForm/CLEAR';

export const requestSet = createAction(REQUEST_SET);
const requestSetStarted = createAction(REQUEST_SET_STARTED);
const requestSetSuccess = createAction(REQUEST_SET_SUCCESS);
const requestSetFailure = createAction(REQUEST_SET_FAILURE);

export const populateSetForm = createAction(POPULATE_SET_FORM);
export const saveSetStarted = createAction(SAVE_SET_STARTED);
export const saveSetSuccess = createAction(SAVE_SET_SUCCESS);

export const changeSetForm = createAction(CHANGE);
export const clearSetForm = createAction(CLEAR);

export function* requestSetSaga() {
  yield takeEvery(REQUEST_SET, function* workerSaga(action) {
    yield put(requestSetStarted());
    try {
      const set = yield call(mockRequestSet, action.payload.id);
      yield put(requestSetSuccess(set));
    } catch (err) {
      yield put(requestSetFailure(err));
      throw new Error(err.message);
    }
  });
}

// Reducer

export const reducer = handleActions(
  {
    [CLEAR]: () => cloneDeep(initialState),

    [CHANGE]: (state, { payload }) => ({
      ...state,
      set: { ...payload },
    }),

    [POPULATE_SET_FORM]: (state, { payload: { panelHeaderTitle, set } }) => ({
      ...state,
      panelHeaderTitle,
      set: {
        ...set,
      },
    }),

    [REQUEST_SET_STARTED]: state => ({
      ...state,
      isRequesting: true,
    }),
    [SAVE_SET_STARTED]: state => ({
      ...state,
      isRequesting: true,
    }),

    [REQUEST_SET_SUCCESS]: (state, action) => ({
      ...state,
      set: {
        ...action.payload,
      },
      isRequesting: false,
    }),
    [SAVE_SET_SUCCESS]: state => ({
      ...state,
      isRequesting: false,
    }),

    [REQUEST_SET_FAILURE]: () => ({
      ...initialState,
    }),
  },
  initialState,
);

// Selectors

const setFormSelector = state => state.setForm;

export const isSetFormValidSelector = createSelector(
  setFormSelector,
  ({ set: { title, cards } }) => title !== '' && cards.every(card => card.title !== '' && card.description !== ''),
);
