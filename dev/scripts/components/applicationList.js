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

        if(days === 'allApplications') {

        }else if (days === 'action'){
            const applications = this.props.applications;
            filteredApplications = applications.filter((application) => {
                if (application.needsAction) {
                    return application
                }
            });
        }else{
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
        return (
            <div>
                <nav>
                    <select name='sortApplications' onChange={this.handleChange} >
                        <option value='allApplications'>all applications</option>
                        <optgroup label="Application Date">
                            <option value='7'>last 7 days</option>
                            <option value='14'>last 14 days</option>
                            <option value='30'>last 30 days</option>
                        </optgroup>
                        <option value='action'>needs action</option>
                    </select>
                </nav>
                <ul>
                    {this.state.filtered
                    ? this.state.filteredApplications.map((item) => {
                        return (
                            <Link to={`/application/${item.key}`} key={item.key}>
                                <h3>{item.company}</h3>
                                <h4>{item.title}</h4>
                                <p>Last changed {item.lastEdited}</p>
                            </Link>
                        )
                    }) : this.props.applications.map((item) => {
                            return (
                                <Link to={`/application/${item.key}`} key={item.key}>
                                    <h3>{item.company}</h3>
                                    <h4>{item.title}</h4>
                                    <p>Last changed {item.lastEdited}</p>
                                </Link>
                            )
                        })
                    } 
                </ul>
            </div>
        )
    }

}