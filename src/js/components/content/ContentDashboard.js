import React, {Component} from 'react';
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";


class Todo extends Component {


    render() {
        return (
            <div className="todo">
                <div className="todo-tomake">
                    <p className="todo-text">Has to be done</p>
                    <section className="todo-tomake-list">
                        <p>zmiana tekstu</p>
                    </section>
                </div>
                <div className="todo-process">
                    <p className="todo-text">I'm making it</p>
                        <section className="todo-process-list">
                            <p>zmiana tla</p>
                        </section>
                </div>
                <div className="todo-done">
                    <p className="todo-text">Done tasks</p>
                    <section className="todo-done-list">
                        <p>szablon stron</p>
                    </section>
                </div>
            </div>
        )
    }
}


export default class ContentDashboard extends Component {
    render() {
        return (
            <div className="content-dashboard">
                <div className="container">
                    <div className="content-dashboard-row">
                        <Timer/>
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