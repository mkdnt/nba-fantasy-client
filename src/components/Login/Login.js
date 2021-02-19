import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext'

export class Login extends Component {
    static defaultProps = {
        location: {},
        history: {
        push: () => { },
        },
    }

    state = {
        error: null,
    }

  static contextType = UserContext;

    render() {

    const { error } = this.state

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, password } = event.target
        
        this.setState({error: null})

        AuthApiService.postLogin({
        username: username.value,
        password: password.value,
        })
        .then(res => {
            username.value = ''
            password.value = ''
            this.context.processLogin(res.authToken)
            this.context.handleLoginSuccess()
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }
        return (
            <div>
                <h2>Login</h2>
                <p>Clipboard is a React-based app that allows users to post about their NBA fantasy basketball teams and read posts from fellow users.
            </p>
            <form onSubmit={handleSubmit}>
                <div role='alert'>{error && <p>{error}</p>}</div>
                <input id='login-username-input' name='username' type="text" placeholder='username' required />
                <input id='login-password-input' name='password' type="password" placeholder='password' required />
                <button type='submit'>
                    Log In
                </button>
            </form>
            </div>
        )
    }
}

export default Login
