import React from 'react';
import AuthForm from './authForm';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            showForm: ''
        }
        this.chooseForm = this.chooseForm.bind(this);
    }

    chooseForm(e, form) {
        e.preventDefault();
        this.setState({
            showForm: form
        });
    }

    render() {
        return(
            <div>
                <h2>Land your next job</h2>
                <p>Job hunting is <em>hard</em>. We're here to help.</p>
                <p>Get started with <strong>jobseeker</strong> today.</p>
                <p>
                    <a href="#" onClick={(e) => {this.chooseForm(e, 'signIn')}}>Sign In</a>
                </p>
                <p>
                    <a href="#" onClick={(e) => {this.chooseForm(e, 'signUp')}}>Sign Up</a>
                </p>

                {this.state.showForm.length > 0 &&
                    <AuthForm formToDisplay={this.state.showForm}/>
                }
            </div>
        )
    }
}

export default Home;