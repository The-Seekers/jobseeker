import React from 'react';
import moment from 'moment';

// at-a-glance section
export default class DashStats extends React.Component {
    render() {
        let totalJobs;
        let isFiltered = this.props.sorted.filtered;
        if (isFiltered === false) {
            totalJobs = this.props.applications.applications.length;
        } else if (isFiltered === true) {
            totalJobs = this.props.sorted.filteredApplications.length;
        }
        
        // Count upcoming interviews
        const applications = this.props.applications.applications;
        const interviewsArray = applications.filter((application) => {
            // Return applications with an interview date of today or in the future
            return application.interview && moment(application.interview, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day');
        });
        const totalInterviews = interviewsArray.length;

        return (
            <section>
                <ul>
                    <li>viewing {totalJobs} applications.</li>
                    <li></li>
                    <li>{totalInterviews} upcoming interviews</li>
                </ul>
            </section>
        )
    }
}