import React from 'react';
import { Container, Form, Button, Card, Modal } from 'semantic-ui-react';
import { InviteForm } from './InviteForm'


export class RestaurantContainer extends React.Component {
  state = {
    open: false,
    expanded: false
  }

  goTo = (url) => {
    this.props.history.push(url);
  };
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <h3>{this.props.restaurant.name}</h3>
          </Card.Header>

          <Card.Description>
            Distance: {Number(this.props.restaurant.distance).toFixed(2)} miles
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Modal trigger={<Button>Restaurant Information</Button>} closeIcon>
              <Modal.Header>{this.props.restaurant.name} Contact Information</Modal.Header>
              <Modal.Content>
                <h3>Restaurant Location: {this.props.restaurant.formatted_address}</h3>
                <h3>Restaurant Phone: {this.props.restaurant.formatted_phone_number}</h3>
                <a href={this.props.restaurant.website} target="_blank">Visit {this.props.restaurant.name}'s Website</a>
              </Modal.Content>
            </Modal>
            <Modal trigger={<Button>Request Date</Button>} closeIcon>
              <Modal.Header>
                Schedule Meal at {this.props.restaurant.name}
              </Modal.Header>
              <InviteForm restaurant={this.props.restaurant} filteredUsers={this.props.filteredUsers} />
              {/* <Modal.Content image>
                <Image wrapped size="medium" src={currentCompanyLogo} />
                <Modal.Description>
                  <Header>Purchase Details</Header>
                  <PurchaseShareForm {...this.props} history={this.props.history} />
                </Modal.Description>
              </Modal.Content> */}
              {/* <Modal.Actions>
                <Button onClick={() => this.goTo("/messages")}>Submit Invite</Button>
              </Modal.Actions> */}
            </Modal>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
export default RestaurantContainer;
