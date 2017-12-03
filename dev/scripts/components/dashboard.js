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
            const applicationItems = snapshot.val();
            let applicationsArray = [];
            for (let applicationKey in applicationItems) {
                // Store the application's unique key
                applicationItems[applicationKey].key = applicationKey;
                
                // Collect all of the date strings in an array
                let datesArray = [
                    applicationItems[applicationKey].dateApplied,
                    applicationItems[applicationKey].followUp1,
                    applicationItems[applicationKey].followUp2,
                    applicationItems[applicationKey].followUp3,
                    applicationItems[applicationKey].interview,
                    applicationItems[applicationKey].interviewFollowUp1
                    // applicationItems[applicationKey].interviewFollowUp2 is the final date in the application
                    // We don't need to prompt user for action when they have completed the final followup
                    // so we do not include it in datesArray
                ];

                // Transform the date strings into moments, while filtering out the blanks
                datesArray = datesArray.map((item) => {
                    let theDate = {};
                    if (item != '') {
                        theDate = moment(item, "YYYY-MM-DD");
                        return theDate;
                    }
                });
                datesArray = datesArray.filter((item) => {
                    return item;
                })     
                
                // Find the latest date out of the application's completed date fields
                let latestDate = moment.max(datesArray);
                // Add 5 days to the latest date
                latestDate.add(5,'days');
                // Get today's date
                const now = moment();
                // Store the value of the final task in the form
                const interviewFollowUp2 = applicationItems[applicationKey].interviewFollowUp2;
                // Initialize a variable
                let needsAction;

                if (now.isSameOrAfter(latestDate) && interviewFollowUp2.length === 0) {
                    // If 5 days have passed since the latest action date AND the final followup has not been completed
                    needsAction = true;
                } else {
                    // If 5 days have not passed since the latest action date OR if the user has followed up for the last time
                    needsAction = false;
                }

                // Set the needsAction flag
                applicationItems[applicationKey].needsAction = needsAction;
                
                // Store application in the array
                applicationsArray.push(applicationItems[applicationKey]);
            }

            // Sort the applications array
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

            // Store the applications in state
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
                <ApplicationList applications={this.state.applications} />
                <Link to='/new'>
                    <button type='button'>New Application</button>
                </Link>
            </main>
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
                    <li>Track progress and follow-ups</li>
                    <li>Share progress with mentors</li>
                </ol>
                <button>get started</button>
            </section>
        )
    }
}