import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import WarpCable from 'warp-cable-client';
import * as moment from 'moment'
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api

export class Invite extends React.Component {
  state = {
    senderInfo: {},
    mealInfo: {}
  }

  fetchUserInfo = () => {
    api.subscribe(
      "Users",
      "show",
      {
        id: this.props.invite.sender_id,
        Authorization: `BEARER ${localStorage.token}`
      },
      (userInfo) => this.setState({ senderInfo: userInfo })
    )
  }
  fetchMealInfo = () => {
    api.subscribe(
      "Meals",
      "show",
      {
        id: this.props.invite.meal_id,
        Authorization: `BEARER ${localStorage.token}`
      },
      (mealInfo) => this.setState({ mealInfo: mealInfo })
    )
  }

  acceptDeny = () => {
    if (this.props.invite.status == "pending") {

    }
  }

  componentDidMount() {
    this.fetchUserInfo()
    this.fetchMealInfo()
  }
  render() {
    console.log(this.state.mealInfo)
    return (
      <Segment>
        <h2>{this.state.mealInfo.restaurant_name}</h2>
        <p>
          Location: {this.state.mealInfo.restaurant_address}
        </p>
        <p>
          Date/Time: {
            moment(this.state.mealInfo.starts_at).format('MM/DD/YYYY h:mm a')}
        </p>
        <p>
          Dining With: {this.state.senderInfo.first_name}
        </p>
        {/* {(this.props.invite.status == "pending" ?
          <Button>Accept</Button>
          <Button>Deny</Button> : null)} */}


      </Segment>
    )
  }
}

export default Invite