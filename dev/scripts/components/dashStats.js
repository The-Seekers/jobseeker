import React from 'react';

// at-a-glance section
export default class DashStats extends React.Component {
    render() {
        let totalJobs;
        let totalText = '';
        let isFiltered = this.props.sorted.filteredDays;
        if (isFiltered === '') {
            totalJobs = this.props.applications.applications.length;
            totalText = `${totalJobs} total job applications`;
        } else {
            totalJobs = this.props.sorted.filteredApplications.length;
            totalText = `${totalJobs} job applications in the last ${this.props.sorted.filteredDays} days`;
        }

        console.log(this.props.applications.applications);

        return (
            <section>
                <ul>
                    <li>{totalText}</li>
                    <li></li>
                    <li>temp statcard</li>
                </ul>
            </section>
        )
    }
}