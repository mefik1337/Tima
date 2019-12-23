import React, {Component} from 'react';
import fire from "../../config/Firebase";

export default class Addtasks extends Component {
    state = {
        date: '',
        email: '',
        id: '',
        level: 'easy',
        name: '',
        progress: 1,
        status: 'tomake',
        errors: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    addTasks = e => {
        e.preventDefault();
        this.setState({
            date: '',
            email: '',
            id: '',
            level: 'easy',
            name: '',
            progress: 1,
            status: 'tomake',
            errors: ''
        });
        const db = fire.firestore();
        if (this.state.name.length >= 4 && this.state.date.length >= 1) {
            db.collection('todo').add({
                date: new Date(this.state.date),
                email: '',
                id: '',
                level: this.state.level,
                progress: this.state.level === "easy" ? 1 : this.state.level === "medium" ? 2 : this.state.level === "hard" && 3,
                name: this.state.name,
                status: this.state.status
            });
        } else {
            this.setState({
                errors: "Provide a real data for your task"
            })
        }
    };

    render() {
        const errorsJsx = this.state.errors && <div className="errorLogin">{this.state.errors}</div>;
        return (
            <div className="content-dashboard">
                <div className="container">
                    <div className="form_content">
                    <form className="addtasks" onSubmit={this.addTasks}>
                        {errorsJsx}
                        <p className="addtasks_header">Add new tasks</p>
                        <input type="text"
                               name="name"
                               onChange={this.handleChange}
                               placeholder="Name for your task"
                               value={this.state.name}/>
                        <label>Level of your task:</label>
                        <select
                            onChange={this.handleChange}
                            name="level" value={this.state.level}>
                            <option disabled value="">--Choose your level--</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <label>Date to make:</label>
                        <input
                            onChange={this.handleChange}
                            value={this.state.date}
                            type="date"
                            id="start"
                            name="date"
                            min="2019-01-01"
                            max="2023-12-31"/>
                        <input type="submit"
                               value="+"/>
                    </form>
                    </div>
                </div>
            </div>

        )
    }
}