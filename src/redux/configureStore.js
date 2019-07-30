import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import layout from 'redux/layout';
import sets, { requestSetsSaga } from 'redux/sets';
import setForm from 'redux/setForm';

const reducer = combineReducers({
  layout,
  sets,
  setForm,
});

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );

  sagaMiddleware.run(requestSetsSaga);

  return store;
}
