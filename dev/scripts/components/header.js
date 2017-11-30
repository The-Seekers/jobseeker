import React from 'react';
import ReactDOM from 'react-dom';
import SharingToggle from './sharingToggle';

// global app header
export default class MainHeader extends React.Component {
    render() {
        return (
            <header>
                <h1>jobseekers anon.</h1>
                <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
            </header>
        )
    }
}