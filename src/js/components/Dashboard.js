import React, {Component} from 'react';
import NavDashboard from "./NavDashboard";
import ContentDashboard from "./content/ContentDashboard";
import {Route} from "react-router-dom";
import ChatDashboard from "./ChatDashboard";
import Addtasks from "./tasks/Addtasks";
import fire from "../config/Firebase";
import NoPermission from "./NoPermission/NoPermission";

export default class Dashboard extends Component{
    state = {
        startDate: null,
        finishDate: null,
        currentDate: null,
        level: 0,
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

    componentDidMount() {
        const db = fire.firestore();
        db.collection('users').where('emailaddress', '==', this.props.name.email).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc =>
                {this.setState({
                    level: doc.data().accountLevel,
                })
                });
            })
    }

    render() {
        const addTasks = <Route path='/addtasks' render={() => <Addtasks />}/>;
        const noPermission = <Route path='/nopermission' render={() => <NoPermission />}/>;
        const checkTheLevel = this.state.level > 1 ? addTasks : noPermission;
        return(
            <div className="dashboard">
                    <NavDashboard name={this.props.name} level={this.state.level}/>
                <Route path='/content' render={() => <ContentDashboard {...this.state} {...this.props} setDate={this.setDate}/>} />
                <Route path='/chat' render={() => <ChatDashboard {...this.props}/>} />
                {checkTheLevel}

            </div>
        )
    }
}