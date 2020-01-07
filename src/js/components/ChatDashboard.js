import React, {Component} from 'react';
import ChatText from "./chat/ChatText";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import {instance, api} from '../config/Chatkit'
export default class ChatDashboard extends Component{
    componentDidMount() {
        const tokenProvider = new TokenProvider({
            url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/378b13cf-fcb0-4293-887a-9824f327e1c9/token'
        });
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:378b13cf-fcb0-4293-887a-9824f327e1c9',
            userId: "matthias",
            tokenProvider: tokenProvider
        });
        chatManager
            .connect()
            .then(currentUser => {
                currentUser.subscribeToRoomMultipart({
                    roomId: '6a2da358-38c4-428b-a874-034fcd66e2be',
                    hooks: {
                        onMessage: message => {
                            console.log("Received message:", message)
                        }
                    }
                });
            })
            .catch(error => {
                console.error("error:", error);
            });
    }
    render() {
        return(
            <div className="content-dashboard">
                <div className="container">
                    <div className="content-dashboard-row">
                        <span className="content-dashboard">
                            <ChatText />
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}