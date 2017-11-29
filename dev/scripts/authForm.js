import React from 'react';
import firebase from 'firebase';

class AuthForm extends React.Component {
    render() {
        const title = 'Sign Up';
        const buttonText = 'Sign Up';
        const passwordText = 'Choose a Password';
        return (
            <div>
                <h2>{title}</h2>
                <form action="">
                    <div>
                        <label htmlFor="auth-email">E-mail</label>
                        <input id="auth-email" type="email" required/>
                    </div>
                    <div>
                        <label htmlFor="auth-password">{passwordText}</label>
                        <input id="auth-password" type="password" required/>
                    </div>
                    <div>
                        <label htmlFor="auth-password">Confirm Password</label>
                        <input id="auth-password-confirm" type="password" required/>
                    </div>
                    <button type="submit">{buttonText}</button>
                </form>
            </div>
        )
    }
}

export default AuthForm;