import React from 'react';
import { Container, Button, Image } from 'semantic-ui-react';
import { RestaurantsList } from '../components/RestaurantsList.js';
import { SidebarExampleVisible } from '../components/SideBar.js'
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://10.185.0.217:3000/cable';
let api = WarpCable(API_DOMAIN);
let controllers = ['Users', 'Invites', 'Messages', 'Meals'];
const allRestaurants = [];
let filteredUserList = []
export class Home extends React.Component {
  state = {
    user: {
      lat: 0,
      long: 0
    },
    restaurantList: [],
    messages: [],
    filteredUsers: []
  };

  calculateDistance = (lat1, lat2, long1, long2) => {
    // console.log(lat1, lat2, long1, long2);
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

  fetchUserInfo = () => {
    return new Promise(resolve => {
      api.subscribe(
        'Users',
        'show',
        {
          id: localStorage.userID,
          Authorization: `BEARER ${localStorage.token}`
        },
        (userInfo) => this.setState({ user: { ...userInfo } }, resolve)
      );
    })
  };
  getLocation = () => {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(this.setLocation)
      : alert('Geolocation is not supported');
  };
  setLocation = (position) => {
    this.setState({ restaurantList: [] })
    api.trigger('Users', 'update', {
      id: localStorage.userID,
      lat: position.coords.latitude,
      long: position.coords.longitude,
      Authorization: `BEARER ${localStorage.token}`
    });
  };

  fetchNearbyRestaurants = () => {
    return api.subscribe(
      'Restaurants',
      'index',
      {
        // lat: this.state.user.lat,
        // long: this.state.user.long,
        Authorization: `BEARER ${localStorage.token}`
      },
      (restaurants) => {
        this.setState({
          restaurantList: restaurants
        });
      }
    );
  };

  fetchNearbyUsers = () => {
    api.subscribe('Users', 'index', { Authorization: `BEARER ${localStorage.token}` }, userList => {
      if (userList) {
        filteredUserList = userList.filter(
          (user) =>
            user.id != localStorage.userID &&
            this.calculateDistance(
              user.lat,
              this.state.user.lat,
              user.long,
              this.state.user.long
            ) < 5
        )
        this.setState({ filteredUsers: filteredUserList })

      } else return null

    })
  };

  // api.trigger('Users', 'update', {id: 1, email: "test3", password:"123", first_name:"Jordan!", last_name:"Laird", Authorization: `BEARER ${localStorage.token}`}, console.log)
  async componentDidMount() {
    await this.fetchUserInfo();

    // controllers.forEach((controller) =>
    //   api.subscribe(
    //     controller,
    //     'index',
    //     {
    //       Authorization: `BEARER ${localStorage.token}`,
    //       userID: localStorage.userID
    //     },
    //     (users) => {
    //       // console.log(`Mounting `, users);
    //       this.fetchNearbyRestaurants();
    //       if (controller === 'Users') {
    //         this.fetchNearbyUsers(users);
    //       }
    //     }
    //   )
    // );
    this.fetchNearbyUsers();
    this.fetchNearbyRestaurants();
  }
  render() {
    if (this.state.user) {
      // console.log('RENDERED', filteredUserList);
      return (
        <div style={{ marginLeft: 20, marginRight: 20, marginTop: 100 }}>
          <Container>
            <Image>{this.state.user.avatar}</Image>
            <h1 style={{ color: "#0080D6", textAlign: "center" }}>
              Welcome {this.state.user.first_name}!
            </h1>
            {/* <SidebarExampleVisible /> */}
            <Button color="blue" fluid size='large' onClick={() => this.getLocation()}>
              Find Restaurants Near Me
            </Button>
            <RestaurantsList
              filteredUsers={this.state.filteredUsers}
              user={this.state.user}
              restaurantList={this.state.restaurantList}
            />
          </Container>
        </div>
      );
    } else {
      return null;
    }
  }
}
