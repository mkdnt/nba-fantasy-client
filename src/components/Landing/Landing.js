import React, { Component } from 'react';
import Login from '../Login/Login'

export class Landing extends Component {
    render() {
        return (
            <div>
            <h2>Welcome</h2>
            <p>This is a React-based app that allows users to post about their NBA fantasy basketball teams and read posts from fellow users.
            </p>
            <p>If you've made an account, you can log in below. Otherwise, please register for an account or log in with the demo account, username: demo, password: DemoPass1234!</p>
            <Login />
        </div>
        )
    }
}

export default Landing
