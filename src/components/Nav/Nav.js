import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Nav extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link 
                        to='/login'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        Login
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to='/network'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        Network
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to='/about'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        About
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Nav
