import React from 'react';

export default class SharingToggle extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor="sharing-toggle">Share applications</label>
                <input id="sharing-toggle" type="checkbox"/>
            </div>
        )
    }
}