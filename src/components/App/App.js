import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import api from '../../config'
import Home from '../Home/Home'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'
import About from '../About/About'
import Login from '../Login/Login'
import Register from '../Register/Register'
import AddPost from '../Post/AddPost'
import PostItem from '../Post/PostItem'
import PostContext from '../../contexts/PostContext'

export class App extends Component {
  state = {
    posts: [],
    addPost: this.handleAddPost,
    editPost: this.handleEditPost,
    deleteRoute: this.handleDeletePost,
  };

  componentDidMount() {
    fetch(`${api.API_ENDPOINT}/posts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${api.API_KEY}`,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again.');
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        posts: data,
      })
    })
    .catch((error) => {
      console.error({error})
    })
  };

  handleDeletePost = (post_id) => {
    const newPosts = this.state.posts.filter((post) => post.id != post_id);
    this.setState({
      posts: newPosts,
    })
  };

  handleEditPost = (editedPost) => {
    this.setState({
      posts: this.state.posts.map((post) => 
        post.id != editedPost.id ? post : editedPost
      ),
    });
  };

  handleAddPost = (newPost) => {
    this.setState({
      posts: [...this.state.posts, newPost],
    });
  };

  render(){
    const value = {
      posts: this.state.posts,
      addPost: this.handleAddPost,
      deletePost: this.handleDeletePost,
      editPost: this.handleEditPost,
    };

    return (
    <PostContext.Provider value={value}>
      <div>
            <header>
              <Header />
              <nav>
                <Nav />
              </nav>
            </header>
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/about' component={About} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/addpost' component={AddPost} />
                <Route exact path='/posts/:post_id' component={PostItem} />
              </Switch>
            </main>
        </div>
    </PostContext.Provider>    
    );
  }
}

export default App;