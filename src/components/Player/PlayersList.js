import React, { Component } from 'react'
import PlayerCard from './PlayerCard'
import api from '../../config';
import UserContext from '../../contexts/UserContext';
import PlayerResults from './PlayerResults';

export class PlayersList extends Component {
    state = {
        playersToAdd: [],
        searchResults: false,
        searching: false,
    };

    static defaultProps = {
        match: {
            params: {}
        },
    };

    static contextType = UserContext;

    render() {
        
        const handleAddPlayer = () => {
            this.setState({
                searching: true,
            })
        }

        const players = this.props.players

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

        const handleClickCancel = () => {
            this.setState({
                searchResults: false,
                searching: false
            })
        }

        const handleClearResults = () => {
            this.setState({
                searchResults: false,
            })
        }

        return (
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
                            history={this.props.history}
                        />
                    </li>
                    
                ))}
                    <li className='add-player-button' 
                    style={{ textDecoration: "none", paddingTop: '1.3em', cursor: 'pointer' }}
                    onClick={handleAddPlayer}>
                        Add Player
                    </li>
                </ul>
                {this.state.searching &&
                    <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        id='player-search'
                        name='player-search'
                        placeholder='Player Name...'
                    />
                    <button>Search</button>
                    <button onClick={handleClickCancel}>Cancel</button>
                </form>}
                {this.state.searchResults && 
                    <div className='search-results'>
                    <button onClick={handleClearResults}>Clear Results</button>
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
                                        history={this.props.history}
                            />
                        </li>
                    ))}
                    </ul>
                    </div>}
            </div>
        )
    }
}

export default PlayersList
