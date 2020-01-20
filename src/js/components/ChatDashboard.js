import React, {Component} from 'react';
import Messages from "./chat/Messages";
import Input from "./chat/Input"

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default class ChatDashboard extends Component {
    state = {
        messages: [],
        member: {
            username: this.props.name.email,
            color: randomColor(),
        }
    };

    componentDidMount() {
        this.drone = new window.Scaledrone("lvd8eghsCgksGJNb", {
            data: this.state.member,
        });
        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const member = {...this.state.member};
            console.log(member);
            member.id = this.drone.clientId;
            this.setState({member});
        });
        const room = this.drone.subscribe("observable-tima");
        room.on('data', (data, username) => {
            const messages = this.state.messages;
            messages.push({member: username, text: data});
            this.setState({messages});
        });
        localStorage.getItem('messages') && this.setState({
            messages: JSON.parse(localStorage.getItem('messages')),
        });
    }

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
                                <Messages
                                    messages={this.state.messages}
                                    currentMember={this.state.member}
                                />
                                <Input
                                    onSendMessage={this.onSendMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-tima",
            message
        });
    }
}