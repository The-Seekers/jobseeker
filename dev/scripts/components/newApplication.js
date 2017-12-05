import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';

// new job application
export default class NewApplication extends React.Component{
    constructor() {
        super();
        this.state = {
            company: '',
            title: '',
            link: '',
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
            interviewFollowUp2: '',
            lastEdited: '',
            archive: false,
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    // handle submit of the form
    handleSubmit(e) {
        e.preventDefault();

        const dbRef = firebase.database().ref(`users/${this.props.userId}/applications`);
        dbRef.push(this.state)
        this.setState({
            submitted: true
        })
    }
    // add each keystroke to component state & record last edited date
    handleChange(e, id){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = `${yyyy}-${mm}-${dd}`

        this.setState({
            [id]: e.target.value,
            lastEdited: today
        })
    }
    render() {
        return(
            <main className='newApplicationForm wrapper'>
                <Link to='/'>
                    <i className="fa fa-long-arrow-left fw" aria-hidden="true"></i> back
                </Link>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='required'>
                        <input onChange={(e) => { this.handleChange(e, 'title') }} value={this.state.title} id='titleInput' type='text' placeholder='add job title' required />
                    </div>                    

                    <div className='contactInfo'>
                        <div className='required'>   
                            <label htmlFor='companyInput'>
                                <i className="fa fa-briefcase fw" aria-hidden="true"></i>
                            </label>                      
                            <input onChange={(e) => { this.handleChange(e, 'company') }} id='companyInput' type='text' placeholder='organization' required />
                        </div>
                        
                        <label htmlFor='nameInput'>
                            <i className="fa fa-id-card fw" aria-hidden="true"></i>
                        </label> 
                        <input onChange={(e) => { this.handleChange(e, 'name') }} id='nameInput' type='text' placeholder='contact'/>

                        <label htmlFor='linkInput'>
                            <i className="fa fa-link fw" aria-hidden="true"></i>
                        </label>
                        <input onChange={(e) => { this.handleChange(e, 'link') }} id='linkInput' type='url' placeholder='url' />
                    </div>

                    <div className='dates'>
                        <div className='date'>
                            <label htmlFor='datePostedInput'>posted date</label>
                            <input onChange={(e) => { this.handleChange(e, 'datePosted') }} id='datePostedInput' type='date' />
                        </div>
                        <div className='date'>
                            <label htmlFor='dateAppliedInput'>date applied</label>
                            <div className='required'>
                                <input onChange={(e) => { this.handleChange(e, 'dateApplied') }} id='dateAppliedInput' type='date' required />
                            </div>
                        </div>
                    </div>

                    <button type='submit'>
                        save application
                    </button>
                </form>

                {this.state.submitted 
                    ? <ApplicationFeedback feedback={this.state} /> 
                    : null
                }
            </main>
        )
    }
} 

// application congratulation and summary
class ApplicationFeedback extends React.Component{
    render(feedback){
        return(
            <section>
                <h2>Job application added!</h2>
                <h2>{this.props.feedback.company} would be lucky to have you!</h2>
                <ul>
                    <h3>Check back on this application to:</h3>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <Link to='/'>
                    <button type='button'>back to dashboard</button>
                </Link>
            </section>
        )
    }
}