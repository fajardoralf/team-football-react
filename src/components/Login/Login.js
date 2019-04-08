import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "admin",
    };
  }

  componentDidMount() {}

  handleSubmit() {
    var _this = this;
    sessionStorage.setItem('username', _this.state.username)
    sessionStorage.setItem('password', _this.state.password)
    sessionStorage.setItem('role', _this.state.role) //admin, user, undefined == anonymous
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="text-center">
      <h1>Welcome to Football Manager</h1>
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group controlId="formBasicUsernameLogin">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChangeUsername.bind(this)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPasswordLogin">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.handleChangePassword.bind(this)}
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="dark" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default Login;