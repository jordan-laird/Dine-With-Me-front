import React from 'react'
import { Segment, Card } from 'semantic-ui-react'
import { Invite } from '../components/Invite.js'
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;

export class MyInvites extends React.Component {
  state = {
    sentInvites: [],
    receivedInvites: []
  }

  fetchMySentInvites = (invites) => {
    let mySentInvites = invites.filter(invite => invite.sender_id == localStorage.userID)
    this.setState({ sentInvites: mySentInvites })
  }
  fetchMyReceivedInvites = (invites) => {
    let myReceivedInvites = invites.filter(invite => invite.receiver_id == localStorage.userID)
    this.setState({ receivedInvites: myReceivedInvites })
  }

  componentDidMount() {
    api.subscribe(
      "Invites",
      "index",
      {
        Authorization: `BEARER ${localStorage.token}`,
        userID: localStorage.userID
      },
      (invites) => {
        this.fetchMySentInvites(invites)
        this.fetchMyReceivedInvites(invites)
      }
    )
  }
  render() {
    console.log("MYSENTINVITES", this.state.sentInvites)
    console.log("MYRECEIVED", this.state.receivedInvites)
    return (
      <Card.Group style={{ marginTop: 100 }}>
        {this.state.receivedInvites.map(invite =>
          <Invite invite={invite}></Invite>)}

      </Card.Group>
    )
  }

}

export default MyInvites