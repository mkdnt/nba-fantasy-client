import React, { Component } from 'react';
import PostsList from '../Post/PostsList';
import UserContext from '../../contexts/UserContext';
import UserCard from '../Users/UserCard';
import api from '../../config';

export class Network extends Component {
    state = {
        allUsers: [],
        allPosts: [],
    }

    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = UserContext;

    componentDidMount() {
        //get all users and all posts from db, add to state for display below
        Promise.all([
            fetch(`${api.API_ENDPOINT}/users`),
            fetch(`${api.API_ENDPOINT}/posts`),
        ])
        .then(([allUsersRes, allPostsRes]) => {
            if (!allUsersRes.ok)
                return allUsersRes.json().then((e) => Promise.reject(e));
            if (!allPostsRes.ok)
                return allPostsRes.json().then((e) => Promise.reject(e));
            return Promise.all([allUsersRes.json(), allPostsRes.json()]);
        })
        .then(([allUsers, allPosts]) => {
            this.setState({allUsers, allPosts});
        })
        .catch((error) => {
            console.error({error})
        })
    }

    render() {
        //filter the users from state to exclude logged in user from context, displaying only "other" teams for the logged in user to see

        const users = this.state.allUsers.filter(user => user.id != this.context.user.id)

        //bring all posts, including user's posts, so it is a full picture of what is happening around the league

        const posts = this.state.allPosts

        //users are .mapped on this component, posts sent to PostsList component for .mapping 
        
        return (
            <div>
                <h2>Teams</h2>
                <div className='users-players'>
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
                        <UserCard 
                            user={user}
                        />
                    </li>
                ))}
                </ul>
                </div>
                <h2>League Stories</h2>
                <div>
                    <PostsList 
                        posts={posts}
                        users={users}
                    />
                </div>
            </div>
        )
    }
}

export default Network
