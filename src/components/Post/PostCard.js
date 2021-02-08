import React, { Component } from 'react'
import PostContext from '../../contexts/PostContext'

export class PostCard extends Component {
    render() {
    const { title, content, date_published } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <p>{date_published}</p>
                <p>{content}</p>
            </div>
        )
    }
}

export default PostCard