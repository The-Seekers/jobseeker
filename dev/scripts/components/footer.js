import React from 'react';
import ReactDOM from 'react-dom';

// global app footer
export default class MainFooter extends React.Component {
    render() {
        return (
            <footer>
                <p>With you until you're <span>hired</span></p>
                <div className="logo clearfix">
                    <img src="./public/assets/logo.svg" alt="job seekers logo" />
                    <h1>job<span>seeker</span></h1>
                </div>
            </footer>
        )
    }
}