import React from 'react';
import { Card, Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import { RestaurantContainer } from './RestaurantContainer';

export class RestaurantsList extends React.Component {
  render() {
    let sortedList = this.props.restaurantList.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
    {
      if (this.props.restaurantList.length > 0) {
        return (
          <Card.Group itemsPerRow={4} style={{ marginTop: 30 }}>
            {
              sortedList.map((restaurant) => (
                <RestaurantContainer
                  filteredUsers={this.props.filteredUsers}
                  user={this.props.user}
                  restaurant={restaurant}
                  key={restaurant.id}
                />
              ))
            }
          </Card.Group >
        )
      }
      else {
        return (
          <Segment style={{ height: 600 }}>
            <Dimmer active inverted>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment>

        )
      }
    }
  }
}

export default RestaurantsList;
