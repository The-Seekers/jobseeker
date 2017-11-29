import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';
import SingleApplication from './jobApplication';

export default class ApplicationList extends React.Component {
    constructor() {
        super();
        this.state = {
            applications: []
        }
    }

    componentDidMount(){
        // applicationRef will eventually be users/${uid}/applications
        const applicationsRef = firebase.database().ref(`users/John Smith`);
        applicationsRef.on('value', (snapshot)=> {
            const applicationsArray = [];
            const applicationItems = snapshot.val();
            for (let applicationKey in applicationItems){
                applicationItems[applicationKey].key = applicationKey;
                applicationsArray.push(applicationItems[applicationKey]);
            }
            this.setState({
                applications: applicationsArray
            });
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        {this.state.applications.map((item) => {
                            return (
                                <Link to={`/application/${item.key}`} key={item.key}>
                                    <h3>{item.company}</h3>
                                    <h4>{item.title}</h4>
                                    <p>Last changed...</p>
                                </Link>
                            )
                        })}
                    </ul>
                    <Route exact path="/application/:application_id" render={(routeProps) => {
                        return <SingleApplication {...routeProps}/>
                    }} />
                </div>
            </Router>
        )
    }

}