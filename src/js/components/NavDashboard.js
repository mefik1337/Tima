import React, {Component} from 'react';
import fire from '../config/Firebase'
import { NavLink } from 'react-router-dom';
import ContentDashboard from "./content/ContentDashboard";
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
                            <NavLink to="/content" activeClassName="nav-chosen"><i className="fa fa-home"></i>Dashboard</NavLink>
                            <NavLink to="/calendar" activeClassName="nav-chosen"><i className="fa fa-calendar"></i>Calendar</NavLink>
                            <NavLink to="/settings" activeClassName="nav-chosen"><i className="fa fa-cog"></i>Settings</NavLink>
                        </span>
                            <button onClick={this.handleLogOut} className="logoutBtn"><i className="fa fa-sign-out"></i>Logout</button>
                    </div>
                </div>
            </nav>
        )
    }
}