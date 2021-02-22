import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

export class UserCard extends Component {
    static defaultProps = {
        match: {
            params: {},
        },
        history: {
            push: () => {},
        }
    };

    static contextType = UserContext

    render() {
        const user = this.props.user

        return (
            <div className='user-card' value={user.id}>
                <Link to={`/users/${user.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <p id='user-team_name'>{user.team_name}</p>
                </Link>
            </div>
        )
    }
}

export default UserCard
