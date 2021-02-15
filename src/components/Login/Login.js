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
                <input className='username-login' type="text" placeholder='username' />
                <input type="text" placeholder='password' />
                <button>
                    <Link to={'/dashboard'}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    Log In
                    </Link>
                </button>
            </form>
            </div>
        )
    }
}

export default Login
