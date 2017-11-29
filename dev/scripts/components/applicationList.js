import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import SingleApplication from './jobApplication';

export default class ApplicationList extends React.Component {
    constructor() {
        super();
        this.state = {
            application: {
                key: 12345,
                company: 'HackerYou',
                title: 'Web Developer',

            }
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <Link to={`/application/${this.state.application.key}`}>Application 1</Link>
                    <Route exact path="/application/:application_key" render={(routeProps) => {
                        return <SingleApplication {...routeProps} application={this.state.application} />
                    }} />
                </div>
            </Router>
        )
    }

}