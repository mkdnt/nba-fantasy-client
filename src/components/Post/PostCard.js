import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import './PostCard.css';

export class PostCard extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
        push: () => {},
        }
    };

    state = {
        expanded: false,
        editing: false,
    }

    static contextType = UserContext;
    
    render() {
    const { id, title, content, date_published, author, user_id} = this.props;

    const handleClickExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    const handleClickEdit = () => {
        console.log('in handleClickEdit')
        this.setState({
            editing: true,
            expanded: false,
        })
    }

    const handleClickCancel = () => {
        this.setState({
            editing: false,
        })
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const editedPost = {
            id: id,
            title: event.target['post-title'].value,
            content: event.target['post-content'].value,
            date_published: date_published,
            user_id: this.context.user.id,
            author: this.context.user.username,
        };

        fetch(`${api.API_ENDPOINT}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(editedPost),
        })
        .then(() => {
            this.context.editPost(editedPost);
            
        })
        .catch((error) => {
            console.error({error})
        })
    };

    const handleClickDelete = (event) => {
        event.preventDefault();
        const post_id = id

        fetch(`${api.API_ENDPOINT}/posts/${post_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(() => {
            this.context.deletePost(post_id)
            this.props.history.push(`/myteam`);
        })
        .catch((error) => {
            console.error({error})
        })
    };

        if (this.state.expanded === true){
            return (
            <div className='indiv-post' value={id} >
                <h2 onClick={handleClickExpand} style={{cursor: 'pointer'}}>{title}</h2>
                <div>{this.context.user.id === user_id ? 
                <p>
                <button onClick={handleClickEdit}>Edit</button> 
                <button onClick={handleClickDelete}>Delete</button>
                </p>
                : author}
                </div>
                <p>{date_published}</p>
                <p>{content}</p>
            </div>
        )
        }

        if (this.state.editing === true) {
            return (
                <div className='indiv-post'>
                    <h2>Edit "{title}"</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            id='post-title'
                            name='post-title'
                            defaultValue={title}
                        />
                        <textarea
                            type="text"
                            id='post-content'
                            name='post-content'
                            defaultValue={content}
                        ></textarea> 
                        <br />
                    <button className="buttons">Submit</button>
                    <button
                        onClick={handleClickCancel}
                    >
                        Cancel
                    </button>
                    </form>
                </div>
            )
        }

        else {
            return (
            <div className='indiv-post' value={id}>
                <h2 onClick={handleClickExpand} style={{cursor: 'pointer'}}>{title}</h2>
                <p>{this.context.user.id !== user_id && author}</p>
                <p>{date_published}</p>
            </div>
        )
        }
        
    }
}

export default PostCard