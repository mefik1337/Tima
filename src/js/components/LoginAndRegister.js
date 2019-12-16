import React, {Component} from 'react';
import fire from '../config/Firebase'

export default class LoginAndRegister extends Component {
    state = {
        email: '',
        password: '',
        errors: '',
        title: 'Login',
        loginBtn: true
    };

    handleChange = e => {
            this.setState({
                [e.target.name]: e.target.value
            })
    };

    handleLogin = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch( error => {
                this.setState({errors: error.message})
        });
    };

    handleRegister = e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch( error => {
                this.setState({errors: error.message})
            });
    };
    switchBtns = toggle => {
        if(toggle === 'reg'){
            this.setState({
                title: "Register",
                loginBtn: false,
                errors: ""
            })
        } else {
            this.setState({
                title: "Login",
                loginBtn: true,
                errors: ""
            })
        }
    };
    render() {
        const errorsJsx = this.state.errors && <div className="errorLogin">{this.state.errors}</div>;

        const logRegBtns = this.state.loginBtn ?
            <input type="submit" className="loginBtn" onClick={this.handleLogin} value="Log in"/> :
            <input type="submit" className="registerBtn" onClick={this.handleRegister} value="Register"/>;

        const toggleBtns = this.state.loginBtn ?
            <button className="registerBtn" onClick={() => this.switchBtns('reg')}>Register</button> :
            <button className="registerBtn" onClick={() => this.switchBtns('log')}>Log in</button>;


        return (
            <div className="loginandregister">
                <div id="login-title" >{this.state.title}</div>
                <div className="login-body">
                    {errorsJsx}
                    <form>
                    <input type="text"
                           value={this.state.email}
                           onChange={this.handleChange}
                           name="email" />

                     <input type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password" />
                    {logRegBtns}
                    </form>
                    {toggleBtns}
                </div>
            </div>
        )
    }
}