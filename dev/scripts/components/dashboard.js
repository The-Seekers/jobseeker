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
            applications: [],
            sharingEnabled: false
        }
        this.getApplications = this.getApplications.bind(this);
    }

    getApplications(ref) {
        const applicationsRef = ref;
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
                    applicationItems[applicationKey].thanks,
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
                latestDate.add(5, 'days');
                // Get today's date
                const now = moment();
                // Store the value of the final task in the form
                const interviewFollowUp2 = applicationItems[applicationKey].interviewFollowUp2;
                // Store boolean of whether or not user has archived application
                const archived = applicationItems[applicationKey].archive
                // Initialize a variable
                let needsAction;

                if (now.isSameOrAfter(latestDate) && interviewFollowUp2.length === 0 && archived === false) {
                    // If 5 days have passed since the latest action date AND the final followup has not been completed AND user has not archived application
                    needsAction = true;
                } else {
                    // If 5 days have not passed since the latest action date OR if the user has followed up for the last time OR user has archived application
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

    componentDidMount() {
        if (this.props.isSharedView) {
            // Set a database reference to the supplied sharing key
            const sharingRef = firebase.database().ref(`users/${this.props.match.params.userId}/sharing/${this.props.match.params.shareKey}`);
            // Check if the target user has enabled sharing
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
                    // Pull the applications from Firebase, store in state
                    const applicationsRef = firebase.database().ref(`users/${this.props.match.params.userId}/applications`);
                    this.getApplications(applicationsRef);
                }
            });
        } else {
            const applicationsRef = firebase.database().ref(`users/${this.props.userId}/applications`);
            this.getApplications(applicationsRef);
        }
    }

    componentWillUnmount() {
        const applicationsRef = firebase.database().ref(`users/${this.props.userId}/applications`);
        applicationsRef.off('value');
    }    

    render() {
        // Collect different props depending on context
        let listProps = { applications: this.state.applications };
        if (this.props.isSharedView) {
            listProps.userId = this.props.match.params.userId;
            listProps.shareKey = this.props.match.params.shareKey;
            listProps.isSharedView = this.props.isSharedView;
        }

        // Build the markup
        let display = '';
        if (this.props.isSharedView && !this.state.sharingEnabled) {
            // If a guest is accessing a sharing link that is not active, display an error
            display = (
                <div>
                    <h2>Oops...</h2>
                    <p>This user has not enabled sharing for their applications. Ask them to turn sharing on!</p>
                </div>
            )
        } else if (!this.props.isSharedView && this.state.applications.length === 0) {
            // If the user is new and/or has 0 applications in the system...
            display = (
                <div>
                    <DashWelcome />
                    <Link to='/new' className='create-application' aria-label="Create a new application">
                        <i className='fa fa-plus' aria-hidden="true"></i>
                    </Link>
                </div>
            )
        } else {
            display = (
                <div>
                    <ApplicationList {...listProps} />
                    {/* Only show the 'Create application' button if not viewing a shared application */}
                    {!this.props.isSharedView &&
                        <Link to='/new' className='create-application' aria-label="Create a new application">
                            <i className='fa fa-plus' aria-hidden="true"></i>
                        </Link>
                    }
                </div>
            )
        }

        return (
            <main>
                {display}
            </main>
        )
    }
}

// feedback for user upon signup
class DashWelcome extends React.Component {
    render() {
        return(
            <section className='dashboard-welcome'>
                <h2>Welcome</h2>
                <ol>
                    <li>Add your job applications to Jobseeker</li>
                    <li>Track progress and follow-ups</li>
                    <li>Share progress with mentors</li>
                </ol>
                <Link to='/new' aria-label="Get started">
                    <button>get started</button>
                </Link>
            </section>
        )
    }
}