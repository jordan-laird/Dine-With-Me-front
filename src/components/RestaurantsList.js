import React from 'react';
import { Card } from 'semantic-ui-react';
import { RestaurantContainer } from './RestaurantContainer';

export class RestaurantsList extends React.Component {
  render() {
    let sortedList = this.props.restaurantList.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
    return (
      <Card.Group >
        {
          sortedList.map((restaurant) => (
            <RestaurantContainer
              user={this.props.user}
              restaurant={restaurant}
              key={restaurant.id}
            />
          ))
        }
      </Card.Group >
    );
  }
}
export default RestaurantsList;
