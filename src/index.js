import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers, applyMiddleware(logger));
// import * as firebase from 'firebase';

// var config = {
//   apiKey: "AIzaSyAjy12DzoLruJbJ9XsvD8L-I-zeX81D5yc",
//   authDomain: "classting-5d243.firebaseapp.com",
//   databaseURL: "https://classting-5d243.firebaseio.com",
//   projectId: "classting-5d243",
//   storageBucket: "classting-5d243.appspot.com",
//   messagingSenderId: "763590798520"
// };
// firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
