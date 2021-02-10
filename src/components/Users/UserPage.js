import React, { Component } from 'react'
import PostContext from '../../contexts/PostContext';
import api from '../../config';

export class UserPage extends Component {
    state = {
        user: {},
    };
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = PostContext;
    
    componentDidMount() {
    const { user_id } = this.props.match.params;

    fetch(`${api.API_ENDPOINT}/users/${user_id}`, {
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
        user: data,
      })
    })
    .catch((error) => {
      console.error({error})
    })
  };
    render() {
        const user = this.state.user

        return (
            <div>
        <div>
            <h2>{user.teamname}</h2>
            <p>{user.username}</p>
            <p>Maybe let them have some message or status or whatever here.</p>
        </div>
        <div>
            <ul>
                <li>Player</li>
            </ul>
            <button onClick={this.handleAddNewPlayer}>Add Player</button>
        </div>
    </div>
        )
    }
}

export default UserPage
