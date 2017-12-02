import React from 'react';
import ApplicationList from './applicationList';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';
import NewApplication from './newApplication';
import moment from 'moment';

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
            let applicationsArray = [];
            const applicationItems = snapshot.val();
            for (let applicationKey in applicationItems) {
                applicationItems[applicationKey].key = applicationKey;
                
                let datesArray = [
                    applicationItems[applicationKey].dateApplied,
                    applicationItems[applicationKey].followUp1,
                    applicationItems[applicationKey].followUp2,
                    applicationItems[applicationKey].followUp3,
                    applicationItems[applicationKey].interview,
                    applicationItems[applicationKey].interviewFollowUp1,
                    applicationItems[applicationKey].interviewFollowUp2
                ];
                datesArray = datesArray.map((item) => {
                    let theDate = {};
                    if (item != '') {
                        theDate = moment(item, "YYYY-MM-DD");
                        return theDate;
                    }
                }); 
                
                datesArray = datesArray.filter((item) => {
                    return item
                })  

                let latestDate = moment.max(datesArray) 
                
                applicationsArray.push(applicationItems[applicationKey]);
            }

            applicationsArray = applicationsArray.sort((a, b) => {
                let dateA = a.lastEdited;
                let dateB = b.lastEdited;
                if (dateA < dateB) {
                    return -1;
                } else if (dateA > dateB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            this.setState({
                applications: applicationsArray
            });
        });
    }

    componentWillUnmount() {
        const applicationsRef = firebase.database().ref(`users/${this.props.userId}/applications`);
        applicationsRef.off('value');
    }    

    render() {
        return (
            <main>
                {/* <DashWelcome /> */}
                <DashStats applications={this.state.applications} />
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
                    <li>{this.props.applications.length} total applications</li>
                    <li></li>
                    <li>temp statcard</li>
                </ul>                
            </section>
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