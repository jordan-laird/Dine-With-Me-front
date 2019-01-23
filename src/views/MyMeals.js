import React from 'react'
import * as moment from 'moment';
import { Segment, Card } from 'semantic-ui-react'
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
    return (
      <div>
        <Card.Group style={{ marginTop: 100 }}>
          {this.state.myMeals.map(invite =>
            <MealCard invite={invite} />
          )}
        </Card.Group>
      </div>
    )
  }
}

export default MyMeals