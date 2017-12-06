import React from 'react';
import moment from 'moment';

// at-a-glance section
export default class DashStats extends React.Component {
    render() {
        // dynamically update # of totalJobs for dashstats
        let totalJobs;
        let totalText = '';
        let isFiltered = this.props.sorted.filteredDays;
        if (isFiltered === '') {
            totalJobs = this.props.applications.applications.length;
            totalText = `total applications`;
        } else {
            totalJobs = this.props.sorted.filteredApplications.length;
            totalText = `applications in the last ${this.props.sorted.filteredDays} days`;
        }
        
        // Count upcoming interviews
        const applications = this.props.applications.applications;
        const interviewsArray = applications.filter((application) => {
            // Return applications with an interview date of today or in the future
            return application.interview && moment(application.interview, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day');
        });
        const totalInterviews = interviewsArray.length;

        // dynamically update # of jobs flagged as needing action
        const allJobs = this.props.applications.applications;
        const flaggedJobs = allJobs.filter((flagged) => {
            if (flagged.needsAction === true) {
                return flagged
            }
        });
        let flaggedTotal = flaggedJobs.length

        return (
            <section className='dashStats'>
            <div className="wrapper">
                    <ul className='clearfix'>
                        <li>
                            <h2 className='statsTotal'>{totalJobs}</h2>
                            <h3>{totalText}</h3>
                        </li>
                        <li>
                            <h2 className='statsAction'>{flaggedTotal}</h2>
                            <h3>applications need action</h3>
                        </li>
                        <li>
                            <h2 className='statsUpcoming'>{totalInterviews}</h2>
                            <h3>upcoming interviews</h3>
                        </li>
                    </ul>
            </div>
            </section>
        )
    }
}