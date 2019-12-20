import React, {Component} from 'react';
export default class ProgressBar extends Component {


    render() {
        return (
            <div className="progress">
                <p>{this.props.currentLevel} level</p>
                <div className="progress-empty">
                    <div className="progress-full" style={{width: this.props.progress + "%"}}>{this.props.progress}%
                    </div>
                </div>
                <p>{this.props.nextLevel} level</p>
            </div>
        );
    }
}
