import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

export class RestaurantContainer extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: 3 }}>
        <Form onSubmit={console.log('submitted')}>
          <h2>{this.props.restaurant.name}</h2>
          <p>
            Distance: {Number(this.props.restaurant.distance).toFixed(2)} miles
          </p>
          <Button color="teal" type="submit">
            Schedule Date
          </Button>
        </Form>
      </Container>
    );
  }
}
export default RestaurantContainer;
