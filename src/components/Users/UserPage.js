import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PostContext from '../../contexts/PostContext';
import api from '../../config';
import PostsList from '../Post/PostsList'
import PlayerCard from '../Player/PlayerCard'
import './UserPage.css';

export class UserPage extends Component {
    state = {
        user: {},
        posts: [],
        playersToAdd: [],
        searchResults: this.context.searchResults,
        usersPlayers: [],
    };

    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = PostContext;

    //what are you mounting, etc.
    //call functions for fetching inside of CDM
    // fetchUsers(), fetchPosts()
    //try and catch
    componentDidMount() {
        const { user_id } = this.props.match.params;
        const filteredPlayers = this.context.players.filter(player => player.user_id === Number(user_id))
        // filter of nba id in one statement instead of two
        
        const idArray = filteredPlayers.map(item => item.nba_id)

        //test for an empty user
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

        Promise.all(idArray.map(id => 
                fetch(`${api.NBA_API_ENDPOINT}/${id}`)
                .then((res) => {
                    if (!res.ok) {
                    throw new Error("Something went wrong, please try again.");
                    }
                    return res;
                })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                    usersPlayers: [...this.state.usersPlayers, data],
                    });
                })
                .catch((error) => {
                    console.error({ error });
                })
                ))
        
    }

    


    render() {
        const user = this.state.user
        const posts = this.state.posts
        
        const handleGoToAddPlayer = () => {
        this.props.history.push(`/users/${user.id}/addplayer`)
    }
        

    return (
            <div>
                <div>
                    <h2>{user.teamname}</h2>
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
                        {this.state.usersPlayers.map((player) => (
                            <li key={player.id} style={{ textDecoration: "none" }}>
                                {player.first_name} {player.last_name}
                            </li>
                            
                        ))}
                            <li className='add-player-button' onClick={handleGoToAddPlayer}>
                                Add Player
                                
                            </li>
                        </ul>
                    </div>
            
            <div>
                <PostsList 
                    posts={posts}
                    user={user}
                />
            </div>
        </div>
            )

        
    }
}

export default UserPage
