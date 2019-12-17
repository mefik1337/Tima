import React, {Component} from 'react';
import fire from '../config/Firebase'

export default class NavDashboard extends Component {

    handleLogOut = () => {
        fire.auth().signOut()
    };

    render() {
        return (
            <nav>
                <div className="container">
                    <div className="navbar-row">
                        <span className="nav-title">Tima <span>Dashboard</span></span>
                        <span className="nav-welcome">Welcome, <span>{this.props.name.email}</span></span>
                        <span className="nav-links">
                            <a><i className="fa fa-home"></i>Dashboard</a>
                            <a><i className="fa fa-calendar"></i>Calendar</a>
                            <a><i className="fa fa-cog"></i>Settings</a>
                        </span>
                            <button onClick={this.handleLogOut} className="logoutBtn"><i className="fa fa-sign-out"></i>Logout</button>
                    </div>
                </div>
            </nav>
        )
    }
}