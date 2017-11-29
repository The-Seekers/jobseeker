import React from 'react';
import {
    BrowserRouter as Router,Route, Link, NavLink, Switch
} from 'react-router-dom';

export default class SingleApplication extends React.Component {
    constructor(){
        super();
        this.state = {
            edit: false
        }
        this.enableEdit = this.enableEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    enableEdit(e){
        e.preventDefault;
        this.setState({
            edit: true
        });
    } 

    handleEdit(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        let display = '';
        if (this.state.edit === false) {
            display = (
                <form action="">
                    <label htmlFor="company">Company</label>
                    <input name="company" type="text" defaultValue={this.props.application.company} disabled/>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" defaultValue={this.props.application.title} disabled/>
                    <label htmlFor="posted">Date Posted</label>
                    <input name="posted" type="date" disabled/>
                    <label htmlFor="applied">Date Applied</label>
                    <input name="applied" type="date" disabled/>
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
                    <input name="company" type="text" defaultValue={this.props.application.company} onChange={this.handleEdit}/>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" defaultValue={this.props.application.title} onChange={this.handleEdit}/>
                    <label htmlFor="posted">Date Posted</label>
                    <input name="posted" type="date" onChange={this.handleEdit}/>
                    <label htmlFor="applied">Date Applied</label>
                    <input name="applied" type="date" onChange={this.handleEdit}/>
                    <label htmlFor="followUp1">Follow Up #1</label>
                    <input name="application" name="followUp1" type="checkbox" onChange={this.handleEdit}/>
                    <label htmlFor="followUp2">Follow Up #2</label>
                    <input name="followUp2" type="checkbox" onChange={this.handleEdit}/>
                    <label htmlFor="followUp3">Follow Up #3</label>
                    <input name="followUp3" type="checkbox" onChange={this.handleEdit}/>
                </form>
            )
        }
        return(
            <div>
                <header>
                    <h1>Job Seekers</h1>
                </header>
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