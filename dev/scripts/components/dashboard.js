import React from 'react';
import ApplicationList from './applicationList';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';
import NewApplication from './newApplication';

// dashboard
export default class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            applications: []
        }
    }

    // Pull the applications from Firebase, store in state
    componentDidMount() {
        const applicationsRef = firebase.database().ref(`users/${this.props.userId}/applications`);
        applicationsRef.on('value', (snapshot) => {
            const applicationsArray = [];
            const applicationItems = snapshot.val();
            for (let applicationKey in applicationItems) {
                applicationItems[applicationKey].key = applicationKey;
                applicationsArray.push(applicationItems[applicationKey]);
            }
            this.setState({
                applications: applicationsArray
            });
        });
    }

<<<<<<< HEAD
=======
    componentWillUnmount() {
        const applicationsRef = firebase.database().ref(`users/${this.props.userId}/applications`);
        applicationsRef.off('value');
    }    

    // handle clicking the new application button
    handleClick(e) {
        console.log('hello')
    }

>>>>>>> b4f7c3b8c4a4f21c1541642d9e5a1bb541f056eb
    render() {
        return (
                <main>
                    {/* <DashWelcome /> */}
                    <DashStats />
                    <ApplicationList applications={this.state.applications} />
                    <Link to='/new'>
                        <button type='button'>New Application</button>
                    </Link>
                </main>
        )
    }
}

// at-a-glance section
class DashStats extends React.Component {
    render() {
        return (
            <section>
                <ul>
                    <li>temp statcard</li>
                    <li>temp statcard</li>
                    <li>temp statcard</li>
                </ul>                
            </section>
        )
    }
}

// search, sort, navigation for applicationList
class JobsListNav extends React.Component {
    render() {
        return (
            <nav>
                <form>
                    <select name='sortBy'>
                        <option value='sortOption'>sort by...</option>
                        <option value='sortOption'>sort by...</option>
                        <option value='sortOption'>sort by...</option>
                    </select>
                    <input type='search' placeholder='search'/>
                </form>
            </nav>
        )
    }
}

// feedback for user upon signup
class DashWelcome extends React.Component {
    render() {
        return(
            <section>
                <h2>Welcome.</h2>
                <ol>
                    <li>Add your job applications to Jobseeker</li>
                    <li>Track connections, follow-ups and connections</li>
                    <li>Never miss an opportunity</li>
                </ol>
                <button>get started</button>
            </section>
        )
    }
}