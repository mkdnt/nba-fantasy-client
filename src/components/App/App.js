import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import MyTeam from '../MyTeam/MyTeam'
import About from '../About/About'
import Login from '../Login/Login'
import Register from '../Register/Register'
import UserPage from '../Users/UserPage'
import UsersList from '../Users/UsersList';
import Network from '../Network/Network';
import AddPlayer from '../Player/AddPlayer';
import Landing from '../Landing/Landing'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicRoute from '../PublicRoute/PublicRoute'
import './App.css'
import UserContext from '../../contexts/UserContext';

export class App extends Component {

  static contextType = UserContext;

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
                <PrivateRoute exact path='/myteam' component={MyTeam} />
                <PublicRoute exact path='/about' component={About} />
                <PublicRoute exact path='/login' component={Login} />
                <PublicRoute exact path='/' component={Landing} />
                <PublicRoute exact path='/register' component={Register} />
                <PrivateRoute exact path='/users/:user_id' component={UserPage} />
                <PrivateRoute exact path='/users' component={UsersList} />
                <PrivateRoute exact path='/network' component={Network} />
                <PrivateRoute exact path='/addplayer' component={AddPlayer} />
              </Switch>
            </main>
        </div> 
    );
  }
}

export default App;