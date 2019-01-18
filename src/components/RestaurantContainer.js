import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

export class RestaurantContainer extends React.Component {
  state = {
    expanded: false
  };
  render() {
    return (
      <Container style={{ marginTop: 3 }}>
        <h2>{this.props.restaurant.name}</h2>
        <p>
          Distance: {Number(this.props.restaurant.distance).toFixed(2)} miles
        </p>
        <Button>Schedule Date</Button>
      </Container>
    );
  }
}
export default RestaurantContainer;
