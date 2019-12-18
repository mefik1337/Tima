import React, {Component} from 'react';
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import Todo from "./todo";


export default class ContentDashboard extends Component {
    render() {
        return (
            <div className="content-dashboard">
                <div className="container">
                    <div className="content-dashboard-row">
                        <Timer {...this.props}/>
                        <ProgressBar/>
                    </div>
                    <div className="content-dashboard-row2">
                        <Todo/>
                    </div>
                </div>
            </div>
        )
    }
}