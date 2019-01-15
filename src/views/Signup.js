import React from 'react'
import { Container, Form, Button } from 'semantic-ui-react'

export class Signup extends React.Component {
    login = e => {
        e.preventDefault();
        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target.emailInput.value,
                password: e.target.passwordInput.value
            })
        })
            .then(res => res.json())
            .then(result => {
               
                this.goTo("/login");
                ;
            });

    };

    goTo = url => {
        this.props.history.push(url);
    };
   
    render(){
        return(
            <Container>
                <h1>Create Account</h1>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <br />
                        <input placeholder="First" />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <br />
                        <input placeholder="Last" />
                    </Form.Field>
                    <Form.Field>
                        <label>Email Address</label>
                        <br />
                        <input placeholder="Email" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <br />
                        <input type="password"placeholder="Password" />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <br />
                        <input type="password"placeholder="Password" />
                    </Form.Field>
                    <Button type="submit"color="teal">Create Account</Button>
                </Form>
            </Container>
        )
    }
}

export default Signup