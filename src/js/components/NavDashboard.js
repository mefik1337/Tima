import React, {Component} from 'react';
import fire from '../config/Firebase'
import { NavLink } from 'react-router-dom';
import ContentDashboard from "./content/ContentDashboard";
import 'firebase/firestore';
export default class NavDashboard extends Component {
    state = {
        name: "",
        surname: ""
    };

    handleLogOut = () => {
        fire.auth().signOut()
    };

    componentDidMount() {
        const db = fire.firestore();
        let query = db.collection('users').where('emailaddress', '==', this.props.name.email).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    this.setState({
                        name: doc.data().name,
                        surname: doc.data().surname
                    })
                });
            })
    }

    render() {
        return (
            <nav>
                <div className="container">
                    <div className="navbar-row">
                        <span className="nav-title">Tima <span>Dashboard</span></span>
                        <span className="nav-welcome">Hi, <span>{this.state.name} {this.state.surname}</span></span>
                        <span className="nav-links">
                            <NavLink to="/content" activeClassName="nav-chosen"><i className="fa fa-home"></i>Dashboard</NavLink>
                            <NavLink to="/calendar" activeClassName="nav-chosen"><i className="fa fa-calendar"></i>Calendar</NavLink>
                            <NavLink to="/settings" activeClassName="nav-chosen"><i className="fa fa-cog"></i>Settings</NavLink>
                            <button onClick={this.handleLogOut} className="logoutBtn"><i className="fa fa-sign-out"></i>Logout</button>
                        </span>

                    </div>
                </div>
            </nav>
        )
    }
}