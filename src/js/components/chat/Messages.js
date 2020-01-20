import {Component} from "react";
import React from "react";

class Messages extends Component {
    render() {
        const {messages} = this.props;
        return (
            <ul className="Messages-list">
                {messages.map((m, i) => this.renderMessage(m, i))}
            </ul>
        );
    }

    renderMessage(message, index) {
        const {member, text} = message;
        const {currentMember} = this.props;
        console.log(currentMember, 'current member');
        console.log(member, 'member')
        const messageFromMe = member.clientData.username === currentMember.username;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className} key={index}>
      <span
          className="avatar"
          style={{backgroundColor: member.clientData.color}}
      />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }
}

export default Messages;