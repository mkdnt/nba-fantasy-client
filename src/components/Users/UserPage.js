import React, { Component } from 'react'
import PostContext from '../../contexts/PostContext';
import api from '../../config';
import PostsList from '../Post/PostsList'
import PlayerCard from '../Player/PlayerCard'

export class UserPage extends Component {
    state = {
        user: {},
        posts: [],
        playersToAdd: [],
        searchResults: false,
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

    render() {
        const user = this.state.user
        const posts = this.state.posts

        const handleSearch = (event) => {
            event.preventDefault();
            const player = event.target['player-search'].value;
            console.log('in player search', user.id)

            fetch(`${api.NBA_API_ENDPOINT}${player}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then((res) => {
                if (!res.ok) {
                throw new Error("Error getting player results, please try again.");
                }
                return res;
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    searchResults: true,
                    playersToAdd: data,
                });
            })
            .catch((error) => {
                console.error({error})
            })
        };

if (this.state.searchResults === true) {
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
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    id='player-search'
                    name='player-search'
                />
                <button>Search</button>
            </form>
            <div className='search-results'>
                <ul
                style={{
                listStyleType: "none",
                textDecoration: "none",
                color: "inherit",
                paddingLeft: "0",
                }}
                >
                {this.state.playersToAdd.data.map((player) => (
                    <li key={player.id} style={{ textDecoration: "none" }}>
                        <PlayerCard
                            player={player}
                            user_id={user.id}
                        />
                    </li>
                ))}
                </ul>
            </div>
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

else {
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
                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        id='player-search'
                        name='player-search'
                    />
                    <button>Search</button>
                </form>
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
}

export default UserPage
