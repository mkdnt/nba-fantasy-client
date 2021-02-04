import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../Home/Home'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'
import About from '../About/About'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Post from '../Post/Post'

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
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/about' component={About} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/post' component={Post} />
            </Switch>
          </main>
      </div>
    );
  }
}

export default App;