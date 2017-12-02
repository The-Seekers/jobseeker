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
                
                // let latestDate = new Date(Math.max.apply(null, datesArray))
                let latestDate = moment.max(datesArray);
                latestDate.add(5,'days');
                const now = moment();
                let needsAction;

                if(now.isSameOrAfter(latestDate)) {
                    needsAction = true;
                } else {
                    needsAction = false;
                }

                applicationItems[applicationKey].needsAction = needsAction;
                
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