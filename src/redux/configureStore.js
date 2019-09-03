import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

import layout from 'redux/layout';
import { reducer as setsReducer, requestSetsSaga } from 'redux/sets';
import { reducer as setFormReducer } from 'redux/setForm';
import { reducer as userReducer, authenticateUserSaga } from 'redux/user';

const reducer = combineReducers({
  layout,
  sets: setsReducer,
  setForm: setFormReducer,
  user: userReducer,
});

function* root() {
  yield spawn(requestSetsSaga);
  yield spawn(authenticateUserSaga);
}

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );

  sagaMiddleware.run(root);

  return store;
}
