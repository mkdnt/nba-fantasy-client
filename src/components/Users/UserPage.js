import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import PostsList from '../Post/PostsList'
import PlayersList from '../Player/PlayersList'
import './UserPage.css';

export class UserPage extends Component {
    state = {
        user: {},
        userPosts: [],
        userPlayers: [],
    };

    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = UserContext;

    
    componentDidMount() {
        const { user_id } = this.props.match.params;
        //grab user_id from params and fetch the user's info, posts, and players
        Promise.all([
        fetch(`${api.API_ENDPOINT}/users/${user_id}`),
        fetch(`${api.API_ENDPOINT}/posts/byuser/${user_id}`),
        fetch(`${api.API_ENDPOINT}/players/byuser/${user_id}`),
        ])
        .then(([userRes, userPostsRes, userPlayersRes ]) => {
            if (!userRes.ok) 
                return userRes.json().then((e) => Promise.reject(e));
            if (!userPostsRes.ok)
                return userPostsRes.json().then((e) => Promise.reject(e));
            if (!userPlayersRes.ok)
                return userPlayersRes.json().then((e) => Promise.reject(e));

            return Promise.all([userRes.json(), userPostsRes.json(), userPlayersRes.json()]);
        })
        .then(([user, userPosts, userPlayers]) => {
            this.setState({ user, userPosts, userPlayers });          
        })
        .catch((error) => {
            console.error({ error });
        });
        
    }

    render() {
        const user = this.state.user
        const posts = this.state.userPosts
        const players = this.state.userPlayers

        //send user's info to PostsList and PlayersList for display, just like on MyTeam component for the logged in user

    return (
            <div>
                <div>
                    <h2>{user.team_name}</h2>
                    <p>Manager: {user.username}</p>
                </div>
                    <h3>Players</h3>
                    <div className='users-players'>
                        <PlayersList 
                            players={players}
                            history={this.props.history}
                        />
                    </div>
            
            <div>
                <h3>Posts</h3>
                <PostsList 
                    posts={posts}
                    history={this.props.history}
                />
            </div>
        </div>
            )

        
    }
}

export default UserPage
