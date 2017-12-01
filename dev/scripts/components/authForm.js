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
    }

    // add each keystroke to component state
    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    signUp(e) {
        e.preventDefault();
        console.log('signing up');
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        // .catch((error) => {
        //     console.log(error.code, error.message);
        // })
    }

    signIn(e) {
        e.preventDefault();
        console.log('signing in');
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
            formAction = this.signUp;
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