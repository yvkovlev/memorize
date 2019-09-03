import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: 'AIzaSyClFaMFD9UkRz3pXydCVqfxoEK53nwNtgw',
  authDomain: 'vk-app-memorize.firebaseapp.com',
  databaseURL: 'https://vk-app-memorize.firebaseio.com',
  projectId: 'vk-app-memorize',
  storageBucket: 'vk-app-memorize.appspot.com',
  messagingSenderId: '723204214561',
  appId: '1:723204214561:web:2b060a583b5f0977',
});

const database = firebase.database();

export {
  firebase,
  database,
};
