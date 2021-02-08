import React, { Component } from 'react';
import PostCard from './PostCard'
import PostContext from '../../contexts/PostContext';


export class PostsList extends Component {
    static defaultProps = {
        match: {
            params: {},
        },
    };

    static contextType = PostContext

    render() {

    const posts = this.context.posts

        return (
            <div>
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
            </div>
        )
    }
}

export default PostsList
