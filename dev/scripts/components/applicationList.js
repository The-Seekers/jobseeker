import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import moment from 'moment'; 

export default class ApplicationList extends React.Component {
    constructor() {
        super();
        this.state = {
            filteredApplications: [],
            filtered: false
        }
        this.filterApplications = this.filterApplications.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.filterApplications(e.target.value);
    }

    filterApplications(days) {
        let filteredApplications = this.props.applications;

        // Filter the applications array if we're not filtering for 'all'
        if (days != 'allApplications') {
            const applications = this.props.applications;
            const presentDate = moment();

            const compareDate = moment().subtract(days, 'days');

            filteredApplications = applications.filter((application) => {
                const appliedMoment = moment(application.dateApplied, "YYYY-MM-DD");
                const betweenBoolean = appliedMoment.isBetween(compareDate, presentDate);
                if (betweenBoolean) {
                    return application;
                }
            });
        }

        this.setState({
            filtered: true,
            filteredApplications
        })
    }

    render() {
        // On first load, pull applications from props
        // When filtering, pull applications from state
        let applicationsArray = [];
        if (this.state.filteredApplications.length > 0) {
            applicationsArray = Array.from(this.state.filteredApplications);
        } else {
            applicationsArray = Array.from(this.props.applications);
        }

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
                {applicationsArray.map((item) => {
                    return (
                        <Link to={`/application/${item.key}`} key={item.key}>
                            <h3>{item.company}</h3>
                            <h4>{item.title}</h4>
                            <p>Last changed {item.lastEdited}</p>
                        </Link>
                    )
                })}
                </ul>
            </div>
        )
    }
}