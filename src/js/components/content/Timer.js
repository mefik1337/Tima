import React, {Component} from 'react';

export default class Timer extends Component {
    state = {
        timer: 0,
        toggle: true
    };

    handleClick = (toggle) => {
        if(toggle === 'start') {
            this.setState({
                toggle: false
            })
        } else {
            this.setState({
                toggle: true
            })
        }
    };
    render() {
        const toggleBtn = this.state.toggle ? <button className="startBtn" onClick={() => this.handleClick('start')}>Start</button> : <button className="stopBtn" onClick={() => this.handleClick('stop')}>Stop</button>
        return(
            <div className="timer">
                <span className="timer-text">Your time in work today: {this.state.timer}</span>
                {toggleBtn}
            </div>
        )
    }
}
