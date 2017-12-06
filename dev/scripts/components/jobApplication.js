import React from 'react';
import {
    BrowserRouter as Router,Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';
import moment from 'moment';

export default class SingleApplication extends React.Component {
    constructor(){
        super();
        this.state = {
            edit: false,
            details: {
                company: '',
                title: '',
                link:'',
                datePosted: '',
                dateApplied: '',
                name: '',
                email: '',
                followUp1: '',
                followUp2: '',
                followUp3: '',
                response: '',
                interview: '',
                thanks: '',
                interviewFollowUp1: '',
                interviewFollowUp2: '',
                lastEdited: '',
                archive: ''
            },
            sharingEnabled: false
        }
        this.enableEdit = this.enableEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.getApplication = this.getApplication.bind(this);
    }

    enableEdit(e){
        e.preventDefault();
        this.setState({
            edit: true
        });
    } 

    // controlled input to store new values in another part of state
    handleEdit(e){
        const now = moment().format('x');

        let currentDetails = Object.assign({},this.state.details);
        currentDetails.lastEdited = now;
        currentDetails[e.target.name] = e.target.value;

        this.setState({
            details: currentDetails
        });
    }

    // controlled input to store new values in another part of state
    handleChecked(e) {
        const now = moment().format('x');

        let currentDetails = Object.assign({}, this.state.details);
        currentDetails.lastEdited = now;
        currentDetails[e.target.name] = e.target.checked;

        this.setState({
            details: currentDetails
        });
    }

    // when save changes is clicked, pushes only the items that were changed to update firebase
    handleSubmit(e){
        e.preventDefault();
        const applicationRef = firebase.database().ref(`users/${this.props.userId}/applications/${this.props.match.params.application_id}`);
        applicationRef.update(this.state.details);
        this.setState({
            edit: false
        })
    }

    getApplication(ref) {
        ref.on('value', (snapshot) => {
            const detailsObject = snapshot.val();
            this.setState({
                details: detailsObject
            });
        });
    }

    // pull entire entry from firebase based on application id
    // store application details in state
    // make the default values of form based on state from firebase

    componentDidMount(){
        // If we're viewing a publicly shared application...
        if (this.props.isSharedView) {
            // Check if the user has enabled sharing
            const sharingRef = firebase.database().ref(`users/${this.props.match.params.userId}/sharing/${this.props.match.params.shareKey}`);
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
                    // Store the application details in state
                    const singleRef = firebase.database().ref(`users/${this.props.match.params.userId}/applications/${this.props.match.params.application_id}`);
                    this.getApplication(singleRef);
                }
            });
        // If a logged in user is viewing one of their own applications...
        } else {
            const singleRef = firebase.database().ref(`users/${this.props.userId}/applications/${this.props.match.params.application_id}`);
            this.getApplication(singleRef);
        }

    }
    
    render() {
        // Set a different path back to the dashboard depending on context
        let dashPath = '';
        if (this.props.isSharedView) {
            dashPath = `/shared/${this.props.match.params.userId}/${this.props.match.params.shareKey}`;
        } else {
            dashPath = '/';
        }

        return (
            <main className="wrapper">
                {/* If this is a shared application page, and sharing is not enabled, show an error */}
                {this.props.isSharedView && !this.state.sharingEnabled ? (
                    <div>
                        <h2>Oops...</h2>
                        <p>This user has not enabled sharing for their applications. Ask them to turn sharing on!</p>
                    </div>
                ) : (
                        <div className='editForm wrapper'>
                        <nav>
                            <Link className='backToDash' to={dashPath}><i className="fa fa-long-arrow-left fw" aria-hidden="true"></i> back</Link>
                            {!this.props.isSharedView && !this.state.edit &&
                                // Hide edit button in shared application view
                                    <button className='editButton' onClick={this.enableEdit}>edit <i className="fa fa-pencil" aria-hidden="true"></i></button>
                            }
                            <div className='archiveThis'>
                                {this.state.details.archive === true
                                    ? <label htmlFor="archive">application archived!</label>
                                    : <label htmlFor="archive">archive?</label>
                                }
                                <input id="archive" name="archive" type="checkbox" onChange={this.handleChecked} checked={this.state.details.archive} disabled={!this.state.edit} />
                            </div>
                        </nav>
                        {/* <Progress /> */}

                        <form action="" onSubmit={this.handleSubmit}>

                            <input id='companyInput' name="company" type="text" onChange={this.handleEdit} value={this.state.details.company} disabled={!this.state.edit} required />

                            <div className='contactInfo'>
                                <label htmlFor='titleInput'>
                                    <i className="fa fa-briefcase fw" aria-hidden="true"></i>
                                </label> 
                                <input name="title" type="text" onChange={this.handleEdit} value={this.state.details.title} disabled={!this.state.edit} />
                                <label htmlFor='nameInput'>
                                    <i className="fa fa-id-card fw" aria-hidden="true"></i>
                                </label> 
                                <input name="name" type="text" onChange={this.handleEdit} value={this.state.details.name} disabled={!this.state.edit} required />
                                <label htmlFor='linkInput'>
                                    <i className="fa fa-link fw" aria-hidden="true"></i>
                                </label>
                                <input name="link" type="text" onChange={this.handleEdit} value={this.state.details.link} disabled={!this.state.edit} required />
                            </div>

                            <div className='dates'>
                                <div className='date'>
                                    <label htmlFor="datePosted">Date Posted</label>
                                    <input name="datePosted" type="date" onChange={this.handleEdit} value={this.state.details.datePosted} disabled={!this.state.edit} required />
                                </div>
                                <div className='date'>
                                    <label htmlFor="dateApplied">Date Applied</label>
                                    <input name="dateApplied" type="date" onChange={this.handleEdit} value={this.state.details.dateApplied} disabled={!this.state.edit} required />
                                </div>
                            </div>

                            <div className='followUps'>
                                <h2>Follow-up Log</h2>
                                <label htmlFor="followUp1">#1</label>
                                <input name="followUp1" type="date" onChange={this.handleEdit} value={this.state.details.followUp1} disabled={!this.state.edit} />
                                    <label htmlFor="followUp2">#2</label>
                                <input name="followUp2" type="date" onChange={this.handleEdit} value={this.state.details.followUp2} disabled={!this.state.edit} />
                                    <label htmlFor="followUp3">#3</label>
                                <input name="followUp3" type="date" onChange={this.handleEdit} value={this.state.details.followUp3} disabled={!this.state.edit} />
                            </div>

                            <input id='response' name="response" type="text" placeholder="employer's response" onChange={this.handleEdit} value={this.state.details.response} disabled={!this.state.edit} />

                            <div className='dates'>
                                
                                <div className='date'> 
                                    <label htmlFor="interview">Interview Date</label>
                                    <input name="interview" type="date" onChange={this.handleEdit} value={this.state.details.interview} disabled={!this.state.edit} />
                                </div>

                                <div className='date'>
                                    <label htmlFor="thanks">Thanks Sent</label>
                                    <input name="thanks" type="date" onChange={this.handleEdit} value={this.state.details.thanks} disabled={!this.state.edit} />
                                </div>
                            </div>

                            <div className='followUps'>
                                <h2>Post-Interview Follow-up Log</h2>

                                <label htmlFor="interviewFollowUp1">#1</label>
                                <input name="interviewFollowUp1" type="date" onChange={this.handleEdit} value={this.state.details.interviewFollowUp1} disabled={!this.state.edit} />
                                <label htmlFor="interviewFollowUp2">#2</label>
                                <input name="interviewFollowUp2" type="date" onChange={this.handleEdit} value={this.state.details.interviewFollowUp2} disabled={!this.state.edit} />
                            </div>

                            {this.state.edit &&
                            <button className='submitButton'>
                                save changes
                            </button>
                            }
                        </form>
                    </div>
                )}
            </main>
        )
    }
}