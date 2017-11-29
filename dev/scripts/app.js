import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

// components
import MainHeader from './components/header.js'
import MainFooter from './components/footer.js'
import Dashboard from './components/dashboard.js'
import ApplicationList from './components/jobApplication'
import Home from './components/home';
import NewApplication from './components/newApplication.js'

// firebase config
var config = {
  apiKey: "AIzaSyA1qK4MCT9BNUPRKbz6Wy1OeKEFLYswWW8",
  authDomain: "job-seekers-16fc9.firebaseapp.com",
  databaseURL: "https://job-seekers-16fc9.firebaseio.com",
  projectId: "job-seekers-16fc9",
  storageBucket: "job-seekers-16fc9.appspot.com",
  messagingSenderId: "658056882007"
};
firebase.initializeApp(config);

// global flow
class App extends React.Component {
  render() {
    return (
      <div>
        {/* <MainHeader /> */}
        <NewApplication />
        
        {/* <Home /> */}
        {/* <Dashboard /> */}
        {/* <NewApplication /> */}
        
        {/* <MainFooter /> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
