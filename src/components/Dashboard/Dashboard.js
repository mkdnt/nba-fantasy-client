import React, { Component } from 'react'
import PostsList from '../Post/PostsList'

export class Dashboard extends Component {

    handleAddNewPlayer = () => {
        this.props.history.push('/player')
    }

    render() {
        return (
            <div>
        <div>
            <h2>Team Name</h2>
            <p>Your Username</p>
            <p>Maybe let them have some message or status or whatever here.</p>
        </div>
        <div>
            <ul>
                <li>Player</li>
            </ul>
            <button onClick={this.handleAddNewPlayer}>Add Player</button>
        </div>
        <div>
            <PostsList />
        </div>
    </div>
        )
    }
}

export default Dashboard
