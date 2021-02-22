import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import PostsList from '../Post/PostsList';
import PlayersList from '../Player/PlayersList';

export class MyTeam extends Component {
    constructor(props) {
        super(props);
        // this.modalOpen = this.modalOpen.bind(this);
        // this.modalClose = this.modalClose.bind(this);
        this.state = {
            userPosts: [],
            playersToAdd: [],
            userPlayers: [],
            show: false,
        }
    }

    static defaultProps = {
        match: {
            params: {}
        },
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
        
        

        

    return (
            <div>
                <div>
                    <h2>{user.team_name}</h2>
                    <p>{user.username}</p>
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
                    loggedIn={user}
                    history={this.props.history}
                />
            </div>
        </div>
            )

        
    }
}

export default MyTeam
