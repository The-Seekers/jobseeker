import React from 'react';

export default class SharingToggle extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor="sharing-toggle">Share my applications</label>
                <input id="sharing-toggle" type="checkbox" onChange={this.props.toggleSharing} checked={this.props.shareApplications} />
            </div>
        )
    }
}