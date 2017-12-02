import React from 'react';

// at-a-glance section
export default class DashStats extends React.Component {
    render() {
        // dynamically update # of totalJobs for dashstats
        let totalJobs;
        let isFiltered = this.props.sorted.filtered;
        if (isFiltered === false) {
            totalJobs = this.props.applications.applications.length;
        } else if (isFiltered === true) {
            totalJobs = this.props.sorted.filteredApplications.length;
        }

        // dynamically update # of jobs flagged as needing action
        const allJobs = this.props.applications.applications;
        const flaggedJobs = allJobs.filter((flagged) => {
            if (flagged.needsAction === true){
                return flagged
            }
        });
        let flaggedTotal = flaggedJobs.length
        
        return (
            <section>
                <ul>
                    <li>viewing {totalJobs} applications.</li>
                    <li>{flaggedTotal} applications need action.</li>
                    <li>temp statcard</li>
                </ul>
            </section>
        )
    }
}