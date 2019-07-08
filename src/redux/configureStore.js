import { createStore, combineReducers } from 'redux';
import layout from './layout';

const reducer = combineReducers({
  layout,
});

export default function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
  );
}
