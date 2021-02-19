import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';

export class PlayerCard extends Component {
    static defaultProps = {
        match: {
            params: {},
        },
        history: {
        push: () => {},
        }
    };

    static contextType = UserContext

    state = {
        expanded: false,
    }

    render() {
        const player = this.props.player
        const user_id = this.props.user_id

        const handleClickDelete = (event) => {
        event.preventDefault();
        const player_id = player.id
        console.log('in handleClickDelete', player_id, player.first_name)

        fetch(`${api.API_ENDPOINT}/players/${player_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                
            },
        })
        .then(() => {
            this.context.deletePlayer(player_id);
            this.props.history.push(`/users/${user_id}`);

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

        if (this.state.expanded === true) {
            return (
            <div className='player-card' value={player.id} >
                <p id='player-name' onClick={handleClickExpand} style={{cursor: 'pointer'}}>
                    {player.first_name} {player.last_name}</p>
                <p id='player-team'>{player.team}</p>
                <p id='player-position'>Position: {player.position}</p>
                <button onClick={handleClickDelete}>Delete</button>
            </div>
        )
        }

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
