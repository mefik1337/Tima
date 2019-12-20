import React, {Component} from "react";
import fire from "../../config/Firebase";


export default class Todo extends Component {
    state = {
        list: []
    };

    componentDidMount() {
        const db = fire.firestore();
        db.collection('todo').where('date', '<=', new Date()).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                const newData = [];
                snapshot.forEach((doc => {
                        const obj = doc.data();
                        obj.id = doc.id;
                        obj.date = doc.data().date;
                        newData.push(obj)
                    }
                ));
                this.setState({
                    list: newData
                })
            })
    };

    //make to process data transfer
    handleClickToProcess = (id) => {
        const [oneTodo] = this.state.list.filter(item => item.id === id);
        oneTodo.status = 'process';
        oneTodo.email = this.props.name.email
        this.setState({
            list: [...this.state.list.filter(item => item.id !== id), oneTodo]
        });
        fire.firestore().collection('todo').doc(oneTodo.id).update(oneTodo)
    };

    renderToMakeList = () => {
        return this.state.list.filter(item => item.status === "tomake")
            .map((e, i) =>
                <p className={`todo-tomake-list-text`} key={e.id}
                   onClick={() => this.handleClickToProcess(e.id)}>{e.name}
                    <span className="todo-tomake-list-date-text">
                        {e.date.toDate().getDate()}-{e.date.toDate().getMonth() + 1}-{e.date.toDate().getFullYear()}
                        <span className={e.level}> {e.level}</span>
                    </span>
                </p>
            )

    };
    //process
    renderToProcessList = () => {
        return this.state.list.filter(item => item.status === "process")
            .map((e) =>
                <p className={`todo-tomake-list-text`} onClick={() => this.handleClickToDone(e.id)}
                   key={e.id}>{e.name}
                    <span className="todo-tomake-list-date-text">
                        <span className="email-green"> {e.email}</span> /
                        <span className={e.level}> {e.level}</span>
                    </span>
                </p>
            )
    };
    //process to done data transfer
    handleClickToDone = (id) => {
        const [oneTodo] = this.state.list.filter(item => item.id === id);
        oneTodo.status = 'done';
        this.setState({
            list: [...this.state.list.filter(item => item.id !== id), oneTodo]
        });
        fire.firestore().collection('todo').doc(oneTodo.id).update({
            status: "done"
        }).then(()=>{
            this.props.updateProgress()
        })
    };

    //done
    renderToDoneList = () => {
        return this.state.list.filter(item => item.status === "done")
            .map((e) =>
                <p className={`todo-tomake-list-text`} key={e.id}>{e.name}
                    <span className="todo-tomake-list-date-text">
                        {e.date.toDate().getDate()}-{e.date.toDate().getMonth() + 1}-{e.date.toDate().getFullYear()}/
                        <span className="email-green"> {e.email}</span>
                        <span className={e.level}> {e.level}</span>
                    </span>
                </p>
            )
    };

    render() {
        return (
            <div className="todo">
                <div className="todo-tomake">
                    <p className="todo-text">Has to be done</p>
                    <section className="todo-tomake-list">
                        {this.renderToMakeList()}
                    </section>
                </div>
                <div className="todo-process">
                    <p className="todo-text">Under progress</p>
                    <section className="todo-process-list">
                        {this.renderToProcessList()}
                    </section>
                </div>
                <div className="todo-done">
                    <p className="todo-text">Done tasks</p>
                    <section className="todo-done-list">
                        {this.renderToDoneList()}
                    </section>
                </div>
            </div>
        )
    }
}
