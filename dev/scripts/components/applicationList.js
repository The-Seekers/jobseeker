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
        this.buildApplicationPath = this.buildApplicationPath.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterApplications = this.filterApplications.bind(this);
    }

    buildApplicationPath(applicationObject) {
        let path = '';
        if (this.props.isSharedView) {
            path = `/shared/${this.props.userId}/${this.props.shareKey}/${applicationObject.key}`;
        } else {
            path = `/application/${applicationObject.key}`;
        }
        return path;
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

                <nav className='application-list-filter'>
                    <div className="wrapper clearfix">
                
                        <p className='filter-label'><i className="fa fa-filter"></i> Filter by:</p>
                        <select className='filter-select' name='sortApplications' onChange={this.handleChange} >
                            <option value='allApplications'>All Applications</option>
                            <optgroup label="Application Date">
                                <option value='7'>Last 7 Days</option>
                                <option value='14'>Last 14 Days</option>
                                <option value='30'>Last 30 Days</option>
                            </optgroup>
                            <option value='action'>Needs Action</option>
                            <option value='interviews'>Upcoming Interviews</option>
                            <option value='archived'>Archived Applications</option>
                        </select>
                    </div>
                </nav>
                <div className='wrapper'>
                    <ul className='application-list clearfix'>
                    {applicationsArray.map((item) => {
                        // Build paths differently for logged in users vs. guests viewing shared applications
                        const applicationPath = this.buildApplicationPath(item);

                        return (
                            <li key={item.key}>
                                <Link to={applicationPath}>
                                    <h2>{item.title}</h2>
                                    <p className='list-company-name'>{item.company}</p>
                                    <p className='list-last-changed'>Last changed: <span className='last-changed-date'>{moment(item.lastEdited).fromNow()}</span></p>
                                </Link>
                            </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}
