import React from 'react'
import { Segment, Button, Card, Icon } from 'semantic-ui-react'
import WarpCable from 'warp-cable-client';
import * as moment from 'moment'
const API_DOMAIN = 'ws://dine-with-me-api.herokuapp.com/cable';
let api = WarpCable(API_DOMAIN);
window.api = api

export class SentInvite extends React.Component {
  state = {
    receiverInfo: {},
    mealInfo: {}
  }

  fetchUserInfo = () => {
    api.subscribe(
      "Users",
      "show",
      {
        id: this.props.invite.receiver_id,
        Authorization: `BEARER ${localStorage.token}`
      },
      (userInfo) => this.setState({ receiverInfo: userInfo })
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

  changeStatus = (e) => {
    api.trigger(
      "Invites",
      "update",
      {
        id: this.props.invite.id,
        Authorization: `BEARER ${localStorage.token}`,
        status: e.target.value
      }
    )
  }

  componentDidMount() {
    this.fetchUserInfo()
    this.fetchMealInfo()
  }
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {this.state.mealInfo.restaurant_name}
          </Card.Header>
          <Card.Description>

            <p>
              <Icon name="home" size="large" />{this.state.mealInfo.restaurant_address}
            </p>
            <p>
              <Icon name="calendar" size="large" />{
                moment(this.state.mealInfo.starts_at).format('MM/DD/YYYY h:mm a')}
            </p>
            <p>
              <Icon name="user" size="large" />{this.state.receiverInfo.first_name}
            </p>
          </Card.Description>
        </Card.Content>
        {(this.props.invite.status == "pending" && this.props.invite.sender_id == localStorage.userID) ?
          <Card.Content extra>{this.props.invite.status.charAt(0).toUpperCase() + this.props.invite.status.slice(1)}</Card.Content>
          : null}
      </Card>
    )
  }
}

export default SentInvite