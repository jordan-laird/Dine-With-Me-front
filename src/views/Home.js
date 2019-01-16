import React from 'react';
import { Container } from 'semantic-ui-react';
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://locahost:3000/cable';
let api = WarpCable(API_DOMAIN);
let controllers = ['Users', 'Invites', 'Messages', 'Meals'];

export class Home extends React.Component {
  state = {
    user: null
  };

  fetchUserInfo = () => {
    fetch(`http://localhost:3000/users/${localStorage.userID}`)
      .then((res) => res.json())
      .then((userInfo) => this.setState({ user: { ...userInfo } }));
  };

  // api.trigger('Users', 'update', {id: 1, email: "test3", password:"123", first_name:"Jordan!", last_name:"Laird", Authorization: `BEARER ${localStorage.token}`}, console.log)

  componentDidMount() {
    this.fetchUserInfo();
  }

  // setSubscribe = (controllerArray) => {
  //   controllerArray.forEach((controller) =>
  //     api.subscribe(
  //       controller,
  //       'index',
  //       { Authorization: `BEARER ${localStorage.token}` },
  //       (users) => {
  //         console.log('Received:', users);
  //       }
  //     )
  //   );
  // };
  render() {
    // this.setSubscribe(controllers);
    if (this.state.user) {
      return <Container>{this.state.user.first_name}</Container>;
    } else {
      return null;
    }
  }
}
