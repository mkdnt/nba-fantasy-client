import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import PostsList from '../Post/PostsList'
import PlayerCard from '../Player/PlayerCard'
import './UserPage.css';

export class UserPage extends Component {
    state = {
        user: {},
        userPosts: [],
        playersToAdd: [],
        userPlayers: [],
    };

    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = UserContext;

    //what are you mounting, etc.
    //call functions for fetching inside of CDM
    // fetchUsers(), fetchPosts()
    //try and catch
    componentDidMount() {
        const { user_id } = this.props.match.params;
        //test for an empty user
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

    return (
            <div>
                <div>
                    <h2>{user.team_name}</h2>
                    <p>{user.username}</p>
                </div>
                    <h3>Players</h3>
                    <div className='users-players'>
                        <ul
                        style={{
                        listStyleType: "none",
                        textDecoration: "none",
                        color: "inherit",
                        paddingLeft: "0",
                        }}
                        >
                        {players.map((player) => (
                            <li key={player.id} style={{ textDecoration: "none" }}>
                                {console.log('userpage', players)}
                                <PlayerCard 
                                    player={player}
                                />
                            </li>
                            
                        ))}
                        </ul>
                    </div>
            
            <div>
                <h3>Posts</h3>
                <PostsList 
                    posts={posts}
                />
            </div>
        </div>
            )

        
    }
}

export default UserPage
