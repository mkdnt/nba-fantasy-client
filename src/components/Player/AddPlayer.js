import React, { Component } from 'react';
import api from '../../config';
import UserContext from '../../contexts/UserContext';
import PlayerResults from './PlayerResults';

export class AddPlayer extends Component {
    state = {
        playersToAdd: [],
        searchResults: false,
    };

    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = UserContext;

    render() {

        const handleSearch = (event) => {
            event.preventDefault();
            const player = event.target['player-search'].value;

            fetch(`${api.NBA_API_ENDPOINT}?per_page=100&search=${player}`, {
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
            <form onSubmit={handleSearch}>
                <label>Add a Player</label>
                <input 
                    type="text"
                    id='player-search'
                    name='player-search'
                    placeholder='First and/or Last Name...'
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
                        <PlayerResults 
                                    player={player}
                        />
                    </li>
                ))}
                </ul>
            </div>
        </div>
        )
    }    

    else {
        return (
            <div>
                <form onSubmit={handleSearch}>
                    <label>Add a Player</label>
                    <input 
                        type="text"
                        id='player-search'
                        name='player-search'
                        placeholder='First and/or Last Name...'
                    />
                    <button>Search</button>
                </form>
            </div>
        )
    }    
    }
}

export default AddPlayer
