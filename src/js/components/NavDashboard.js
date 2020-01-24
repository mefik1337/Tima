import React, {Component} from 'react';
import fire from '../config/Firebase'
import { NavLink } from 'react-router-dom';
import 'firebase/firestore';
export default class NavDashboard extends Component {
    state = {
        name: "",
        surname: "",
        isopen: false
    };

    handleLogOut = () => {
        fire.auth().signOut()
    };

    handleBurger = () => {
        this.setState(prevState => ({
            isopen: !prevState.isopen
        }));
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
                        surname: doc.data().surname,
                    })
                });
            })
    }

    render() {
        const addTasks = <NavLink to="/Addtasks" activeClassName="nav-chosen"><i className="fa fa-thumb-tack" aria-hidden="true"></i>Add tasks</NavLink>;
        const noPermission = <NavLink to="/NoPermission" activeClassName="nav-chosen"><i className="fa fa-thumb-tack" aria-hidden="true"></i>Add tasks</NavLink>;
        const checkTheLevel = this.props.level > 1 ? addTasks : noPermission;
        return (
            <>
            <button className="hidden-hamburger" onClick={this.handleBurger}>{this.state.isopen ?
                <i className="fa fa-bars"></i> : <i className="fa fa-times"></i>}</button>
            <nav className={this.state.isopen ? "hidden" : null}>
                <div className="container">
                    <div className="navbar-row">
                        <span className="nav-title">Tima <span>Dashboard</span></span>
                        <span className="nav-welcome">Hi, <span>{this.state.name} {this.state.surname}</span></span>
                        <div className="nav-links">
                            <NavLink to="/content" activeClassName="nav-chosen"><i className="fa fa-home"></i>Dashboard</NavLink>
                            <NavLink to="/chat" activeClassName="nav-chosen"><i className="fa fa-commenting"></i>Chat</NavLink>
                            {checkTheLevel}
                            <button onClick={this.handleLogOut} className="logoutBtn"><i className="fa fa-sign-out"></i>Logout</button>
                        </div>

                    </div>
                </div>
            </nav>
            </>
        )
    }
}