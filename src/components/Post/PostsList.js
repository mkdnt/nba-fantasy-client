import React, { Component } from 'react';
import PostCard from './PostCard'
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import moment from 'moment'
import './PostCard.css'

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

    static contextType = UserContext

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
    const posts = this.props.posts
    const loggedIn = this.props.loggedIn
    const sortedPosts = posts.sort((a, b) => moment(b.date_published).valueOf() - moment(a.date_published).valueOf())

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            title: event.target['post-title'].value,
            content: event.target['post-content'].value,
            date_published: new Date(),
            user_id: this.context.user.id,
            author: this.context.user.username
        };

        fetch(`${api.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newPost)
        })
        .then((res) => {
            if (!res.ok) return res.json().then((e) => Promise.reject(e));
            return res.json();
        })
        .then((post) => {
            this.context.addPost(post);
            this.props.history.push('/')
        })
        .catch((error) => {
            console.error({error})
        });
    };

        if (this.state.adding === false) {
            return (
            <div>
                {loggedIn && <button className="buttons" style={{marginLeft: '0.3em'}} onClick={this.handleClickAdd}>New Post</button>}
            <section>
                <ul
                style={{
                listStyleType: "none",
                textDecoration: "none",
                color: "inherit",
                paddingLeft: "0",
                }}
                >
                {sortedPosts.map((post) => (
                    <li key={post.id} style={{ textDecoration: "none" }}>
                        <PostCard 
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            date_published={post.date_published}
                            user_id={post.user_id}
                            author={post.author}
                            history={this.props.history}
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
                <div className='new-post'>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            id='post-title'
                            name='post-title'
                            placeholder='Title'
                        />
                        <textarea
                            type="text"
                            id='post-content'
                            name='post-content'
                            placeholder="What's up with your team?"
                        ></textarea> 
                        <br />
                    <button className="buttons">Submit</button>
                    <button
                        onClick={this.handleClickCancel}
                    >
                        Cancel
                    </button>
                    </form>
                </div>
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
                {sortedPosts.map((post) => (
                    <li key={post.id} style={{ textDecoration: "none" }}>
                        <PostCard 
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            date_published={post.date_published}
                            user_id={post.user_id}
                            author={post.author}
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
