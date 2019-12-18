import React, {Component} from 'react';
import fire from "../../config/Firebase";

export default class Timer extends Component {
    state= {

    };
    handleClick = () => {
        this.props.setDate()
    };

    componentDidMount() {
        const db = fire.firestore();
        db.collection('timer').where('emailaddress', '==', this.props.name.email  ).get()
            .then(snapshot =>{
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    console.log(doc.data());
                });
            })
    }
    printInSeconds = (start, stop) => {
        if(start === null || stop === null ) {
            return "0:0:0"
        }
        const time = (Math.abs(start.getTime() - stop.getTime()) / 1000).toFixed(0);
         const sec = parseInt(time % 60);
         const min = parseInt(time / 60 ) % 60;
         const hours = parseInt(time / 3600);

         return`${hours}:${min}:${sec}`

    };

    render() {
        console.log(this.props, "timer")
        return (
            <div className="timer">
                <span className="timer-text">Your time in work today: {this.printInSeconds(this.props.startDate, this.props.currentDate)} </span>
                <button className={this.props.startDate=== null ? "startBtn" : "stopBtn"} onClick={this.handleClick}>{this.props.startDate=== null ? "start" : "stop" }</button>
            </div>
        )
    }
}
