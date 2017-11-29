import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationList from './applicationList'

// main app dashboard (high level state!)
export default class Dashboard extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <main>
                <DashStats />
                <ApplicationList />
            </main>
        )
    }
}

// stats at a glance
class DashStats extends React.Component {
    render() {
        return (
            <section>
                <ul>
                    <li>temp statcard</li>
                    <li>temp statcard</li>
                    <li>temp statcard</li>
                </ul>                
            </section>
        )
    }
}

// jobs list navigation ui
class JobsListNav extends React.Component {
    render() {
        return (
            <nav>
                <form>
                    <select name='sortBy'>
                        <option value='sortOption'>sort by...</option>
                        <option value='sortOption'>sort by...</option>
                        <option value='sortOption'>sort by...</option>
                    </select>
                    <input type='search' placeholder='search'/>
                </form>
                
            </nav>
        )
    }
}