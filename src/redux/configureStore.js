import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import layout from 'redux/layout';

// sagas
import { requestSetsSaga } from 'redux/sets';

const reducer = combineReducers({
  layout,
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
