import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import api from '../../config';

export class PlayerResults extends Component {
    static defaultProps = {
        match: {
            params: {},
        },
    };

    static contextType = UserContext

    render() {
        const player = this.props.player
        const user_id = this.context.user.id
        //attach logged in user's id to player for button visibility on PlayerCard after player is added

        const handleClickAdd = (event) => {
            event.preventDefault();
            const newPlayer = {
                first_name: player.first_name,
                last_name: player.last_name,
                team: player.team.full_name,
                position: player.position,
                user_id: user_id,
            }

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
                this.props.history.push(`/`)
            })
            .catch((error) => {
                console.error({error})
            })
        }

        //display is same as expanded PlayerCard but with Add button instead of Delete button
        //didn't want to reuse PlayerCard component to keep the POST fetch here separate from the DELETE fetch on PlayerCard, also didn't want to have too many ternaries and && looking for logged in user, etc.

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
