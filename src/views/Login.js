import React from 'react';
import { Container, Form, Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export class Login extends React.Component {
  login = (e) => {
    console.log(e.target.emailInput.value)
    e.preventDefault();
    fetch('http://localhost:3000/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        email: e.target.emailInput.value,
        password: e.target.passwordInput.value
      })
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('HERE',result)
        if (!result.error) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('userID', result.user.id);
          this.goTo('/home');
        }
      });
  };

  goTo = (url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100%', marginTop: 200 }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header color="blue" as='h2' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={e => this.login(e)}>
              <Segment stacked>
                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' name="emailInput" />
                <Form.Input
                  fluid icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name="passwordInput"
                />

                <Button color="blue" fluid size='large' type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to={'/register'}>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div >
    )



    // <Container>
    //   <h1>Please Login</h1>
    //   <Form onSubmit={(e) => this.login(e)}>
    //     <Form.Input label="Email" name="emailInput" placeholder="Email" />
    //     <Form.Input label="Password" type="password" name="passwordInput" />
    //     <Button type="submit" color="blue">
    //       Login
    //     </Button>
    //   </Form>
    //   <Button onClick={() => this.goTo('/register')} color="blue">
    //     Register
    //   </Button>
    // </Container>
    // );
  }
}

export default Login;
