import React, { Component } from 'react';
import PostContext from '../../contexts/PostContext';
import PostCard from './PostCard';
import api from '../../config';

export class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = PostContext;

    handleClickEdit = () => {
        this.setState({
            editing: true
        })
    };

    handleClickCancel = () => {
        this.props.history.push(`/posts/${this.props.match.params.post_id}`);
    }

    handleClickBack = () => {
        this.props.history.push('/dashboard')
    }

    render() {
    const { posts } = this.context;
    const { post_id } = this.props.match.params;
    const post = posts.find((post) => post.id === Number(post_id));

    if (!post) {
      return (
        <div>
          <p>Error.</p>
        </div>
      );
    }

    const handleClickDelete = (event) => {
        event.preventDefault();
        const { post_id } = this.props.match.params;

        fetch(`${api.API_ENDPOINT}/posts/${post_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${api.API_KEY}`,
            },
        })
        .then(() => {
            this.props.history.push(`/dashboard`);
            this.context.deletePost(post_id)
        })
        .catch((error) => {
            console.error({error})
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const editedPost = {
            id: post.id,
            title: event.target['post-title'].value,
            content: event.target['post-content'].value,
            date_published: post.date_published,
        };

        fetch(`${api.API_ENDPOINT}/posts/${post_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${api.API_KEY}`,
            },
            body: JSON.stringify(editedPost),
        })
        .then(() => {
            this.context.editPost(editedPost);
            this.setState({editing: false})
        })
        .catch((error) => {
            console.error({error})
        })
    };

    if (this.state.editing === false) {
        return (
            <div>
                <PostCard
                    id={post.id}
                    title={post.title}
                    content={post.content}
                />
                <button className="buttons" onClick={this.handleClickEdit}>
                    Edit
                </button>
                <button className="buttons" type="button" onClick={handleClickDelete}>
                    Delete
                </button>
                <button className="buttons" onClick={this.handleClickBack}>
                    Back
                </button>
            </div>
        )
    }

    else {
        return (
            <div>
                <h2>Edit {post.title}</h2>
                <section>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="post-title">Title</label>
                        <input 
                            type="text"
                            id='post-title'
                            name='post-title'
                            defaultValue={post.title}
                        />

                        <label htmlFor="post-content">Content</label>
                        <textarea
                            type="text"
                            id='post-content'
                            name='post-content'
                            defaultValue={post.content}
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
        )
    }


    }
}

export default PostItem
