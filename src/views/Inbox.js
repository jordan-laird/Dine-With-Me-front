import React from 'react'
import WarpCable from 'warp-cable-client';
import { Divider, Header, Image, Segment } from 'semantic-ui-react'
const API_DOMAIN = 'ws://10.185.0.217:3000/cable';
let api = WarpCable(API_DOMAIN);
let myMessages;

export class Inbox extends React.Component {
  state = {
    messages: [],
    users: []
  }
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
    api.subscribe(
      'Users',
      'index',
      {
        id: localStorage.userID,
        Authorization: `BEARER ${localStorage.token}`
      },
      (users) => this.setState({ users })
    );
  }

  filterMessages = () => {
    if (this.state.messages ? myMessages = this.state.messages.filter(message => message.receiver_id == localStorage.userID) : null)
      return myMessages
  }

  // findUser = () => {
  //   let user = []
  //   {
  //     user.push(unreadMessages.forEach((message) => (
  //       this.state.users.find(user => user.id == message.sender_id))))
  //     console.log(user)
  //   }
  // }
  render() {
    { this.filterMessages() }
    return (
      <div>
        {this.state.message.sender.first_name && this.state.messages.map(message => (
          message.sender.first_name
        ))}



      </div>
    )
  }
}

export default Inbox