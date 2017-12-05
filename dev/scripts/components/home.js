import React from 'react';
import AuthForm from './authForm';

// homepage for unauthenticated users
export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            showForm: ''
        }
        this.chooseForm = this.chooseForm.bind(this);
    }
    // sign up -> form A, log in -> form B
    chooseForm(e, form) {
        e.preventDefault();
        this.setState({
            showForm: form
        });
    }

    render() {
        return(
            <main className="homeMain">
                <div className ="homeText">
                    <h2 className='home-headline'>Land your next job</h2>
                    <p>Job hunting is <em>hard</em>. We&apos;re here to help.</p>
                    <p>Get started with <strong><span className="headline">jobseeker</span></strong> today.</p>
                    <button href="#" className='signIn-button' onClick={(e) => {this.chooseForm(e, 'signIn')}}>Sign In</button>
                    <button href="#" className='signUp-button' onClick={(e) => {this.chooseForm(e, 'signUp')}}>Sign Up</button>
                </div>

                {this.state.showForm.length > 0 &&
                    <AuthForm formToDisplay={this.state.showForm} formFunction={this.chooseForm}/>
                }
            </main>
        )
    }
}