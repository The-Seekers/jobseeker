import React from 'react';
import ReactDOM from 'react-dom';
import SharingToggle from './sharingToggle';

// global app header
export default class MainHeader extends React.Component {
    render() {
        return (
            <header>
                <h1>jobseekers anon.</h1>
                {this.props.isLoggedIn &&
                    // Only display sharing toggle if user is logged in
                    <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
                }
            </header>
        )
    }
}