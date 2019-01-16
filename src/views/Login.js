import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

export class Login extends React.Component {
  login = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        email: e.target.emailInput.value,
        password: e.target.passwordInput.value
      })
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem('token', result.json.token);
        localStorage.setItem('userID', result.json.user.id);
        this.goTo('/home');
      });
  };

  goTo = (url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <Container>
        <h1>Please Login</h1>
        <Form onSubmit={(e) => this.login(e)}>
          <Form.Input label="Email" name="emailInput" placeholder="Email" />
          <Form.Input label="Password" type="password" name="passwordInput" />
          <Button type="submit" color="teal">
            Login
          </Button>
        </Form>
        <Button onClick={() => this.goTo('/register')} color="teal">
          Register
        </Button>
      </Container>
    );
  }
}

export default Login;
