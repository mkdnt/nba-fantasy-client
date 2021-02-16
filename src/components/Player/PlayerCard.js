import React, { Component } from 'react';
import PostContext from '../../contexts/PostContext';
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

    static contextType = PostContext

    state = {
        expanded: false,
    }

    render() {
        const player = this.props.player
        const user_id = this.props.user_id

        const handleClickDelete = (event) => {
        event.preventDefault();

        fetch(`${api.API_ENDPOINT}/players/${player.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${api.API_KEY}`,
            },
        })
        .then(() => {
            this.props.history.push(`/dashboard`);
            this.context.deletePlayer(player.id)
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
            <div className='player-card' value={player.id} onClick={handleClickExpand} >
                <p id='player-name'>{player.first_name} {player.last_name}</p>
                <p id='player-team'>{player.team}</p>
                <p id='player-position'>Position: {player.position}</p>
                <button onClick={handleClickDelete}>Delete</button>
            </div>
        )
        }

        else {
            return (
            <div className='player-card' value={player.id} onClick={handleClickExpand} >
                <p id='player-name'>{player.first_name} {player.last_name}</p>
            </div>
        )
        }
    }
}

export default PlayerCard
