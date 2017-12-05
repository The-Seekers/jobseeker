import React from 'react';
import ReactDOM from 'react-dom';
import SharingToggle from './sharingToggle';
import firebase from 'firebase';

// global app header
export default class MainHeader extends React.Component {
    constructor(){
        super();
        this.state = {
            showShare: false
        }
        this.showShare = this.showShare.bind(this);
        this.closeLink = this.closeLink.bind(this);
    }

    signOut(e) {
        e.preventDefault();
        firebase.auth().signOut()
        .then(function() {
            console.log('signed out successfully')
        }).catch(function(error) {
            alert(error.code, error.message);
        });
    }

    navToggle(){
        let links = document.querySelector('.narrowControls');
        if (links.style.top === '70px') {
            links.style.top = '-300px';
        } else {
            links.style.top = '70px';
        }
    }

    showShare(){
        this.setState({
            showShare : true
        });
    }

    closeLink(){
        this.setState({
            showShare: false
        });
    }


    render() {
        const shareUrl = `${window.location.origin}/shared/${this.props.userId}/${this.props.shareKey}`;
        return (
            <header className="clearfix">
                <div className="logo clearfix">
                    <img src="/public/assets/logo.svg" alt="job seekers logo" />
                    <h1>job<span>seeker</span></h1> 
                </div>
                <div className="navWide">
                    <nav className="wideControls clearfix">
                        {this.props.isLoggedIn &&
                            // Only display sharing toggle if user is logged in
                            <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
                        }

                        {this.props.isLoggedIn && this.props.shareApplications &&
                            // Only display sharing link if user is logged in & sharing is enabled
                                <button className="showShareLink" onClick={this.showShare}>Share Link</button>
                        }

                        {this.props.isLoggedIn &&
                            <button onClick={this.signOut} className="signOut">Sign Out</button>
                        }
                    </nav>
                </div>
                <div className="navNarrow clearfix">
                    <i className="fa fa-bars" onClick={this.navToggle}></i>
                    <nav className="narrowControls">
                        {this.props.isLoggedIn &&
                            // Only display sharing toggle if user is logged in
                            <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
                        }

                        {this.props.isLoggedIn && this.props.shareApplications &&
                            // Only display sharing link if user is logged in & sharing is enabled
                            <button className="showShareLink" onClick={this.showShare}>Share Link</button>
                        }

                        {this.props.isLoggedIn &&
                            <button onClick={this.signOut} className="signOut">Sign Out</button>
                        }
                    </nav>

                </div>
                {this.props.isLoggedIn && this.props.shareApplications && this.state.showShare &&
                    <div className="shareOverlay">
                        <div className="shareLink">
                            <i className="fa fa-times" onClick={this.closeLink}></i>
                            <p>This is your public sharing read-only link. Everytime sharing is turned on, a new unique link is generated. When sharing is turned off, the previous link is no longer valid. Copy and paste this link into an email to share your progress with anyone you want!</p>
                            <a href={shareUrl} target="blank">{shareUrl}</a>
                        </div>
                    </div>
                }
            </header>
        )
    }
}
