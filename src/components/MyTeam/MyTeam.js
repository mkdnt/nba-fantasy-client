import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import PostsList from '../Post/PostsList'
import PlayerCard from '../Player/PlayerCard'

export class MyTeam extends Component {
    state = {
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
        const user_id = this.context.user.id
        //test for an empty user
        Promise.all([
        fetch(`${api.API_ENDPOINT}/posts/${user_id}`),
        fetch(`${api.API_ENDPOINT}/players/${user_id}`),
        ])
        .then(([userPostsRes, userPlayersRes ]) => {
            if (!userPostsRes.ok)
                return userPostsRes.json().then((e) => Promise.reject(e));
            if (!userPlayersRes.ok)
                return userPlayersRes.json().then((e) => Promise.reject(e));

            return Promise.all([userPostsRes.json(), userPlayersRes.json()]);
        })
        .then(([userPosts, userPlayers]) => {
            this.setState({ userPosts, userPlayers });          
        })
        .catch((error) => {
            console.error({ error });
        });
        
    }

    render() {
        const user = this.context.user
        const posts = this.state.userPosts
        const players = this.state.userPlayers
        
        const handleGoToAddPlayer = () => {
        this.props.history.push(`/addplayer`)
    }
        

    return (
            <div>
                <div>
                    <h2>{user.team_name}</h2>
                    <p>{user.username}</p>
                </div>
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
                                <PlayerCard 
                                    player={player}
                                />
                            </li>
                            
                        ))}
                            <li className='add-player-button' 
                            style={{ textDecoration: "none", paddingTop: '1.3em' }} 
                            onClick={handleGoToAddPlayer}>
                                Add Player
                            </li>
                        </ul>
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

export default MyTeam
