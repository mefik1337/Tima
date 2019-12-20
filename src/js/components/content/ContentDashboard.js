import React, {Component} from 'react';
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import Todo from "./todo";
import fire from "../../config/Firebase";


export default class ContentDashboard extends Component {
    state = {
      progress:0,
      currentLevel: 1,
      nextLevel: 2
    };
    componentDidMount() {
        this.updateProgressBar()
    }

    updateProgressBar = () => {
        const db = fire.firestore();
        db.collection('todo').where('email', '==', this.props.name.email)
            .where('status', '==', 'done').get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                let progress = 0;
                snapshot.forEach((doc => {
                        const obj = parseInt(doc.data().progress);
                        progress += obj
                    }
                ));
                if(progress === 100 ){
                    this.setState({
                        progress: 0,
                        currentLevel: this.state.currentLevel + 1,
                        nextLevel: this.state.nextLevel + 1
                    })
                } else {
                    this.setState({
                        progress: progress,
                        currentLevel: this.state.currentLevel,
                        nextLevel: this.state.nextLevel
                    })
                }
            })
    };
    render() {
        return (
            <div className="content-dashboard">
                <div className="container">
                    <div className="content-dashboard-row">
                        <Timer {...this.props}/>
                        <ProgressBar {...this.props} {...this.state}/>
                    </div>
                    <div className="content-dashboard-row2">
                        <Todo {...this.props} updateProgress={this.updateProgressBar}/>
                    </div>
                </div>
            </div>
        )
    }
}