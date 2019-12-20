import React, {Component} from 'react';
import NavDashboard from "./NavDashboard";
import ContentDashboard from "./content/ContentDashboard";
import {Route} from "react-router-dom";
import SettingsDashboard from "./SettingsDashboard";
import CalendarDashboard from "./CalendarDashboard";
import fire from "../config/Firebase";

export default class Dashboard extends Component{
    state = {
        startDate: null,
        finishDate: null,
        currentDate: null,
    };

    setDate = () => {
        if (this.state.startDate === null) {
            this.setState({
                startDate: new Date()
            });
            this.intervalId = setInterval(()=>{
                this.setState({
                    currentDate: new Date()
                })
            }, 1000)
        } else if (this.state.finishDate === null) {
            this.setState( {
                finishDate: new Date()
            }, ()=> {
                const db = fire.firestore();
                const timerRef = db.collection("timer").add({
                    emailaddress: this.props.name.email,
                    startdate: this.state.startDate,
                    finishdate: this.state.finishDate
                });
                this.setState({
                    startDate: null,
                    finishDate: null,
                    currentDate: null
                })
            });
            clearInterval(this.intervalId)
        }
    };


    render() {
        return(
            <div className="dashboard">
                    <NavDashboard name={this.props.name}/>
                <Route path='/content' render={() => <ContentDashboard {...this.state} {...this.props} setDate={this.setDate}/>} />
                <Route path='/calendar' render={() => <CalendarDashboard/>} />
                <Route path='/settings' render={() => <SettingsDashboard/>}/>

            </div>
        )
    }
}