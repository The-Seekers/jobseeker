import React from 'react';
import ReactDOM from 'react-dom';
import SharingToggle from './sharingToggle';

// global app header
export default class MainHeader extends React.Component {
    render() {
        const shareUrl = `http://localhost:3000/shared/${this.props.userId}/${this.props.shareKey}`;
        return (
            <header>
                <h1>jobseekers anon.</h1>
                {this.props.isLoggedIn &&
                    // Only display sharing toggle if user is logged in
                    <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
                }

                {this.props.isLoggedIn && this.props.shareApplications &&
                    // Only display sharing link if user is logged in & sharing is enabled
                    <p>Your sharing link: <a href={shareUrl}>{shareUrl}</a></p>
                }
            </header>
        )
    }
}