import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import api from '../config'

const UserContext = React.createContext({
    user: {},
    posts: [],
    users: [],
    players: [],
    error: null,
    addPost: () => {},
    editPost: () => {},
    deletePost: () => {},
    addPlayer: () => {},
    deletePlayer: () => {},
    setUser: () => {},
    processLogin: () => {},
    processLogout: () => {},
    handleLoginSuccess: () => {},
    handleRegistrationSuccess: () => {},
    setPosts: () => {},
    setPlayers: () => {},
    setUsers: () => {},
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
        error: null,
        addPost: this.handleAddPost,
        editPost: this.handleEditPost,
        deletePost: this.handleDeletePost,
        addPlayer: this.handleAddPlayer,
        deletePlayer: this.handleDeletePlayer,
    };

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
        team_name: jwtPayload.team_name,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
    }

    this.setPosts();
    this.setPlayers();
    this.setUsers();
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  } 

  clearError = () => {
    this.setState({ error: null })
  }


  setUser = user => {
    this.setState({ user })
  }

  setPosts() {
    fetch(`${api.API_ENDPOINT}/posts`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          posts: data,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  setPlayers(){
    fetch(`${api.API_ENDPOINT}/players`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          players: data,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  setUsers(){
    fetch(`${api.API_ENDPOINT}/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          users: data,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  

  handleDeletePost = (post_id) => {
    const newPosts = this.state.posts.filter((post) => post.id !== post_id);
    this.setState({
      posts: newPosts,
    })
  };

  handleDeletePlayer = (player_id) => {
    const newPlayers = this.state.players.filter((player) => player.user_id !== player_id);
    this.setState({
      players: newPlayers,
    })
  };

  handleEditPost = (editedPost) => {
    this.setState({
      posts: this.state.posts.map((post) => 
        post.id !== editedPost.id ? post : editedPost
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
		const destination = "/myteam";
		history.push(destination);
	};

  handleRegistrationSuccess = (history) => {
    const destination = '/login'
    history.push(destination)
  }

  render() {
    const value = {
      user: this.state.user,
      users: this.state.users,
      posts: this.state.posts,
      players: this.state.players,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      addPost: this.handleAddPost,
      deletePost: this.handleDeletePost,
      editPost: this.handleEditPost,
      addPlayer: this.handleAddPlayer,
      deletePlayer: this.handleDeletePlayer,
      handleLoginSuccess: this.handleLoginSuccess,
      handleRegistrationSuccess: this.handleRegistrationSuccess,
      setPosts: this.setPosts,
      setPlayers: this.setPlayers,
      setUsers: this.setUsers,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}