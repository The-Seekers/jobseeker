import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';

export default class SharedApplicationList extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.applications.map((item) => {
                        return (
                            <Link to={`/shared/${this.props.userId}/${this.props.shareKey}/${item.key}`} key={item.key}>
                                <h3>{item.company}</h3>
                                <h4>{item.title}</h4>
                                <p>Last changed...</p>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }

}