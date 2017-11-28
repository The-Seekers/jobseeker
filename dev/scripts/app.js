import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

class App extends React.Component {
    render() {
      return (
        <div>
          JOBSEEKERS
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
