import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <h1>Clipboard</h1>
                </Link>
                <hr
                    style={{
                    width: "90%",
                    border: "2px solid red",
                    backgroundColor: "red",
                    }}
                />
            </div>
        )
    }
}

export default Header
