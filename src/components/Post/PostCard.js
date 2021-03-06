import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../config';
import './PostCard.css';
import moment from 'moment';

export class PostCard extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
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
            date_published: new Date(),
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
            this.props.history.push('/')
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
            this.props.history.push('/')
        })
        .catch((error) => {
            console.error({error})
        })
    };

    //full 'expanded' display of the post which includes title, date, content
    //if the post is by the logged in user, determined by ternary questioning the id of the logged user from context against the user_id associated with post, buttons to edit or delete are visible
    //if the post is by non-logged in user, author name is visible instead of buttons
        if (this.state.expanded === true){
            return (
            <div className='indiv-post' value={id} >
                <h4 onClick={handleClickExpand} style={{cursor: 'pointer'}}>{title}</h4>
                <div>{this.context.user.id === user_id ? 
                <p>
                <button onClick={handleClickEdit}>Edit</button> 
                <button onClick={handleClickDelete}>Delete</button>
                </p>
                : author}
                </div>
                <p>{moment(date_published).format('MMM DD, YYYY | hh:mma')}</p>
                <p>{content}</p>
            </div>
        )
        }

        //for logged in user, edit button displays form to edit previous content(appearing as defaultValue)

        if (this.state.editing === true) {
            return (
                <div className='new-post'>
                    <h4>Edit "{title}"</h4>
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
                    <button>Submit</button>
                    <button
                        onClick={handleClickCancel}
                    >
                        Cancel
                    </button>
                    </form>
                </div>
            )
        }

        //first display shown, 'contracted' view with just title and date_published
        //author's name appears if post is by non-logged in user
        else {
            return (
            <div className='indiv-post' value={id}>
                <h4 onClick={handleClickExpand} style={{cursor: 'pointer'}}>{title}</h4>
                <p>{this.context.user.id !== user_id && author}</p>
                <p>{moment(date_published).format('MMM DD, YYYY | hh:mma')}</p>
            </div>
        )
        }
        
    }
}

export default PostCard