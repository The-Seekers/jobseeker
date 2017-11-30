import React from 'react';
import {
    BrowserRouter as Router,Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';

export default class SingleApplication extends React.Component {
    constructor(){
        super();
        this.state = {
            edit: false,
            details: {
                company: '',
                title: '',
                link:'',
                datePosted: '',
                dateApplied: '',
                name: ''
            }
        }
        this.enableEdit = this.enableEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    enableEdit(e){
        e.preventDefault;
        this.setState({
            edit: true
        });
    } 

    // working on the pushing the changed to the 'changed' part of state



    handleEdit(e){
        let currentDetails = Object.assign({},this.state.details);
        currentDetails[e.target.name] = e.target.value;
        this.setState({
            details: currentDetails
        });
    }

    handleChecked(e){
        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    // pull entire entry from firebase based on application id
    // store application details in state
    // make the default values of form based on state from firebase
    // controlled input to store new values in another part of state
    // when save changes is clicked, pushes only the items that were changed to update firebase

    componentDidMount(){
        const singleRef = firebase.database().ref(`users/John Smith/${this.props.match.params.application_id}`);
        singleRef.on('value', (snapshot) => {
            const detailsObject = snapshot.val();
            this.setState({
                details: detailsObject
            });
        });
    }

    render(){
        let display = '';
        if (this.state.edit === false) {
            display = (
                <form action="">
                    <label htmlFor="company">Company</label>
                    <input name="company" type="text" value={this.state.details.company} disabled/>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" value={this.state.details.title} disabled/>
                    <label htmlFor="link">Link to Posting</label>
                    <input name="link" type="text" value={this.state.details.link} disabled />
                    <label htmlFor="datePosted" >Date Posted</label>
                    <input name="datePosted" type="date" value={this.state.details.datePosted} disabled/>
                    <label htmlFor="dateApplied">Date Applied</label>
                    <input name="dateApplied" type="date" value={this.state.details.dateApplied} disabled/>
                    <label htmlFor="name">Contact Name</label>
                    <input name="name" type="text" value={this.state.details.name} disabled />
                    <label htmlFor="followUp1">Follow Up #1</label>
                    <input name="followUp1" type="checkbox" disabled/>
                    <label htmlFor="followUp2">Follow Up #2</label>
                    <input name="followUp2" type="checkbox" disabled/>
                    <label htmlFor="followUp3">Follow Up #3</label>
                    <input name="followUp3" type="checkbox" disabled/>
                </form>
            )
        } else {
            display = (
                <form action="">
                    <label htmlFor="company">Company</label>
                    <input name="company" type="text" onChange={this.handleEdit} value={this.state.details.company} />
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" onChange={this.handleEdit} value={this.state.details.title} />
                    <label htmlFor="link">Link to Posting</label>
                    <input name="link" type="text" onChange={this.handleEdit} value={this.state.details.link} />
                    <label htmlFor="posted" >Date Posted</label>
                    <input name="posted" type="date" onChange={this.handleEdit} value={this.state.details.datePosted} />
                    <label htmlFor="applied">Date Applied</label>
                    <input name="applied" type="date" onChange={this.handleEdit} value={this.state.details.dateApplied} />
                    <label htmlFor="contact">Contact Name</label>
                    <input name="contact" type="text" onChange={this.handleEdit} value={this.state.details.name} />
                    <label htmlFor="followUp1">Follow Up #1</label>
                    <input name="followUp1" type="checkbox" onChange={this.handleChecked} />
                    <label htmlFor="followUp2">Follow Up #2</label>
                    <input name="followUp2" type="checkbox" onChange={this.handleChecked}/>
                    <label htmlFor="followUp3">Follow Up #3</label>
                    <input name="followUp3" type="checkbox" onChange={this.handleChecked}/>
                </form>
            )
        }
        return(
            <div>
                <nav>
                    <a href="">Back to Dash</a>
                    <button onClick={this.enableEdit}>Edit</button>
                </nav>
                {display}
                <button>Save Changes</button>

            </div>
        )
    }
}