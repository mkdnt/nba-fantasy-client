import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'
import About from '../About/About'
import Login from '../Login/Login'
import Register from '../Register/Register'
import PostItem from '../Post/PostItem'
import UserPage from '../Users/UserPage'
import UsersList from '../Users/UsersList';
import NetworkMain from '../Network/NetworkMain';
import AddPlayer from '../Player/AddPlayer';
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicRoute from '../PublicRoute/PublicRoute'

export class App extends Component {

  render(){

    return (
      <div>
            <header>
              <Header />
              <nav>
                <Nav />
              </nav>
            </header>
            <main>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PublicRoute exact path='/about' component={About} />
                <PublicRoute exact path='/login' component={Login} />
                <PublicRoute exact path='/register' component={Register} />
                <PrivateRoute exact path='/posts/:post_id' component={PostItem} />
                <PrivateRoute exact path='/users/:user_id' component={UserPage} />
                <PrivateRoute exact path='/users' component={UsersList} />
                <PrivateRoute exact path='/network' component={NetworkMain} />
                <PrivateRoute exact path='/users/:user_id/addplayer' component={AddPlayer} />
              </Switch>
            </main>
        </div> 
    );
  }
}

export default App;