import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Login extends Component {
    render() {
        return (
            <div>
                <h2>About</h2>
                <p>Clipboard is a React-based app that allows users to post about their NBA fantasy basketball teams and read posts from fellow users.
            </p>
            <form>
                <label for="">Username</label>
                <input type="text" />
                <label for="">Password</label>
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
