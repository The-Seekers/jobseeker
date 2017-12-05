import React from 'react';


// two buttons: one for turn sharing on, one for turn sharing off
// show conditionally based on this.props.shareApplications
// both tied to toggleSharing function on click 
// in header, button conditionally renders similarly to the link: show share link
// on click of button, pop up shows share link

export default class SharingToggle extends React.Component {
    render() {
        return (
            <div className="sharingContainer">
                <p>Share my applications</p>
                <input id="sharing-toggle" type="checkbox" onChange={this.props.toggleSharing} checked={this.props.shareApplications} />
                <label htmlFor="sharing-toggle" className="sharingLabel"></label>
            </div>
        )
    }
}