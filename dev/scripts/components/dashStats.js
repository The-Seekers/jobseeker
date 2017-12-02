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
        return (
            <section>
                <ul>
                    <li>viewing {totalJobs} applications.</li>
                    <li></li>
                    <li>temp statcard</li>
                </ul>
            </section>
        )
    }
}