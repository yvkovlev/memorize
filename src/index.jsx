import 'core-js/es/map';
import 'core-js/es/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';
import { Provider } from 'react-redux';

import 'index.css';

import App from './App';
import configureStore from './redux/configureStore';

connect.send('VKWebAppInit', {});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
