import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>App Title?</h1>
        </Link>
            </div>
        )
    }
}

export default Header
