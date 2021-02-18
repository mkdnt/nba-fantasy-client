import React, { Component } from 'react';
import PostCard from './PostCard'
import UserContext from '../../contexts/UserContext';
import api from '../../config';


export class PostsList extends Component {
    
    static defaultProps = {
        match: {
            params: {},
        },
    };

    static contextType = UserContext

    render() {
        const posts = this.props.posts
        const users = this.props.users
        
        return (
            <div>
                <ul
                style={{
                listStyleType: "none",
                textDecoration: "none",
                color: "inherit",
                paddingLeft: "0",
                }}
                >
                {posts.map((post) => (
                    <li key={post.id} style={{ textDecoration: "none" }}>
                        <PostCard 
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            date_published={post.date_published}
                        />
                    </li>
                ))}
                </ul>
            </div>
        )

    }
}

export default PostsList
