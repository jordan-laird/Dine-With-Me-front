import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Icon } from 'semantic-ui-react';
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
class _NavBar extends React.Component {
  state = {};

  async componentDidMount() {
    let unreadMessages = [];
    api.subscribe(
      'Messages',
      'create',
      {
        id: localStorage.userID,
        Authorization: `BEARER ${localStorage.token}`
      },
      (messages) => unreadMessages.push(messages),
      console.log(`unreadMessages`, unreadMessages),
      await this.setState({ unreadMessages })
    );
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
                {this.state.unreadMessages
                  ? `Messages ( ${this.state.unreadMessages.length} )`
                  : null}
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
