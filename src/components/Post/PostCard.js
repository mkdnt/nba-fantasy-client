import React, { Component } from 'react';
import PostContext from '../../contexts/PostContext';
import './PostCard.css';

export class PostCard extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };

    state = {
        expanded: false,
    }

    static contextType = PostContext
    render() {
    const { id, title, content, date_published, username } = this.props;

    const handleClickExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

        if (this.state.expanded === true){
            return (
            <div className='indiv-post' onClick={handleClickExpand}>
                <h2>{title}</h2>
                <p>by</p>
                <p>{date_published}</p>
                <p>{content}</p>
            </div>
        )
        }

        else {
            return (
            <div className='indiv-post' onClick={handleClickExpand}>
                <h2>{title}</h2>
                <p>by</p>
                <p>{date_published}</p>
            </div>
        )
        }
        
    }
}

export default PostCard