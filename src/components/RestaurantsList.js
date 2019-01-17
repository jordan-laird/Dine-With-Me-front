import React from 'react';
import { Container } from 'semantic-ui-react';
import { RestaurantContainer } from './RestaurantContainer';

export class RestaurantsList extends React.Component {
  render() {
    return (
      <Container>
        {this.props.restaurantList.map((restaurant) => (
          <RestaurantContainer
            user={this.props.user}
            restaurant={restaurant}
            key={restaurant.id}
          />
        ))}
      </Container>
    );
  }
}
export default RestaurantsList;
