import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Icon } from 'semantic-ui-react';
import WarpCable from 'warp-cable-client';
import * as moment from 'moment'
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
let unreadMessages = [];
let pendingInvites = [];
let acceptedInvites = [];
class _NavBar extends React.Component {
  state = {
    messages: [],
    invites: []
  };

  componentDidMount() {
    api.subscribe(
      'Messages',
      'index',
      {
        // id: localStorage.userID,
        Authorization: `BEARER ${localStorage.token}`
      },
      (messages) => this.setState({ messages })
    );
    api.subscribe(
      'Invites',
      'index',
      {
        // id: localStorage.userID,
        Authorization: `BEARER ${localStorage.token}`
      },
      (invites) => this.setState({ invites })
    );
  }

  filterMessages = () => {
    if (this.state.messages ? unreadMessages = this.state.messages.filter(message => message.receiver_id == localStorage.userID && message.unread === true) : null)
      return unreadMessages.length
  }
  filterPendingInvites = () => {
    if (Array.isArray(this.state.invites) ? pendingInvites = this.state.invites.filter(invite => invite.receiver_id == localStorage.userID && invite.status == "pending" && moment().isBefore(moment(invite.meal.starts_at))) : null)
      return pendingInvites.length
  }
  filterAcceptedInvites = () => {
    if (Array.isArray(this.state.invites)) {
      acceptedInvites = this.state.invites.filter(invite => invite.receiver_id == localStorage.userID || invite.sender_id == localStorage.userID)

      let filteredInvites = acceptedInvites.filter(invite => invite.status == "accepted" && moment().isBefore(moment(invite.meal.starts_at)))
      console.log("acceptedInvites", filteredInvites)
      return filteredInvites.length

    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <Menu color="blue" fixed="top" inverted>
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
            {/* {localStorage.getItem('token') ? (
              <Menu.Item as="a" onClick={() => this.goTo(`/inbox`)}>
                {this.state.messages
                  ? `Inbox ( ${this.filterMessages()} )`
                  : "Inbox"}
              </Menu.Item>
            ) : null} */}
            {localStorage.getItem('token') ? (
              <Menu.Item as="a" onClick={() => this.goTo(`/myinvites`)}>
                {this.state.invites
                  ? `Pending Invites ( ${this.filterPendingInvites()} )`
                  : "Pending Invites"}
              </Menu.Item>
            ) : null}
            {localStorage.getItem('token') ? (
              <Menu.Item as="a" onClick={() => this.goTo(`/mymeals`)}>
                {this.state.invites
                  ? `Upcoming Meals ( ${this.filterAcceptedInvites()} )`
                  : "Upcoming Meals"}
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
      </div >
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
