import React, { Component } from 'react';
import api from '../../config';

export class UsersList extends Component {

    state = {
        users: [],
    }
    
    componentDidMount() {
    fetch(`${api.API_ENDPOINT}/users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${api.API_KEY}`,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again.');
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        users: data,
      })
    })
    .catch((error) => {
      console.error({error})
    })
  };

    render() {
        const users = this.state.users
        return (
            <section>
                <ul
                style={{
                listStyleType: "none",
                textDecoration: "none",
                color: "inherit",
                paddingLeft: "0",
                }}
                >
                {users.map((user) => (
                    <li key={user.id} style={{ textDecoration: "none" }}>
                        {user.teamname} | {user.username}
                    </li>
                ))}
                </ul>
            </section>
        )
    }
}

export default UsersList
