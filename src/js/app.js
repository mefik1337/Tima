import React from 'react';
import ReactDOM from 'react-dom';
import fire from './config/Firebase'
import './../sass/style.scss'; // adres do głównego pliku SASS
import LoginAndRegister from "./components/LoginAndRegister";
import Dashboard from "./components/Dashboard";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

class App extends React.Component {
    state = {
        user: null,
    };

    componentDidMount() {
        this.authChecker();
    }

    authChecker() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: user
                })
            } else {
                this.setState({
                    user: null
                })
            }
        });
    }

    render() {
        return (
            <>
                <HashRouter>
                    <Switch>
                        <Route path='/'
                               render={() => this.state.user ? <Dashboard name={this.state.user}/> : <LoginAndRegister/>}/>
                    </Switch>
                </HashRouter>
            </>
        )
    }
}


document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    )
});

