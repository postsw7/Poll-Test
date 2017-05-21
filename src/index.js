import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAjy12DzoLruJbJ9XsvD8L-I-zeX81D5yc",
  authDomain: "classting-5d243.firebaseapp.com",
  databaseURL: "https://classting-5d243.firebaseio.com",
  projectId: "classting-5d243",
  storageBucket: "classting-5d243.appspot.com",
  messagingSenderId: "763590798520"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
