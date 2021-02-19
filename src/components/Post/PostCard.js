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
        this.setState({
            editing: true,
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
        console.log('editpost handlesubmit', editedPost)
        console.log(id)

        fetch(`${api.API_ENDPOINT}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${api.API_KEY}`,
            },
            body: JSON.stringify(editedPost),
        })
        .then(() => {
            console.log(editedPost)
            this.context.editPost(editedPost);
            this.setState({
                editing: false,
                expanded: false,
            })
            console.log('afterfetch in editing')
        })
        .catch((error) => {
            console.error({error})
        })
    };

        if (this.state.expanded === true){
            return (
            <div className='indiv-post' value={id} onClick={handleClickExpand}>
                <h2>{title}</h2>
                <p>{this.context.user.id === user_id ? <button onClick={handleClickEdit}>Edit</button> : author}</p>
                <p>{date_published}</p>
                <p>{content}</p>
            </div>
        )
        }

        if (this.state.editing === true) {
            return (
                <div>
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
                        className="buttons"
                        onClick={handleClickCancel}
                        className="buttons"
                    >
                        Cancel
                    </button>
                    </form>
                </div>
            )
        }

        else {
            return (
            <div className='indiv-post' value={id} onClick={handleClickExpand}>
                <h2>{title}</h2>
                <p>{this.context.user.id !== user_id && author}</p>
                <p>{date_published}</p>
            </div>
        )
        }
        
    }
}

export default PostCard