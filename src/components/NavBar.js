import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Icon } from 'semantic-ui-react';
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
let unreadMessages = [];
class _NavBar extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    api.subscribe(
      'Messages',
      'index',
      {
        id: localStorage.userID,
        Authorization: `BEARER ${localStorage.token}`
      },
      (messages) => this.setState({ messages })
    );
  }

  filterMessages = () => {
    if (this.state.messages ? unreadMessages = this.state.messages.filter(message => message.receiver_id == localStorage.userID && message.unread === true) : null)
      return unreadMessages.length
  }

  render() {
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header>
              {/* <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: "1.5em" }}
              /> */}
              <Icon name="food" size="big" /> Dine With Me
            </Menu.Item>
            {/* <Menu.Item as="a">Home </Menu.Item> */}
            {localStorage.getItem('token') ? (
              <Menu.Item as="a" onClick={() => this.goTo(`/home`)}>
                Home
              </Menu.Item>
            ) : null}
            {localStorage.getItem('token') ? (
              <Menu.Item as="a" onClick={() => this.goTo(`/messages`)}>
                {this.state.messages
                  ? `Messages ( ${this.filterMessages()} )`
                  : "NOT MOUNTING"}
              </Menu.Item>
            ) : null}
            {/* <Menu.Item as="a" onClick={() => this.goTo(`/login`)}>
              Login
            </Menu.Item>{" "} */}
            {/* <Menu.Item as="a" onClick={() => this.goTo(`/SignUp`)}>
              SignUp
            </Menu.Item>{" "} */}
            {localStorage.getItem('token') ? (
              <Menu.Item as="a" onClick={() => this.logoutUser()}>
                Logout
              </Menu.Item>
            ) : null}
          </Container>
        </Menu>
      </div>
    );
  }

  goTo = (url) => {
    this.props.history.push(url);
  };

  logoutUser = () => {
    console.log('bye');
    localStorage.clear();
    this.goTo('/');
  };
}

export const NavBar = withRouter(_NavBar);
