import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Login extends Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <p>Clipboard is a React-based app that allows users to post about their NBA fantasy basketball teams and read posts from fellow users.
            </p>
            <form>
                <label htmlFor="">Username</label>
                <input type="text" />
                <label htmlFor="">Password</label>
                <input type="text" />
                <button>
                    <Link to={'/dashboard'}>
                    Log In
                    </Link>
                </button>
            </form>
            </div>
        )
    }
}

export default Login
