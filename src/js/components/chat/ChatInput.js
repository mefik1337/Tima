import {Component} from "react";
import React from "react";

export default class ChatInput extends Component {
    state = {
        text: ""
    };
    handleChange = (e) => {
        this.setState({text: e.target.value});
    };
    handleSubmit =(e) => {
        e.preventDefault();
        if(typeof this.props.SendAMessage === 'function'){
            this.props.SendAMessage(this.state.text);
            this.setState({text: ""});
        }
    };
    render() {
        return (
            <div>
                <form className="sendMsg" onSubmit={e => this.handleSubmit(e)}>
                    <input
                        type="text"
                        className="sendMsg-input"
                        onChange={e => this.handleChange(e)}
                        value={this.state.text}
                        placeholder="Aaa..."
                    />
                    <button className="sendMsg-btn">
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        );
    }
}
