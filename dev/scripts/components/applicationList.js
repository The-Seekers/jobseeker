import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import moment from 'moment'; 

export default class ApplicationList extends React.Component {
    constructor() {
        super();
        this.filterApplications = this.filterApplications.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.value);
        this.filterApplications(e.target.value);
    }

    filterApplications(days) {
        const applications = this.props.applications;
        const presentDate = moment();
        // console.log(presentDate);

        const compareDate = moment().subtract(days, 'days');
        // console.log(compareDate);
        
        const filteredApplications = applications.filter((application) => {
            const appliedMoment = moment(application.dateApplied, "YYYY-MM-DD");
            const betweenBoolean = appliedMoment.isBetween(compareDate, presentDate);
            console.log(betweenBoolean);
            if(betweenBoolean){
                return application;                
            }
        });
        console.log(filteredApplications)
        // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
    }   

    render() {
        return (
            <div>
                <nav>
                    <select name='sortApplications' onChange={this.handleChange} >
                        <option value='allApplications'>all applications</option>
                        <option value='7'>last 7 days</option>
                        <option value='14'>last 2 weeks</option>
                        <option value='30'>last month</option>
                    </select>
                </nav>
                <ul>
                    {this.props.applications.map((item) => {
                        return (
                            <Link to={`/application/${item.key}`} key={item.key}>
                                <h3>{item.company}</h3>
                                <h4>{item.title}</h4>
                                <p>Last changed...</p>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }

}