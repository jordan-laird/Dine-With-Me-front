import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './views/Login.js';
import { Home } from './views/Home.js';
import { NavBar } from './components/NavBar.js';
import { Inbox } from './views/Inbox.js'
import { Signup } from './views/Signup.js';
import { MyInvites } from './views/MyInvites.js'
import { MyMeals } from './views/MyMeals.js'
import { LandingPage } from './views/LandingPage.js'
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'wss://dine-with-me-api.herokuapp.com/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/myinvites" component={MyInvites} />
            <Route path="/mymeals" component={MyMeals} />
            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route path="/register" component={Signup} />
            <Route exact path="/" render={() => (localStorage.userID ? (<Redirect to="/home" />) : (<Login />))} />
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
