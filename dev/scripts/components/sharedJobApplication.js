import React from 'react';
import {
    BrowserRouter as Router,Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';

export default class SharedSingleApplication extends React.Component {
    constructor(){
        super();
        this.state = {
            // edit: false,
            details: {
                company: '',
                title: '',
                link:'',
                datePosted: '',
                dateApplied: '',
                name: '',
                followUp1: '',
                followUp2: '',
                followUp3: '',
                response: '',
                interview: '',
                thanks: '',
                interviewFollowUp1: '',
                interviewFollowUp2: ''
            }
        }
    }

    componentDidMount(){
        const singleRef = firebase.database().ref(`users/${this.props.match.params.userId}/applications/${this.props.match.params.application_id}`);
        singleRef.on('value', (snapshot) => {
            const detailsObject = snapshot.val();
            this.setState({
                details: detailsObject
            });
        });
    }

    render(){
        let display = (
                <form action="">
                    <label htmlFor="company">Company</label>
                    <input name="company" type="text" value={this.state.details.company} disabled/>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" value={this.state.details.title} disabled/>
                    <label htmlFor="link">Link to Posting</label>
                    <input name="link" type="text" value={this.state.details.link} disabled />
                    <label htmlFor="datePosted" >Date Posted</label>
                    <input name="datePosted" type="date" value={this.state.details.datePosted} disabled/>
                    <label htmlFor="dateApplied">Date Applied</label>
                    <input name="dateApplied" type="date" value={this.state.details.dateApplied} disabled/>
                    <label htmlFor="name">Contact Name</label>
                    <input name="name" type="text" value={this.state.details.name} disabled />
                    <label htmlFor="followUp1">Follow Up #1</label>
                    <input name="followUp1" type="date" value={this.state.details.followUp1} disabled/>
                    <label htmlFor="followUp2">Follow Up #2</label>
                    <input name="followUp2" type="date" value={this.state.details.followUp2} disabled/>
                    <label htmlFor="followUp3">Follow Up #3</label>
                    <input name="followUp3" type="date" value={this.state.details.followUp3} disabled/>
                    <label htmlFor="response">Response</label>
                    <input name="response" type="text" value={this.state.details.response} disabled />
                    <label htmlFor="interview">Interview Date</label>
                    <input name="interview" type="date" value={this.state.details.interview} disabled />
                    <label htmlFor="thanks">Thank You Note</label>
                    <input name="thanks" type="date" value={this.state.details.thanks} disabled />
                    <label htmlFor="interviewFollowUp1">Interview Follow Up #1</label>
                    <input name="interviewFollowUp1" type="date" value={this.state.details.interviewFollowUp1} disabled />
                    <label htmlFor="interviewFollowUp2">Interview Follow Up #2</label>
                    <input name="interviewFollowUp2" type="date" value={this.state.details.interviewFollowUp2} disabled />
                </form>
        )

        return(
            <div>
                <nav>
                    <Link to={`/shared/${this.props.match.params.userId}/${this.props.match.params.shareKey}`}>Back to Dash</Link>
                </nav>
                {display}
                

            </div>
        )
    }
}