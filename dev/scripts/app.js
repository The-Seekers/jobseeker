import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

// component imports
import MainHeader from './components/header.js'
import MainFooter from './components/footer.js'
import Dashboard from './components/dashboard.js'
import ApplicationList from './components/jobApplication'
import Home from './components/home';

import NewApplication from './components/newApplication.js'

// initialize firebase
var config = {
  apiKey: "AIzaSyA1qK4MCT9BNUPRKbz6Wy1OeKEFLYswWW8",
  authDomain: "job-seekers-16fc9.firebaseapp.com",
  databaseURL: "https://job-seekers-16fc9.firebaseio.com",
  projectId: "job-seekers-16fc9",
  storageBucket: "job-seekers-16fc9.appspot.com",
  messagingSenderId: "658056882007"
};
firebase.initializeApp(config);

// main app flow
class App extends React.Component {
  render() {
    return (
      <div>
        <NewApplication />
        <MainHeader />
        <Home />
        <Dashboard />
        <MainFooter />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
