import React from 'react'
import * as moment from 'moment';
import { Segment, Card, Button, Icon } from 'semantic-ui-react'
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;

export class MealCard extends React.Component {
  state = {
    diningWithUser: {},
    mealInfo: {}
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

  fetchDiningWithUserInfo = () => {
    this.props.invite.sender_id != localStorage.userID ?
      api.subscribe(
        "Users",
        "show",
        {
          id: this.props.invite.sender_id,
          Authorization: `BEARER ${localStorage.token}`
        },
        (userInfo) => this.setState({ diningWithUser: userInfo })
      ) :
      api.subscribe(
        "Users",
        "show",
        {
          id: this.props.invite.receiver_id,
          Authorization: `BEARER ${localStorage.token}`
        },
        (userInfo) => this.setState({ diningWithUser: userInfo })
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

  async componentDidMount() {
    await this.fetchDiningWithUserInfo()
    await this.fetchMealInfo()
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header style={{ marginBottom: 10 }}>
            {this.state.mealInfo.restaurant_name}
          </Card.Header>
          <Card.Description>
            <Icon name="user" size="large" style={{ marginBottom: 10 }} /> {this.state.diningWithUser.first_name} <br />
            <Icon name="calendar" size="large" style={{ marginBottom: 10 }} />
            {moment(this.state.mealInfo.starts_at).format('MM/DD/YYYY h:mm a')} <br />
            <Icon name="home" size="large" style={{ marginBottom: 10 }} />{this.state.mealInfo.restaurant_address} <br />
            <Icon name="phone" size="large" style={{ marginBottom: 10 }} />{this.state.mealInfo.restaurant_phone}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button fluid color="red" onClick={this.changeStatus} value="cancelled">Cancel Meal</Button>
        </Card.Content>

      </Card>
    )
  }
}
export default MealCard