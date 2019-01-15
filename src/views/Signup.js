import React from 'react'
import { Container, Form, Button } from 'semantic-ui-react'

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
                user: {
                    email: e.target.emailInput.value,
                    password: e.target.passwordInput.value,
                    first_name: e.target.firstNameInput.value,
                    last_name: e.target.lastNameInput.value,
                    lat: 29.760427,
                    long: -95.369804

                }

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
   
    render(){
        return(
            <Container>
                <h1>Create Account</h1>
                <Form onSubmit={e => this.createAccount(e)}>
                    <Form.Input
                        label="Email"
                        name="emailInput"
                        placeholder="Email"
                    />
                    <Form.Input
                        label="First Name"
                        name="firstNameInput"
                        placeholder="First Name"
                    />
                    <Form.Input
                        label="Last Name"
                        name="lastNameInput"
                        placeholder="Last Name"
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        name="passwordInput"
                        placeholder="Password"
                    />
                    <Button type="submit"color="teal">Create Account</Button>
                </Form>
            </Container>
        )
    }
}

export default Signup