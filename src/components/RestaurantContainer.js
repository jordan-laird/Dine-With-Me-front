import React from 'react';
import { Container } from 'semantic-ui-react';

export class RestaurantContainer extends React.Component {
  render() {
    console.log(this.props.restaurant);
    return (
      <Container>
        <h2>{this.props.restaurant.name}</h2>
      </Container>
    );
  }
}
export default RestaurantContainer;
