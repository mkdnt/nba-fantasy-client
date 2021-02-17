import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const UserContext = React.createContext({
    user: {},
    posts: [],
    users: [],
    players: [],
    searchResults: false,
    addPost: () => {},
    editPost: () => {},
    deletePost: () => {},
    addPlayer: () => {},
    deletePlayer: () => {},
    setUser: () => {},
    processLogin: () => {},
    processLogout: () => {},
    handleLoginSuccess: () => {},
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
        user: {},
        posts: [],
        users: [],
        players: [],
        searchResults: false, 
    };

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
        team_name: jwtPayload.sub,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }


  setUser = user => {
    this.setState({ user })
  }

  handleDeletePost = (post_id) => {
    const newPosts = this.state.posts.filter((post) => post.id != post_id);
    this.setState({
      posts: newPosts,
    })
  };

  handleDeletePlayer = (player_id) => {
    const newPlayers = this.state.players.filter((player) => player.user_id != player_id);
    this.setState({
      players: newPlayers,
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
      players: [...this.state.players, newPlayer],
    });
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
      team_name: jwtPayload.team_name,
    })
    IdleService.registerIdleTimerResets()
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    IdleService.unRegisterIdleResets()
    this.setUser({ idle: true })
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
      })
      .catch(err => {
        this.setError(err)
      })
  }

  handleLoginSuccess = (history) => {
		const destination = "/";
		history.push(destination);
	};

  render() {
    const value = {
      user: this.state.user,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      addPost: this.handleAddPost,
      deletePost: this.handleDeletePost,
      editPost: this.handleEditPost,
      addPlayer: this.handleAddPlayer,
      deletePlayer: this.handleDeletePlayer,
      handleLoginSuccess: this.handleLoginSuccess,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}