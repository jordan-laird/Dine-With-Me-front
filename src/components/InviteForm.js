import React from 'react'
import WarpCable from 'warp-cable-client'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import { Form, Button, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import * as moment from 'moment';
const API_DOMAIN = 'ws://localhost:3000/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;

moment.locale('ru')

export class _InviteForm extends React.Component {
  state = {
    dateTime: moment().add(1, 'day').format('MM-DD-YYYY h:mm a'),
    //'%m-%d-%Y %I:%M %p'
    randomUser: {
      first_name: "Bob"
    }
  }

  goTo = (url) => {
    this.props.history.push(url);
  };

  handleChange = (e, { name, value }) => {
    e.persist();
    let inviteTime = value
    this.setState({ [name]: inviteTime })
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
    console.log(this.state.dateTime)

    api.subscribe(
      "Meals",
      "create",
      {
        Authorization: `BEARER ${localStorage.token}`,
        restaurant_name: e.target.restaurantName.value,
        restaurant_address: this.props.restaurant.formatted_address,
        restaurant_phone: this.props.restaurant.formatted_phone_number,
        starts_at: this.state.dateTime,
        sender_id: localStorage.userID,
        receiver_id: this.state.randomUser.id
      }, () => {
        console.log('HERE')
        this.goTo('/myinvites')
      }
    )
  }

  render() {
    if (this.state.randomUser && this.state.dateTime) {
      return (
        <Form size='large' style={{ maxWidth: 300, marginLeft: 15 }} onSubmit={(e) => { this.createMealInvite(e) }}>
          <Modal.Content style={{ marginTop: 20 }} >
            <Form.Input fluid label="Restaurant" name="restaurantName" value={this.props.restaurant.name} readOnly />
            <Form.Input fluid label="Nearby Diner" name="selectedUser" value={this.state.randomUser.first_name} readOnly />
            <DateTimeInput
              name="dateTime"
              placeholder="Date/Time"
              value={this.state.dateTime}
              iconPosition="left"
              minDate={moment().add(1, "day")}
              timeFormat="ampm"
              dateFormat="MM-DD-YYYY"
              closable={true}
              onChange={this.handleChange}
            />
            <Button color="green" style={{ marginTop: 15, marginBottom: 15 }} type="submit">Send Invite</Button>
          </Modal.Content>
          <Modal.Actions>
          </Modal.Actions>
        </Form>
      );
    }
    else { return null }

  }
}
// export default InviteForm
export const InviteForm = withRouter(_InviteForm);