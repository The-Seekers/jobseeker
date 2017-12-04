import React from 'react';

export default class SharingToggle extends React.Component {
    render() {
        return (
            <div className="sharingContainer">
                <label htmlFor="sharing-toggle" className="sharingLabel">Share my applications</label>
                <input id="sharing-toggle" type="checkbox" onChange={this.props.toggleSharing} checked={this.props.shareApplications} />
            </div>
        )
    }
}