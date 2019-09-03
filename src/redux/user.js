import PropTypes from 'prop-types';
import { createAction, handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';

import { firebase } from 'utils/firebase';

export const userShape = {
  id: PropTypes.number,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  token: PropTypes.string,
};
const defaultState = {
  isRequesting: false,
  data: null,
};

// Actions

const REQUEST = 'memorize/user/REQUEST';
const RECEIVE = 'memorize/user/RECEIVE';

export const requestUser = createAction(REQUEST);
export const receiveUser = createAction(RECEIVE);

// reducer

export const reducer = handleActions({
  [REQUEST]: () => ({ ...defaultState, isRequesting: true }),
  [RECEIVE]: (state, { payload }) => ({ data: payload, isRequesting: false }),
}, defaultState);

// saga

export function* authenticateUserSaga() {
  yield takeEvery(RECEIVE, function* workerSaga(action) {
    const { token } = action.payload;
    try {
      yield firebase.auth().signInWithCustomToken(token);
    } catch (err) {
      throw new Error(err);
    }
  });
}
