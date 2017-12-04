import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import moment from 'moment'; 
import DashStats from './dashStats'

export default class ApplicationList extends React.Component {
    constructor() {
        super();
        this.state = {
            filteredApplications: [],
            filtered: false,
            filteredDays: ''
        }
        this.filterApplications = this.filterApplications.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.filterApplications(e.target.value);
    }

    filterApplications(days) {
        let filteredApplications = this.props.applications;

        if(days === 'allApplications') {
            this.setState({
                filteredDays: ''
            });
        }else if (days === 'action'){
            this.setState({
                filteredDays: ''
            });
            const applications = this.props.applications;
            filteredApplications = applications.filter((application) => {
                if (application.needsAction) {
                    return application
                }
            });
        } else if (days === 'interviews') {
            const applications = this.props.applications;
            filteredApplications = applications.filter((application) => {
                // Return applications with an interview date of today or in the future
                return application.interview && moment(application.interview, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day');
            });
        } else if (days === 'archived') {
            const applications = this.props.applications;
            filteredApplications = applications.filter((application) => {
                return application.archive
            });
        } else {
            this.setState({
                filteredDays: days
            });
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
        if (this.state.filtered) {
            applicationsArray = Array.from(this.state.filteredApplications);
        } else {
            applicationsArray = Array.from(this.props.applications);
        }

        
        return (
            <div>
                <DashStats applications={this.props} sorted={this.state} />

                <nav>
                    <select name='sortApplications' onChange={this.handleChange} >
                        <option value='allApplications'>all applications</option>
                        <optgroup label="Application Date">
                            <option value='7'>last 7 days</option>
                            <option value='14'>last 14 days</option>
                            <option value='30'>last 30 days</option>
                        </optgroup>
                        <option value='action'>needs action</option>
                        <option value='interviews'>upcoming interviews</option>
                        <option value='archived'>archived applications</option>
                    </select>
                </nav>
                <ul className='application-list'>
                {applicationsArray.map((item) => {
                    return (
                        <li key={item.key}>
                            <Link to={`/application/${item.key}`}>
                                <h2>{item.title}</h2>
                                <p className='list-company-name'>{item.company}</p>
                                <p className='list-last-changed'>Last changed: <span className='last-changed-date'>{moment(item.lastEdited).fromNow()}</span></p>
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}
