import React, {Component} from 'react';
import NavDashboard from "./navDashboard";
import ContentDashboard from "./ContentDashboard"
export default class Dashboard extends Component{
    render() {
        return(
            <div className="dashboard">
                <NavDashboard name={this.props.name}/>
                <ContentDashboard/>
            </div>
        )
    }
}