import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import AuthApiService from '../../services/auth-api-service'

export class Register extends Component {
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
        const { name, username, password, team_name, email } = event.target
        AuthApiService.postUser({
        name: name.value,
        username: username.value,
        password: password.value,
        team_name: team_name.value,
        email: email.value,
        })
        .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        team_name.value = ''
        email.value = ''
        this.context.handleRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }
        return (
            <div>
                <h2>Register</h2>
            <p>This is a React-based app that allows users to post about their NBA fantasy basketball teams and read posts from fellow users.
            </p>
        <form onSubmit={handleSubmit}>
          <div role='alert'>{error && <p>{error}</p>}</div>
          <input
            id='registration-name-input'
            name='name'
            placeholder='Name'
            required
          />
          <input
            id='registration-email-input'
            name='email'
            placeholder='Email'
            required
          />
          <input
            id='registration-team_name-input'
            name='team_name'
            placeholder='Team Name'
            required
          />
          <input
            id='registration-username-input'
            name='username'
            placeholder='Username'
            required
          />
        <div>
          <input
            id='registration-password-input'
            name='password'
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <footer>
          <button type='submit'>
            Register
          </button>
        </footer>
      </form>
            </div>
        )
    }
}

export default Register
