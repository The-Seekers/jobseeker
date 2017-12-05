import React from 'react';

export default class SharingToggle extends React.Component {
    render() {
        return (
            <div className="sharingContainer clearfix">
                <p>Share my applications</p>
                <input id="sharing-toggle" type="checkbox" onChange={this.props.toggleSharing} checked={this.props.shareApplications} />
                <label htmlFor="sharing-toggle" className="sharingLabel"></label>
            </div>
        )
    }
}