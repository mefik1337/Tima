import React, {Component} from 'react';
import NavDashboard from "./NavDashboard";
import ContentDashboard from "./content/ContentDashboard";
import {Route} from "react-router-dom";
import SettingsDashboard from "./SettingsDashboard";
import CalendarDashboard from "./CalendarDashboard";

export default class Dashboard extends Component{
    render() {
        return(
            <div className="dashboard">

                    <NavDashboard name={this.props.name}/>
                <Route path='/content' component={ContentDashboard} />
                <Route path='/calendar' component={CalendarDashboard} />
                <Route path='/settings' component={SettingsDashboard} />

            </div>
        )
    }
}