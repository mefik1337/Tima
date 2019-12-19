import React, {Component} from 'react';
import fire from "../../config/Firebase";

export default class Timer extends Component {
    state = {
        dates: []
    };
    handleClick = () => {
        this.props.setDate()
    };
    diffDate = (start, stop) => {
        return (Math.abs(start.getTime() - stop.getTime()) / 1000).toFixed(0);
    };

    componentDidMount() {
        this.getDatesFromDb()
    }

    getDatesFromDb = () => {
        const db = fire.firestore();
        db.collection('timer').where('emailaddress', '==', this.props.name.email)
            .where('startdate', '>=', this.firstDateForMonth())
            .where('startdate', '<=', this.lastDateForMonth()).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                const newDates = [];
                snapshot.forEach(doc => {
                    newDates.push({
                        startDate: doc.data().startdate.toDate(),
                        finishDate: doc.data().finishdate.toDate()
                    });

                });
                this.setState({
                    dates: newDates
                })
            })
    };
    firstDateForMonth = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const firstDay = "01";
        return new Date(`${currentYear}-${currentMonth}-${firstDay}`)
    };
    lastDateForMonth = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const lastDay = "31";
        return new Date(`${currentYear}-${currentMonth}-${lastDay}`)
    };
    printInSeconds = (start, stop) => {
        if (start === null || stop === null) {
            return "0:0:0"
        }
        const time = this.diffDate(start, stop);
        const sec = parseInt(time % 60);
        const min = parseInt(time / 60) % 60;
        const hours = parseInt(time / 3600);

        return `${hours}:${min}:${sec}`

    };
    getHoursInMonth = () => {
        const sec = this.state.dates.reduce((prev, next) => {
            return parseInt(this.diffDate(next.startDate, next.finishDate)) + parseInt(prev);
        }, 0);
        return sec; // sec/3600 <- hours
    };

    render() {
        return (
            <div className="timer">
                <div className="timer-text">
                    <p className="timer-text-main">Your time in work
                        today: {this.printInSeconds(this.props.startDate, this.props.currentDate)}</p>
                    <p className="timer-text-additional">Your hours in work(month):{this.getHoursInMonth()}</p>
                </div>
                <button className={this.props.startDate === null ? "startBtn" : "stopBtn"}
                        onClick={this.handleClick}>{this.props.startDate === null ? "start" : "stop"}</button>
            </div>
        )
    }
}
