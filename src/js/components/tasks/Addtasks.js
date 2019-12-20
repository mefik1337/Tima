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
        status: 'tomake'
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    addTasks = e => {
        e.preventDefault()
        const db = fire.firestore()
        db.collection('todo').add({
            date: new Date(this.state.date),
            email: '',
            id: '',
            level: this.state.level,
            progress: this.state.progress,
            name: this.state.name,
            status: this.state.status
        })
        this.setState({
            date: '',
            email: '',
            id: '',
            level: '',
            name: '',
        })
    };

    render() {
        return (
            <div className="content-dashboard">
                <div className="container">
                    <form className="addtasks-form" onSubmit={this.addTasks}>
                        <label>Name for your task:</label>
                        <input type="text" name="name" onChange={this.handleChange} placeholder="Name for your task"/>
                        <label>Level of your task:</label>
                        <select onChange={this.handleChange} name="level">
                            <option disabled value="">--Choose your level--</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <label>Date to make:</label>
                        <input onChange={this.handleChange} type="date" id="start" name="date"
                               min="2019-01-01" max="2023-12-31"/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            </div>

        )
    }
}