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
            .catch(error => {
                this.setState({errors: error.message})
            });
    };

    handleRegister = e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => {
                this.setState({errors: error.message})
            });
    };
    switchBtns = toggle => {
        if (toggle === 'reg') {
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

        return (
            <section className="loginandregister">
                <div className="container">
                    <div className="login">
                        <div className="login-row">
                            <div id="login-btns">
                                <a className={this.state.loginBtn ? "triggerBtns login-active" : "triggerBtns"} onClick={() => this.switchBtns('log')}>Log in</a>
                                <a className={this.state.loginBtn ? "triggerBtns" : "triggerBtns register-active"} onClick={() => this.switchBtns('reg')}>Register</a>
                            </div>
                            <div className="login-body">
                                <span className="login-title">{this.state.title}</span>
                                {errorsJsx}
                                <form className="login-form">
                                    <input type="text"
                                           placeholder="put your e-mail address"
                                           value={this.state.email}
                                           onChange={this.handleChange}
                                           name="email"/>

                                    <input type="password"
                                           placeholder="put your password"
                                           value={this.state.password}
                                           onChange={this.handleChange}
                                           name="password"/>
                                    {logRegBtns}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}