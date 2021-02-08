import React, { Component } from 'react'
import PostContext from '../../contexts/PostContext'

export class AddPost extends Component {

    static contextType = PostContext;

    

    render() {
        return (
            <div>
                <h2>New Post</h2>
                
            </div>
        )
    }
}

export default AddPost
