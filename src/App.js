import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WarpCable from 'warp-cable-client'
import { Login } from './views/Login.js'
import { Home } from './views/Home.js'
import { Signup } from './views/Signup.js'
const API_DOMAIN = 'ws://localhost:3000/cable'
let api = WarpCable(API_DOMAIN)
window.api = api

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Signup} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;