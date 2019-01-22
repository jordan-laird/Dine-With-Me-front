import React from 'react'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import { Form } from 'semantic-ui-react'
import * as moment from 'moment';

moment.locale('ru')

export class InviteForm extends React.Component {
  state = {
    dateTime: ""
  }
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  selectUser = () => {
    let selectedUser = this.props.filteredUsers[Math.floor(Math.random() * this.props.filteredUsers.length)]
    return selectedUser.first_name
  }

  render() {
    return (
      <Form>
        <Form.Input fluid label="Restaurant" name="restaurantName" value={this.props.restaurant.name} readOnly />
        <Form.Input fluid label="Nearby Diner" name="selectedUser" value={this.selectUser()} readOnly />
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
      </Form>
    );
  }
}
export default InviteForm;