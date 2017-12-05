import React from 'react';
import ReactDOM from 'react-dom';
import SharingToggle from './sharingToggle';
import firebase from 'firebase';

// global app header
export default class MainHeader extends React.Component {
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

    render() {
        const shareUrl = `${window.location.origin}/shared/${this.props.userId}/${this.props.shareKey}`;
        return (
            <header className="clearfix">
                <div className="logo clearfix">
                    <img src="./public/assets/logo.svg" alt="job seekers logo" />
                    <h1>job<span>seeker</span></h1> 
                </div>
                <div className="navWide">
                    <nav className="wideControls">
                        {this.props.isLoggedIn &&
                            // Only display sharing toggle if user is logged in
                            <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
                        }

                        {this.props.isLoggedIn && this.props.shareApplications &&
                            // Only display sharing link if user is logged in & sharing is enabled
                            <p>Your public sharing link (anyone with the link can view): <a href={shareUrl}>{shareUrl}</a></p>
                        }

                        {this.props.isLoggedIn &&
                            <button onClick={this.signOut}>sign out</button>
                        }
                    </nav>
                </div>
                <div className="navNarrow">
                    <i className="fa fa-bars" onClick={this.navToggle}></i>
                    <nav className="narrowControls">
                        {this.props.isLoggedIn &&
                            // Only display sharing toggle if user is logged in
                            <SharingToggle shareApplications={this.props.shareApplications} toggleSharing={this.props.toggleSharing} />
                        }

                        {this.props.isLoggedIn && this.props.shareApplications &&
                            // Only display sharing link if user is logged in & sharing is enabled
                            <p>Your public sharing link (anyone with the link can view): <a href={shareUrl}>{shareUrl}</a></p>
                        }

                        {this.props.isLoggedIn &&
                            <button onClick={this.signOut}>sign out</button>
                        }
                    </nav>

                </div>
            </header>
        )
    }
}