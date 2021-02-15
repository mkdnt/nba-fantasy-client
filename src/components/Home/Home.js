import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    render() {
        return (
            <div>
            <h2>Welcome</h2>
            <p>Clipboard is a React-based app that allows users to post about their NBA fantasy basketball teams and read posts from fellow users.
            </p>
            <p>If you've made an account, you can log in below. Otherwise, please register for an account or log in with the demo accout, username: demo, password: DemoPass1234!</p>
            <form>
                
                <input type="text" placeholder='Username' />
                <input type="text" placeholder='Password' />
                <button>
                    <Link to={'/users/1'}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    Log In
                    </Link>
                </button>
            </form>
        </div>
        )
    }
}

export default Home
