import React, { Component } from 'react'
import PostContext from '../../contexts/PostContext'
import api from '../../config';

export class PlayerResults extends Component {
    static defaultProps = {
        match: {
            params: {},
        },
        history: {
        push: () => {},
        }
    };

    static contextType = PostContext

    render() {
        const player = this.props.player
        const user_id = this.props.user_id

        const handleClickAdd = (event) => {
            event.preventDefault();
            const newPlayer = {
                //nba_id is coming from the third party NBA API
                first_name: player.first_name,
                last_name: player.last_name,
                team: player.team.full_name,
                position: player.position,
                user_id: user_id,
            }
            console.log('adding player on PlayerResults page', newPlayer)

            fetch(`${api.API_ENDPOINT}/players`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(newPlayer)
            })
            .then((res) => {
                if (!res.ok) return res.json().then((e) => Promise.reject(e));
                return res.json();
            })
            .then((player) => {
                this.context.addPlayer(player);
                this.props.history.push(`/users/${user_id}`)
            })
            .catch((error) => {
                console.error({error})
            })
        }

        return (
            <div className='player-card' value={player.id} >
                <p id='player-name'>{player.first_name} {player.last_name}</p>
                <p id='player-team'>{player.team.full_name}</p>
                <p id='player-position'>Position: {player.position}</p>
                <button onClick={handleClickAdd}>Add</button>
            </div>
        )
    }
}

export default PlayerResults
