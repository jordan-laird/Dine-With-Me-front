import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import WarpCable from 'warp-cable-client';
import { RestaurantsList } from '../components/RestaurantsList.js';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
let controllers = ['Users', 'Invites', 'Messages', 'Meals'];

export class Home extends React.Component {
  state = {
    user: null,
    restaurantList: []
  };

  fetchUserInfo = () => {
    api.subscribe(
      'Users',
      'show',
      {
        id: localStorage.userID,
        Authorization: `BEARER ${localStorage.token}`
      },
      (userInfo) => this.setState({ user: { ...userInfo } })
    );
  };
  getLocation = () => {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(this.setLocation)
      : alert('Geolocation is not supported');
  };
  setLocation = (position) => {
    api.trigger(
      'Users',
      'update',
      {
        id: localStorage.userID,
        lat: position.coords.latitude,
        long: position.coords.longitude,
        Authorization: `BEARER ${localStorage.token}`
      },
      console.log(position.coords.latitude)
    );
  };

  fetchNearbyRestaurants = () => {
    api.subscribe(
      'Restaurants',
      'index',
      {
        Authorization: `BEARER ${localStorage.token}`
      },
      (restaurants) =>
        this.setState({ restaurantList: [...restaurants.results] })
    );
  };

  // api.trigger('Users', 'update', {id: 1, email: "test3", password:"123", first_name:"Jordan!", last_name:"Laird", Authorization: `BEARER ${localStorage.token}`}, console.log)

  componentDidMount() {
    this.fetchUserInfo();
    this.fetchNearbyRestaurants();
    controllers.forEach((controller) =>
      api.subscribe(
        controller,
        'index',
        { Authorization: `BEARER ${localStorage.token}` },
        (users) => {
          console.log('Received:', users);
        }
      )
    );
  }
  render() {
    if (this.state.user) {
      console.log(this.state.user);
      return (
        <Container>
          {this.state.user.json.first_name}
          <br />
          {this.state.user.json.lat}
          <br />
          {this.state.user.long}
          <br />
          <Button color="teal" onClick={() => this.getLocation()}>
            Set Location
          </Button>
          <RestaurantsList restaurantList={this.state.restaurantList} />
        </Container>
      );
    } else {
      return null;
    }
  }
}
