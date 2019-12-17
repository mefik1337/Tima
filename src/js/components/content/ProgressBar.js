import React, {Component} from 'react';

export default class ProgressBar extends Component {

    render() {
        return (
            <div className="progress">
                <p>rookie</p>
                <div className="progress-empty">
                    <div className="progress-full">0%</div>
                </div>
                <p>noob</p>
            </div>
        );
    }
}
