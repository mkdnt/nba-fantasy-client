import React, { Component } from 'react'
import PostContext from '../../contexts/PostContext';
import api from '../../config';
import PostsList from '../Post/PostsList'

export class UserPage extends Component {
    state = {
        user: {},
        posts: [],
    };

    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = PostContext;

    componentDidMount() {
        const { user_id } = this.props.match.params;

        Promise.all([
        fetch(`${api.API_ENDPOINT}/users/${user_id}`),
        fetch(`${api.API_ENDPOINT}/users/${user_id}/posts`),
        ])
        .then(([userRes, postsRes]) => {
            if (!userRes.ok) 
                return userRes.json().then((e) => Promise.reject(e));
            if (!postsRes.ok)
                return postsRes.json().then((e) => Promise.reject(e));

            return Promise.all([userRes.json(), postsRes.json()]);
        })
        .then(([user, posts]) => {
            this.setState({ user, posts });
        })
        .catch((error) => {
            console.error({ error });
        });
    }
    
//     componentDidMount() {
//     const { user_id } = this.props.match.params;

//     fetch(`${api.API_ENDPOINT}/users/${user_id}`, {
//       method: 'GET',
//       headers: {
//         'content-type': 'application/json',
//         Authorization: `Bearer ${api.API_KEY}`,
//       },
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Something went wrong, please try again.');
//       }
//       return res;
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       this.setState({
//         user: data,
//       })
//     })
//     .catch((error) => {
//       console.error({error})
//     })
//   };

    render() {
        const user = this.state.user
        const posts = this.state.posts

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
        <div>
            <PostsList 
                posts={posts}
            />
        </div>
    </div>
        )
    }
}

export default UserPage
