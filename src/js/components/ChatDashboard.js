import React, {Component} from 'react';
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput"

export default class ChatDashboard extends Component {
    state = {
        messages: [],
        member: {
            username: this.props.name.email,
        }
    };
    componentDidMount() {
        this.getMessagesFromDb();
        localStorage.getItem('messages') && this.setState({
            messages: JSON.parse(localStorage.getItem('messages')),
        });
    }
    getMessagesFromDb = () => {
        this.drone = new window.Scaledrone("lvd8eghsCgksGJNb", {
            data: this.state.member,
        });
        this.drone.on('open', error => {
            if (error) return console.error(error);
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            this.setState({member});
        });
        const chat = this.drone.subscribe("observable-tima");
        chat.on('data', (message, username) => {
            const {messages} = this.state;
            messages.push({member: username, text: message});
            this.setState({messages});
        });
    };

    componentDidUpdate(nextProps, nextState) {
        localStorage.setItem('messages', JSON.stringify(nextState.messages));
        localStorage.setItem('member', JSON.stringify(nextState.member))
    }

    render() {
        return (
            <div className="content-dashboard">
                <div className="container">
                    <div className="content-dashboard-row">
                        <div className="content-dashboard">
                            <div className="chat">
                                <ChatMessages
                                    messages={this.state.messages}
                                    currentMember={this.state.member}
                                />
                                <ChatInput
                                    SendAMessage={this.SendAMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    SendAMessage = (msg) => {
        this.drone.publish({
            room: "observable-tima",
            message: msg
        });
    }
}