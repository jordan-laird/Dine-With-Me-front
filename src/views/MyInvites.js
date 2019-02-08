import React from 'react'
import { Segment, Card, Container } from 'semantic-ui-react'
import { ReceivedInvite } from '../components/ReceivedInvite.js'
import { SentInvite } from '../components/SentInvite.js'
import * as moment from 'moment';
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'wss://dine-with-me-api.herokuapp.com/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;

export class MyInvites extends React.Component {
  state = {
    sentInvites: [],
    receivedInvites: []
  }

  sortInvites = (invites) => {
    let mySentInvites = invites.filter(invite => invite.sender_id == localStorage.userID && invite.status == "pending" && moment().isBefore(moment(invite.meal.starts_at)))
    let myReceivedInvites = invites.filter(invite => invite.receiver_id == localStorage.userID && invite.status == "pending" && moment().isBefore(moment(invite.meal.starts_at)))
    this.setState({ sentInvites: mySentInvites, receivedInvites: myReceivedInvites })
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
        this.sortInvites(invites)
      }
    )
  }
  render() {
    return (
      <div>
        <Container style={{ marginTop: 100, marginBottom: 30 }}>

          <h2 style={{ textAlign: 'center' }}>Received Invites</h2>

          <Card.Group style={{ marginTop: 50 }} itemsPerRow={4}>
            {this.state.receivedInvites.map(invite =>
              <ReceivedInvite invite={invite}></ReceivedInvite>)}

          </Card.Group>
          {/* </Segment> */}

        </Container>
        {/* <Segment style={{ marginTop: 100, marginBottom: 30 }}> */}
        <Container>
          <h2 style={{ textAlign: "center" }}>Sent Invites</h2>
          <Card.Group style={{ marginTop: 50 }} itemsPerRow={4}>
            {this.state.sentInvites.map(invite =>
              <SentInvite invite={invite}></SentInvite>)}

          </Card.Group>

        </Container>

      </div >
    )
  }

}

export default MyInvites