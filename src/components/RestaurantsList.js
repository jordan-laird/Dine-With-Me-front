import React from 'react';
import { Card } from 'semantic-ui-react';
import { RestaurantContainer } from './RestaurantContainer';

export class RestaurantsList extends React.Component {
  render() {
    return (
      <Card.Group>
        {this.props.restaurantList.map((restaurant) => (
          <RestaurantContainer
            user={this.props.user}
            restaurant={restaurant}
            key={restaurant.id}
          />
        ))}
      </Card.Group>
    );
  }
}
export default RestaurantsList;
