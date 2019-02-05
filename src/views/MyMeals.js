import React from 'react'
import * as moment from 'moment';
import { Segment, Card, Container } from 'semantic-ui-react'
import WarpCable from 'warp-cable-client';
import { MealCard } from '../components/MealCard.js'
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;
export class MyMeals extends React.Component {
  state = {
    myMeals: [],
  }

  fetchMeals = (invites) => {
    let filterMyInvites = invites.filter(invite => invite.sender_id == localStorage.userID || invite.receiver_id == localStorage.userID)
    let filterStatus = filterMyInvites.filter(invite => invite.status == "accepted" && moment().isBefore(moment(invite.meal.starts_at)))
    console.log('MyMeals', filterStatus)
    this.setState({ myMeals: filterStatus })
  }


  componentDidMount() {
    api.subscribe(
      "Invites",
      "index",
      {
        Authorization: `BEARER ${localStorage.token}`,
        // userID: localStorage.userID
      },
      (invites) => {
        this.fetchMeals(invites)
      }
    )
  }
  render() {
    if (this.state.myMeals.length > 0) {
      return (
        <Container style={{ marginTop: 100, marginBottom: 30 }}>
          <h2 style={{ textAlign: "center" }}>Upcoming Appointments</h2>
          <Card.Group style={{ marginTop: 100 }} itemsPerRow={4}>
            {this.state.myMeals.map(invite =>
              <MealCard invite={invite} />
            )}
          </Card.Group>
        </Container>
      )

    } else {
      return (
        <Container style={{ marginTop: 100, textAlign: "center" }}><h1>You currently have no scheduled meals.</h1></Container>
      )

    }
  }
}

export default MyMeals