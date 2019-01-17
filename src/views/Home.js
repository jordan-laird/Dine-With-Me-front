import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import WarpCable from 'warp-cable-client';
import { RestaurantsList } from '../components/RestaurantsList.js';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
let controllers = ['Users', 'Invites', 'Messages', 'Meals'];

const allRestaurants = [];
export class Home extends React.Component {
  state = {
    user: {
      lat: 0,
      long: 0
    },
    restaurantList: []
  };

  calculateDistance = (lat1, lat2, long1, long2) => {
    console.log(lat1, lat2, long1, long2);
    let radLat1 = (Math.PI * lat1) / 180;
    let radLat2 = (Math.PI * lat2) / 180;
    let theta = long1 - long2;
    let radTheta = (Math.PI * theta) / 180;
    let distance =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (distance > 1) {
      distance = 1;
    }
    let dist = Math.acos(distance);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = Number(dist.toFixed(2));
    return dist;
  };

  // setRestDist = (restaurantList) => {
  //   restaurantList.map(
  //     (restaurant) =>
  //       (restaurant.distance = this.calculateDistance(
  //         this.state.user.lat,
  //         restaurant.geometry.location.lat,
  //         this.state.user.long,
  //         restaurant.geometry.location.lng
  //       ))
  //   );
  //   this.setState({
  //     restaurantList: restaurantList
  //   });
  // };

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
    // allRestaurants = [];
    return api.subscribe(
      'Restaurants',
      'create',
      {
        lat: this.state.user.lat,
        long: this.state.user.long,
        Authorization: `BEARER ${localStorage.token}`
      },
      (restaurants) => {
        // restaurants.results.map((r) => {
        //   allRestaurants.push(r);
        // // });
        // allRestaurants = Array.from(restaurants.results);
        // console.log('fetchNearbyRestaurants', allRestaurants.length);

        this.setState({
          restaurantList: restaurants
        });
      }
    );
  };

  // api.trigger('Users', 'update', {id: 1, email: "test3", password:"123", first_name:"Jordan!", last_name:"Laird", Authorization: `BEARER ${localStorage.token}`}, console.log)

  componentDidMount() {
    this.fetchUserInfo();

    controllers.forEach((controller) =>
      api.subscribe(
        controller,
        'index',
        { Authorization: `BEARER ${localStorage.token}` },
        (users) => {
          console.log('Received:', users);
          this.fetchNearbyRestaurants();
        }
      )
    );
  }
  render() {
    console.log(allRestaurants);

    if (this.state.user) {
      console.log(this.state.user);
      return (
        <Container>
          {this.state.user.first_name}
          <br />
          {this.state.user.lat}
          <br />
          {this.state.user.long}
          <br />
          <Button color="teal" onClick={() => this.getLocation()}>
            Set Location
          </Button>
          <RestaurantsList
            user={this.state.user}
            restaurantList={this.state.restaurantList}
          />
        </Container>
      );
    } else {
      return null;
    }
  }
}
