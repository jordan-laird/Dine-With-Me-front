import React from 'react';
import { Container } from 'semantic-ui-react';

export class RestaurantContainer extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: 3 }}>
        <h2>{this.props.restaurant.name}</h2>
        <p>
          Distance: {Number(this.props.restaurant.distance).toFixed(2)} miles
        </p>
      </Container>
    );
  }
}
export default RestaurantContainer;
