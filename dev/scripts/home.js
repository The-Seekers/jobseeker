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
                <p>
                    <a href="#" onClick={(e) => {this.chooseForm(e, 'signIn')}}>Sign In</a>
                </p>
                <p>
                    <a href="#" onClick={(e) => {this.chooseForm(e, 'signUp')}}>Sign Up</a>
                </p>
                <AuthForm />
            </div>
        )
    }
}

export default Home;