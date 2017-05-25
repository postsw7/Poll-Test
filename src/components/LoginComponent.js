import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import '../styles/Login.css';

class LoginComponent extends Component {
  constructor(props) {
    super(props);

  }

  getEmailandPassword (e) {
    e.preventDefault();
    this.props.handleLogin(e.target[0].value, e.target[1].value);
  }

  handleSignupInfo () {
    this.props.handleSignup(this.email.value, this.password.value);
  }

  render() {
    return (
      <Form horizontal onSubmit={this.getEmailandPassword.bind(this)}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl inputRef={ref => { this.email = ref; }} type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl inputRef={ref => { this.password = ref; }} type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button id="signIn" type="submit">
              Sign in
            </Button>
            <Button onClick={this.handleSignupInfo.bind(this)}>
              Sign up
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

// LoginComponent.propTypes = {};

export default LoginComponent;
