import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';

// application form (* /addnew *)
export default class NewApplication extends React.Component{
    constructor() {
        super();
        this.state = {
            title: '',
            company: '',
            name: '',
            link: '',
            datePosted: '',
            dateApplied: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('submitted the form');
    }
    handleChange(e, id){
        this.setState({
            [id]: e.target.value
        })
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>New job application</h2>
                    
                    <div>
                        <label htmlFor='titleInput'>Title of Job</label>
                        <input onChange={(e) => {this.handleChange(e, 'title')}} value={this.state.title} id='titleInput' type='text' placeholder='title' required />
                    </div>
                    <div>
                        <label htmlFor='companyInput'>Company</label>                    
                        <input onChange={(e) => { this.handleChange(e, 'company') }} id='companyInput' type='text' placeholder='company' required />
                    </div>
                    <div>
                        <label htmlFor='nameInput'>Name of Contact</label> 
                        <input onChange={(e) => { this.handleChange(e, 'name') }} id='nameInput' type='text' placeholder='name'/>
                    </div>
                    <div>
                        <label htmlFor='linkInput'>Url</label> 
                        <input onChange={(e) => { this.handleChange(e, 'link') }} id='linkInput' type='url' />
                    </div>
                    <div>
                        <label htmlFor='datePostedInput'>Date Posted</label>                     
                        <input onChange={(e) => { this.handleChange(e, 'datePosted') }} id='datePostedInput' type='date' />
                    </div>
                    <div>
                        <label htmlFor='dateAppliedInput'>Date Applied</label>                     
                        <input onChange={(e) => { this.handleChange(e, 'dateApplied') }} id='dateAppliedInput' type='date' required />
                    </div>
                    <button type='submit'>Create</button>
                </form>
            </div>
        )
    }
} 