import React, {Component} from 'react';

const data = [
    {
        sender: 'mark',
        text: 'hi'
    },
    {
        sender: 'markus',
        text: 'hiasdas'
    },
];

export default class ChatText extends Component {
    render() {
        return (
            <div>
                {data.map((e, i) =>
                    <div key={i}>
                    <div>{e.text} </div>
                    <span>{e.sender}</span>
                    </div>
                )}
            </div>
        );
    }
}