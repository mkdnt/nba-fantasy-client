import React, { Component } from 'react';
import PostContext from '../../contexts/PostContext';
import { Link } from "react-router-dom";

export class PostCard extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = PostContext
    render() {
    const { id, title, content, date_published } = this.props;

        return (
            <div>
                <Link 
                    to={`/posts/${id}`}
                    style={{ textDecoration: "none", color: "inherit" }}>
                        <h2>{title}</h2>
                    </Link>
                <p>{date_published}</p>
                <p>{content}</p>
            </div>
        )
    }
}

export default PostCard