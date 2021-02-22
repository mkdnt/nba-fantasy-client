import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

export class Nav extends Component {
    static contextType = UserContext;

    handleLogoutClick = () => {
        this.context.processLogout();
    }

    renderLoggedInNav() {
        return (
            <div>
                <ul>
                    <li>
                        <Link 
                        to='/myteam'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        My Team
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to='/network'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        League Stories
                        </Link>
                    </li>

                    <li>
                        <Link 
                        onClick={this.handleLogoutClick}
                        to='/'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        Logout
                        </Link>
                    </li>
                </ul>
                <hr
                    style={{
                    width: "100%",
                    border: "1px solid red",
                    backgroundColor: "red",
                    }}
                />
            </div>
        )
    }

    renderLoggedOutNav() {
        return (
            <div>
                <ul>
                    <li>
                        <Link 
                        to='/register'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        Register
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to='/login'
                        style={{ textDecoration: "none", color: "inherit" }}>
                        Login
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
                <hr
                    style={{
                    width: "100%",
                    border: "1px solid red",
                    backgroundColor: "red",
                    }}
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                {TokenService.hasAuthToken() ? this.renderLoggedInNav() : this.renderLoggedOutNav()}
            </div>
        )
    }
}

export default Nav
