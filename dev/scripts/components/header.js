import React from 'react';
import ReactDOM from 'react-dom';
import SharingToggle from './sharingToggle';
import firebase from 'firebase';

// global app header
export default class MainHeader extends React.Component {
    signOut(e) {
        e.preventDefault();
        firebase.auth().signOut()
        .then(function() {
            console.log('signed out successfully')
        }).catch(function(error) {
            alert(error.code, error.message);
        });
    }

    render() {
        const shareUrl = `${window.location.origin}/shared/${this.props.userId}/${this.props.shareKey}`;
        return (
            <header>
                <h1>jobseekers anon.</h1>
                {this.props.isLoggedIn &&
                    // Only display sharing toggle if user is logged in
                    <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
                }

                {this.props.isLoggedIn && this.props.shareApplications &&
                    // Only display sharing link if user is logged in & sharing is enabled
                    <p>Your public sharing link (anyone with the link can view): <a href={shareUrl}>{shareUrl}</a></p>
                }

                {this.props.isLoggedIn &&
                    <p><a href="#" onClick={this.signOut}>sign out</a></p>
                }

            </header>
        )
    }
}