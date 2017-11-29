import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import ApplicationList from './jobApplication'
import Home from './Home';

var config = {
  apiKey: "AIzaSyA1qK4MCT9BNUPRKbz6Wy1OeKEFLYswWW8",
  authDomain: "job-seekers-16fc9.firebaseapp.com",
  databaseURL: "https://job-seekers-16fc9.firebaseio.com",
  projectId: "job-seekers-16fc9",
  storageBucket: "job-seekers-16fc9.appspot.com",
  messagingSenderId: "658056882007"
};
firebase.initializeApp(config);

class App extends React.Component {
    render() {
      return (
          <div>
            SEEKERS
          <Home />
          <ApplicationList />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
