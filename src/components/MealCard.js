import React from 'react'
import * as moment from 'moment';
import { Segment, Card } from 'semantic-ui-react'
import WarpCable from 'warp-cable-client';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;

export class MealCard extends React.Component {
  state = {
    diningWithUser: {},
    mealInfo: {}
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
          <Card.Header>
            {this.state.mealInfo.restaurant_name}
          </Card.Header>
          <Card.Description>

            <p>
              Location: {this.state.mealInfo.restaurant_address}
            </p>
            <p>
              Date/Time: {
                moment(this.state.mealInfo.starts_at).format('MM/DD/YYYY h:mm a')}
            </p>
            <p>
              Dining With: {this.state.diningWithUser.first_name}
            </p>
          </Card.Description>
        </Card.Content>

      </Card>
    )
  }
}
export default MealCard