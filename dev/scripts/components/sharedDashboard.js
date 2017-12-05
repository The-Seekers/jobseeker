import React from 'react';
import firebase from 'firebase';
import ApplicationList from './applicationList';

export default class SharedDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            applications: [],
            sharingEnabled: false
        }
    }

    componentDidMount() {
        // Set a database reference to the supplied sharing key
        const sharingRef = firebase.database().ref(`users/${this.props.match.params.userId}/sharing/${this.props.match.params.shareKey}`);
        
        // Check if the user has enabled sharing
        sharingRef.once('value', (snapshot) => {
            const shareKeyValue = snapshot.val();
            if (shareKeyValue) {
                this.setState({
                    sharingEnabled: true
                });
            }
        })
        .then(() => {
            if (this.state.sharingEnabled) {
                console.log('sharing is enabled - loading the job applications');
                // Pull the applications from Firebase, store in state
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
            } else {
                console.log('This user has not enabled sharing.');
            }
        });
        
    }

    render() {
        // Build the display markup
        let display = '';
        if (this.state.sharingEnabled) {
            display = (
                <ApplicationList applications={this.state.applications} userId={this.props.match.params.userId} shareKey={this.props.match.params.shareKey} isSharedView={this.props.isSharedView} />
            )
        } else {
            display = (
                <div>
                    <h2>Oops...</h2>
                    <p>This user has not enabled sharing for their applications. Ask them to turn sharing on!</p>
                </div>
            )
        }

        // Display the markup
        return (
            <main>
                {display}
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