import React from 'react';
import { Container, Form, Button, Card, Modal, Icon } from 'semantic-ui-react';
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
    console.log(this.props.restaurant)
    return (
      <Card color="blue">
        <Card.Content>
          <Card.Header>
            <h3>{this.props.restaurant.name}</h3>
          </Card.Header>

          <Card.Description>
            <Icon name="map" size="large" />{Number(this.props.restaurant.distance).toFixed(2)} miles
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Modal trigger={<Button >Restaurant Information</Button>} closeIcon>
              <Modal.Header style={{ textAlign: "center" }}>{this.props.restaurant.name} Contact Information</Modal.Header>
              <Modal.Content>
                <Icon name="home" size="large" style={{ marginBottom: 10 }} /> {this.props.restaurant.formatted_address}<br />
                <Icon name="phone" size="large" style={{ marginBottom: 10 }} />
                {this.props.restaurant.formatted_phone_number}<br />
                <Icon name="at" size="large" />
                <a href={this.props.restaurant.website} target="_blank">{this.props.restaurant.name}'s Website</a>
              </Modal.Content>
            </Modal>
            <Modal trigger={<Button >Request Date</Button>} closeIcon>
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
