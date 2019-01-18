import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Icon } from 'semantic-ui-react';

class _NavBar extends React.Component {
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
                Messages
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
