import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import PostsList from '../Post/PostsList';
import PlayersList from '../Player/PlayersList';

export class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPosts: [],
            playersToAdd: [],
            userPlayers: [],
        }
    }

    static defaultProps = {
        match: {
            params: {}
        },
    };

    static contextType = UserContext;

    
    componentDidMount() {
        const user_id = this.context.user.id

        //logged in user is this.context.user
        //fetch the posts and players for the logged in user

        Promise.all([
        fetch(`${api.API_ENDPOINT}/posts/byuser/${user_id}`),
        fetch(`${api.API_ENDPOINT}/players/byuser/${user_id}`),
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

        //send posts and players from state to their respective components for display
        //also sending props.history for moving between pages on child components after submissions, deletion, etc.
        
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
                            loggedIn={user}
                        />
                    </div>
                
            
            <div>
                <h3>Posts</h3>
                <PostsList 
                    posts={posts}
                    loggedIn={user}
                    history={this.props.history}
                />
            </div>
        </div>
            )

        
    }
}

export default MyTeam
