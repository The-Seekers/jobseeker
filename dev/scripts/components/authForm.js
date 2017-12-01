import React from 'react';
import firebase from 'firebase';

// landing page authenication form
class AuthForm extends React.Component {
    constructor() {
        super();
        this.state = {
            authEmail: '',
            authPassword: '',
            authConfirmPassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    validatePassword(e) {
        e.preventDefault();
        console.log('validating pwd');
        const passOne = this.state.authPassword;
        const passTwo = this.state.authConfirmPassword;
        if (passOne.length >= 6) {
            if (passOne === passTwo) {
                const validPassword = passOne;
                this.signUp(validPassword);
            } else {
                alert('Passwords do not match. Please try again!');
            }
        } else {
            alert('Passwords must be at least 6 characters long. Please try again!');
        }
    }

    signUp(newPassword) {
        console.log('signing up');
        firebase.auth().createUserWithEmailAndPassword(this.state.authEmail, newPassword)
        .catch((error) => {
            alert(error.code, error.message);
        })
    }

    signIn(e) {
        e.preventDefault();
        console.log('signing in');
        firebase.auth().signInWithEmailAndPassword(this.state.authEmail, this.state.authPassword)
        .catch(() => {
            alert(error.code, error.message);
        })
    }

    render() {
        let title = '';
        let buttonText = '';
        let passwordText = '';
        let formAction = () => null;
        let confirmPassword;

        // choose form to display form according to these conditions
        if (this.props.formToDisplay === 'signUp') {
            title = 'Sign Up';
            buttonText = 'Sign Up';
            passwordText = 'Choose a Password';
            formAction = this.validatePassword;
            confirmPassword = true;
        } else if (this.props.formToDisplay === 'signIn') {
            title = 'Sign In';
            buttonText = 'Sign In';
            passwordText = 'Password';
            formAction = this.signIn;
            confirmPassword = false;
        }

        return (
            <div>
                <h2>{title}</h2>
                <form action="" onSubmit={(e) => {formAction(e)}}>
                    <div>
                        <label htmlFor="auth-email">E-mail</label>
                        <input id="authEmail" type="email" required onChange={this.handleChange} value={this.state.email} />
                    </div>
                    <div>
                        <label htmlFor="auth-password">{passwordText}</label>
                        <input id="authPassword" type="password" required onChange={this.handleChange} value={this.state.password} />
                    </div>
                    {confirmPassword &&
                        <div>
                            <label htmlFor="auth-password">Confirm Password</label>
                            <input id="authConfirmPassword" type="password" required onChange={this.handleChange} value={this.state.confirmPassword} />
                        </div>
                    }
                    <button type="submit">{buttonText}</button>
                </form>
            </div>
        )
    }
}

export default AuthForm;