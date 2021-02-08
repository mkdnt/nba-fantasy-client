import React, { Component } from 'react'

export class Dashboard extends Component {
    handleAddNewPost = () => {
        this.props.history.push('/post')
    }

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
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
            </ul>
            <button onClick={this.handleAddNewPlayer}>Add Player</button>
        </div>
        <div>
            <h2>Posts</h2>
            <button onCLick={this.handleAddNewPost}>Add Post</button>
            <h3>Latest Post</h3>
            <h4>First Post Title</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
                pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.
                Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,
                in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
                vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.
                Integer eu nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat
                faucibus libero, at maximus nisl suscipit posuere. Morbi nec enim nunc.
                Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis.
                Cras pharetra mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
                non dictum mauris. Nulla at tellus sagittis, viverra est a, bibendum metus.</p>
            <h5><a href="/posts.html">See More Posts</a></h5>
        </div>
    </div>
        )
    }
}

export default Dashboard
