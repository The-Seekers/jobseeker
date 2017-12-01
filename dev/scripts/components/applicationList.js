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
        if(days != 'allApplications'){
            const applications = this.props.applications;
            const presentDate = moment();
            // console.log(presentDate);

            const compareDate = moment().subtract(days, 'days');
            // console.log(compareDate);

            filteredApplications = applications.filter((application) => {
                const appliedMoment = moment(application.dateApplied, "YYYY-MM-DD");
                const betweenBoolean = appliedMoment.isBetween(compareDate, presentDate);
                console.log(betweenBoolean);
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

    componentDidMount() {
        const newState = Array.from(this.props.applications)
        this.setState({
            filteredApplications: newState
        })
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
                    {this.state.filtered
                    ? this.state.filteredApplications.map((item) => {
                        return (
                            <Link to={`/application/${item.key}`} key={item.key}>
                                <h3>{item.company}</h3>
                                <h4>{item.title}</h4>
                                <p>Last changed...</p>
                            </Link>
                        )
                    }) : this.props.applications.map((item) => {
                            return (
                                <Link to={`/application/${item.key}`} key={item.key}>
                                    <h3>{item.company}</h3>
                                    <h4>{item.title}</h4>
                                    <p>Last changed...</p>
                                </Link>
                            )
                        })
                    } 
                </ul>
            </div>
        )
    }

}