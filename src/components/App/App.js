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
import PostItem from '../Post/PostItem'
import UserPage from '../Users/UserPage'
import PostContext from '../../contexts/PostContext'
import UsersList from '../Users/UsersList';
import NetworkMain from '../Network/NetworkMain';

export class App extends Component {
  state = {
    posts: [],
    users: [],
    players: [],
    addPost: this.handleAddPost,
    editPost: this.handleEditPost,
    deleteRoute: this.handleDeletePost,
    addPlayer: this.handleAddPlayer,
  };

  componentDidMount() {
        Promise.all([
        fetch(`${api.API_ENDPOINT}/players`),
        fetch(`${api.API_ENDPOINT}/posts`),
        ])
        .then(([playersRes, postsRes]) => {
            if (!playersRes.ok) 
                return playersRes.json().then((e) => Promise.reject(e));
            if (!postsRes.ok)
                return postsRes.json().then((e) => Promise.reject(e));

            return Promise.all([playersRes.json(), postsRes.json()]);
        })
        .then(([players, posts]) => {
            this.setState({ players, posts });
        })
        .catch((error) => {
            console.error({ error });
        });
    }

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

  handleAddPlayer = (newPlayer) => {
    this.setState({
      players: [...this.state.players, newPlayer]
    });
    console.log('handleAddPlayer on app.js after adding', this.state.players)
  }

  render(){
    const value = {
      posts: this.state.posts,
      users: this.state.users,
      players: this.state.players,
      addPost: this.handleAddPost,
      deletePost: this.handleDeletePost,
      editPost: this.handleEditPost,
      addPlayer: this.handleAddPlayer,
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
                <Route exact path='/posts/:post_id' component={PostItem} />
                <Route exact path='/users/:user_id' component={UserPage} />
                <Route exact path='/users' component={UsersList} />
                <Route exact path='/network' component={NetworkMain} />
              </Switch>
            </main>
        </div>
    </PostContext.Provider>    
    );
  }
}

export default App;