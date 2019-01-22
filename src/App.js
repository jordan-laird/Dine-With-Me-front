import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './views/Login.js';
import { Home } from './views/Home.js';
import { NavBar } from './components/NavBar.js';
import { Inbox } from './views/Inbox.js'
import { Signup } from './views/Signup.js';
import { MyInvites } from './views/MyInvites.js'
import { MyMeals } from './views/MyMeals.js'
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/myinvites" component={MyInvites} />
            <Route path="/mymeals" component={MyMeals} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
