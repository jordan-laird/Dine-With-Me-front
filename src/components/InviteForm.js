import React from 'react'
import WarpCable from 'warp-cable-client'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import { Form, Button, Modal, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import * as moment from 'moment';
const API_DOMAIN = 'wss://dine-with-me-api.herokuapp.com/cable';
let api = WarpCable(API_DOMAIN);
window.api = api;

moment.locale('ru')

export class _InviteForm extends React.Component {
  state = {
    dateTime: moment().add(1, 'day').format('MM-DD-YYYY h:mm a'),
    //'%m-%d-%Y %I:%M %p'
    randomUser: {
      first_name: "Bob"
    },
    open: false
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  goTo = (url) => {
    this.props.history.push(url);
  };

  handleChange = (e, { name, value }) => {
    e.persist();
    let inviteTime = value
    this.setState({ [name]: inviteTime })
  }

  selectUser = () => {
    console.log(this.props.filteredUsers)
    let selectedUser = this.props.filteredUsers[Math.floor(Math.random() * this.props.filteredUsers.length)]
    console.log(selectedUser)
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
    const { open } = this.state.open
    if (this.state.randomUser && this.state.dateTime) {
      return (
        <div>
          <Form size='large' style={{ marginLeft: 40, marginRight: 40 }} onSubmit={(e) => { this.createMealInvite(e) }}>
            <Modal.Content style={{ marginTop: 20 }} >
              <Form.Input label="Restaurant" name="restaurantName" value={this.props.restaurant.name} readOnly />
              <Form.Input label="Nearby Diner" name="selectedUser" value={this.state.randomUser.first_name} readOnly />
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
              <Button color="green" style={{ marginTop: 15, marginBottom: 15, float: "right" }} type="submit">Send Invite</Button>
              <Button style={{ float: "right", marginTop: 15, marginBottom: 15 }} type="button" color="blue" onClick={() => this.selectUser()}>Shuffle Diner</Button>
            </Modal.Content>
            <Modal.Actions>
              <NestedModal randomUser={this.state.randomUser} />
            </Modal.Actions>
          </Form >
        </div>
      );
    }
    else { return null }

  }
}

class NestedModal extends React.Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button style={{ float: "right", marginTop: 15, marginBottom: 15 }} type="button" primary icon>
            User Details
          </Button>
        }
      >
        <Modal.Header> {this.props.randomUser.first_name}</Modal.Header>
        <Modal.Content>
          <p>{this.props.randomUser.user_description}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" type="button" icon='check' content='All Done' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}
// export default InviteForm
export const InviteForm = withRouter(_InviteForm);