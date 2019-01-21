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

export class DateTimeFormInline extends React.Component {
  state = {
    dateTime: ""
  }
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Form>
        <DateTimeInput
          name="dateTime"
          placeholder="Date Time"
          value={this.state.dateTime}
          iconPosition="left"
          minDate={moment()}
          maxTime="10:00 pm"
          timeFormat="ampm"
          dateFormat="MM-DD-YYYY"
          closable="true"
          onChange={this.handleChange}
        />
      </Form>
    );
  }
}
export default DateTimeFormInline;