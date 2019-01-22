import React from 'react'
import WarpCable from 'warp-cable-client'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import { Form, Button } from 'semantic-ui-react'
import * as moment from 'moment';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;

moment.locale('ru')

export class InviteForm extends React.Component {
  state = {
    dateTime: "",
    randomUser: {}
  }
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  selectUser = () => {
    let selectedUser = this.props.filteredUsers[Math.floor(Math.random() * this.props.filteredUsers.length)]
    this.setState({ randomUser: selectedUser })
  }

  componentDidMount() {
    this.selectUser()
    api.subscribe(
      "Meals",
      "index",
      {
        Authorization: `BEARER ${localStorage.token}`,
        userID: localStorage.userID
      },
      (meals) => {
        console.log(meals)

      }
    )
  }

  createMealInvite = (e) => {
    api.trigger(
      "Meals",
      "create",
      {
        restaurant_name: e.target.restaurantName.value,
        restaurant_address: "EXAMPLE 123",
        restaurant_phone: "867-5309",
        starts_at: e.target.dateTime.value,
        sender_id: localStorage.userID,
        receiver_id: this.state.randomUser.id
      }
    )
  }

  render() {
    return (
      <Form onSubmit={(e) => { this.createMealInvite(e) }}>
        <Form.Input fluid label="Restaurant" name="restaurantName" value={this.props.restaurant.name} readOnly />
        <Form.Input fluid label="Nearby Diner" name="selectedUser" value={this.state.randomUser.first_name} readOnly />
        <DateTimeInput
          name="dateTime"
          placeholder="Date Time"
          value={this.state.dateTime}
          iconPosition="left"
          minDate={moment()}
          timeFormat="ampm"
          dateFormat="MM-DD-YYYY"
          closable={true}
          onChange={this.handleChange}
        />
        <Button type="submit">Send Invite</Button>
      </Form>
    );
  }
}
export default InviteForm;