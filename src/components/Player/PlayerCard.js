import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';

export class PlayerCard extends Component {
    static defaultProps = {
        match: {
            params: {},
        },
    };

    static contextType = UserContext

    state = {
        expanded: false,
    }

    render() {
        const player = this.props.player

        const handleClickDelete = (event) => {
        event.preventDefault();
        const player_id = player.id

        fetch(`${api.API_ENDPOINT}/players/${player_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                
            },
        })
        .then(() => {
            this.context.deletePlayer(player_id);
            this.props.history.push(`/`);

        })
        .catch((error) => {
            console.error({error})
        })
    };

        
        const handleClickExpand = () => {
        this.setState({
            expanded: !this.state.expanded
            })
        }

        //click on player's name to change this.state.expanded to true and display full info: name, team, position
        //if the player is the logged in user's player (matching this.context.user.id with the user_id attached player), delete button is visible
        if (this.state.expanded === true) {
            return (
            <div className='player-card' value={player.id} >
                <p id='player-name' onClick={handleClickExpand} style={{cursor: 'pointer'}}>
                    {player.first_name} {player.last_name}</p>
                <p id='player-team'>{player.team}</p>
                <p id='player-position'>Position: {player.position}</p>
                {this.context.user.id === player.user_id && <button onClick={handleClickDelete}>Delete</button>}
            </div>
        )
        }

        //basic initial view of player, just name, when clicked turns this.state.expanded to true and other details are visible as above
        else {
            return (
            <div className='player-card' value={player.id}>
                <p id='player-name' onClick={handleClickExpand} style={{cursor: 'pointer'}}>{player.first_name} {player.last_name}</p>
            </div>
        )
        }
    }
}

export default PlayerCard
