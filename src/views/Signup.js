import React from 'react'
import { Container, Form, Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export class Signup extends React.Component {
    createAccount = e => {
        e.preventDefault();
        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: e.target.emailInput.value,
                password: e.target.passwordInput.value,
                first_name: e.target.firstNameInput.value,
                last_name: e.target.lastNameInput.value,
                lat: 29.760427,
                long: -95.369804,
                // avatar: e.target.avatarInput

            })
        })
            .then(
                alert("Your account has been created. Please login")
            )
            .then(
                this.goTo("/")

            );

    };

    goTo = url => {
        this.props.history.push(url);
    };

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100%', marginTop: 200 }}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color="blue" textAlign='center'>
                        Create Account
                    </Header>
                    <Form size='large' onSubmit={e => this.createAccount(e)}>
                        <Segment stacked>

                            <Form.Input
                                fluid icon="mail"
                                iconPosition="left"
                                label="Email"
                                name="emailInput"
                                placeholder="Email"
                            />
                            <Form.Input
                                fluid icon="user" iconPosition="left"
                                label="First Name"
                                name="firstNameInput"
                                placeholder="First Name"
                            />
                            <Form.Input
                                fluid icon="user" iconPosition="left"
                                label="Last Name"
                                name="lastNameInput"
                                placeholder="Last Name"
                            />
                            <Form.Input
                                fluid icon='lock' iconPosition="left"
                                label="Password"
                                type="password"
                                name="passwordInput"
                                placeholder="Password"
                            />
                            {/* <Form.Input
                                fluid
                                label="Profile Image"
                                type="file"
                                name="avatarInput"
                                accept="image"
                            > */}
                            {/* </Form.Input> */}
                            <Button type="submit" color="blue" fluid size="large">Create Account</Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already Have an Account? <Link to={'/'}>Login</Link>
                    </Message>
                </Grid.Column >
            </Grid >
        )
    }
}

export default Signup