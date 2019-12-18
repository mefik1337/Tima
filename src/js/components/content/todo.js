import React, {Component} from "react";
import fire from "../../config/Firebase";


export default class Todo extends Component {
     state = {
         tomake: [],
     };
    componentDidMount() {
        const db = fire.firestore();
        db.collection('todo').get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach((doc =>
                    this.setState({
                        tomake: [doc.data().tomake],
                        tomakeClone: [...this.state.tomake]
                    })
            ))
            })
    };

    render() {
        console.log(this.state.tomakeClone);
        return (
            <div className="todo">
                <div className="todo-tomake">
                    <p className="todo-text">Has to be done</p>
                    <section className="todo-tomake-list">
                        {this.state.tomake}
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
