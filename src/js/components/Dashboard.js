import React, {Component} from 'react';
import fire from '../config/Firebase'

export default class Dashboard extends Component{

    handleLogOut = () => {
        fire.auth().signOut()
    };
    render() {
        console.log(this.props.name.email);
        return(
            <div>
                <h1>Welcome back, {this.props.name.email}</h1>
                <button onClick={this.handleLogOut} >Logout</button>
            </div>
        )
    }
}