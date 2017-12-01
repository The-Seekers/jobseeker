import React from 'react';
import firebase from 'firebase';
import ApplicationList from './applicationList';

export default class SharedDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            applications: []
        }
    }

    // Pull the applications from Firebase, store in state
    componentDidMount() {
        const applicationsRef = firebase.database().ref(`users/${this.props.match.params.userId}/applications`);
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

    render() {
        return (
            <main>
                {/* <DashWelcome /> */}
                <DashStats />
                <ApplicationList applications={this.state.applications} />
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
                    <input type='search' placeholder='search' />
                </form>
            </nav>
        )
    }
}