import React, { Component } from 'react';
import PostContext from '../../contexts/PostContext';
import api from '../../config';

export class PlayerCard extends Component {
    static defaultProps = {
        match: {
            params: {},
        },
    };

    static contextType = PostContext

    render() {
        const player = this.props.player
        const user_id = this.props.user_id

        const handleAdd = (event) => {
            event.preventDefault();
            const newPlayer = {
                nba_id: player.id,
                user_id: user_id,
            }
            console.log('on PlayerCard', newPlayer)

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
                <button onClick={handleAdd}>Add</button>
                <hr
                style={{
                  width: "100%",
                  border: "1px solid black",
                  backgroundColor: "black",
                }}
              />
            </div>
        )
    }
}

export default PlayerCard
