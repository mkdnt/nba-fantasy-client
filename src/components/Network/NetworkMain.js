import React, { Component } from 'react';
import PostCard from '../Post/PostCard';

export class NetworkMain extends Component {
    render() {
        return (
            <section>
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
            </section>
        )
    }
}

export default NetworkMain
