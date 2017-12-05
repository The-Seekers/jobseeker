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

                <Link className='backToDash' to='/'>
                    <i className="fa fa-long-arrow-left fw" aria-hidden="true"></i> back
                </Link>

                <Link to='/'>
                    {this.state.submitted
                        ? <ApplicationFeedback feedback={this.state} />
                        : null
                    }
                </Link>

                <form onSubmit={this.handleSubmit.bind(this)}>

                    <input onChange={(e) => { this.handleChange(e, 'title') }} value={this.state.title} id='titleInput' type='text' placeholder='add job title' required />                   

                    <div className='contactInfo'>
                        <label htmlFor='nameInput'>
                            <i className="fa fa-briefcase fw" aria-hidden="true"></i>
                        </label>                      
                        <input onChange={(e) => { this.handleChange(e, 'company') }} id='companyInput' type='text' placeholder='organization' required />
                        
                        <label htmlFor='nameInput'>
                            <i className="fa fa-id-card fw" aria-hidden="true"></i>
                        </label> 
                        <input onChange={(e) => { this.handleChange(e, 'name') }} id='nameInput' type='text' placeholder='name of contact' required />

                        <label htmlFor='linkInput'>
                            <i className="fa fa-link fw" aria-hidden="true"></i>
                        </label>
                        <input onChange={(e) => { this.handleChange(e, 'link') }} id='linkInput' type='url' placeholder='post url' required />
                    </div>

                    <div className='dates'>
                        <div className='date'>
                            <label htmlFor='datePostedInput'>posted date</label>
                            <input onChange={(e) => { this.handleChange(e, 'datePosted') }} id='datePostedInput' type='date' required />
                        </div>

                        <div className='date'>
                            <label htmlFor='dateAppliedInput'>date applied</label>
                                <input onChange={(e) => { this.handleChange(e, 'dateApplied') }} id='dateAppliedInput' type='date' required />
                        </div>
                    </div>

                        {this.state.submitted
                            ? null
                            : <button className='submitButton' type='submit'>
                                save application
                            </button>
                        }

                </form>
            </main>
        )
    }
} 

// application congratulation and summary
class ApplicationFeedback extends React.Component{
    render(feedback){
        return(
            <section className='newFeedback'>
            
                <h2>Application saved!</h2>
                <p>{this.props.feedback.company} would be lucky to have you!</p>
            </section>
        )
    }
}