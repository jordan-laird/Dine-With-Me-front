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
            <Button onClick={() => this.setState({ expanded: !this.state.expanded })}>Restaurant Information</Button>
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
