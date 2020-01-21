import {Component} from "react";
import React from "react";

export default class ChatMessages extends Component {
    render() {
        const {messages} = this.props;
        return (
            <ul className="chat-list">
                {messages.map((m, i) => this.showTheMessage(m, i))}
            </ul>
        );
    }
    showTheMessage = (message, index) => {
        const {member, text} = message;
        const {currentMember} = this.props;
        const recognizeMessage =
            member.clientData.username === currentMember.username ?
            "chat-message current-user" :
            "chat-message";
        return (
            <li className={recognizeMessage} key={index}>
                <div className="chat-content">
                    <div className="chat-user">
                        {member.clientData.username}
                    </div>
                    <div className="chat-text">{text}</div>
                </div>
            </li>
        );
    }
}