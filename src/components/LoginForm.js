import React, { Component } from 'react';

export default class LoginForm extends Component {
    state={
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render(){
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={event => this.props.login(event)}>
                    <label>Username: <input name="username" type="text" onChange={this.handleChange} /></label><br />
                    <label>Password: <input name="password" type="password" onChange={this.handleChange} /></label><br />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}