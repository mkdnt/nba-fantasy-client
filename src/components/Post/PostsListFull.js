import React, { Component } from 'react';
import PostCard from './PostCard'
import PostContext from '../../contexts/PostContext';
import api from '../../config';


export class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false
        }
    };
    
    static defaultProps = {
        match: {
            params: {},
        },
    };

    static contextType = PostContext

    handleClickAdd = () => {
        this.setState({
            adding: true
        })
    };

    handleClickCancel = () => {
        this.setState({
            adding: false
        })
    }

    render() {

    const posts = this.context.posts

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            title: event.target['post-title'].value,
            content: event.target['post-content'].value,
            date_published: new Date(),
        };

        fetch(`${api.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${api.API_KEY}`,
            },
            body: JSON.stringify(newPost)
        })
        .then((res) => {
            if (!res.ok) return res.json().then((e) => Promise.reject(e));
            return res.json();
        })
        .then((post) => {
            this.context.addPost(post);
            this.props.history.push(`/posts/${post.id}`);
        })
        .catch((error) => {
            console.error({error})
        });
    };

        if (this.state.adding === false) {
            return (
            <div>
                <button className="buttons" onClick={this.handleClickAdd}>
                    New Post
                </button>
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
            </div>
        )
        }

    else {
        return (
            <div>
            <div>
                <h2>New Post</h2>
                <section>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="post-title">Title</label>
                        <input 
                            type="text"
                            id='post-title'
                            name='post-title'
                        />

                        <label htmlFor="post-content">Content</label>
                        <textarea
                            type="text"
                            id='post-content'
                            name='post-content'
                        ></textarea> 
                        <br />
                    <button className="buttons">Submit</button>
                    <button
                        className="buttons"
                        onClick={this.handleClickCancel}
                        className="buttons"
                    >
                        Cancel
                    </button>
                    </form>
                </section>
            </div>
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
            </div>
        )
    }
    }
}

export default PostsList
