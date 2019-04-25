import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const URL = "https://team-football-api.herokuapp.com/users";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      message: "",
      submitted: false
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios
      .post(
        URL,
        {
          username: this.state.username,
          password: this.state.password,
          role: false // false == regular user
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then(res => {
        console.log("Response", res);
        if (res.status === 202) {
          console.log("User" + this.state.username + " registered");
          sessionStorage.setItem("username", res.data.username);
          sessionStorage.setItem("role", "user");
          sessionStorage.setItem("password", res.data.password);
          this.setState({
            redirect: true,
            message: "Successfully created ",
            submitted: true
          });
        }
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
    this.setState({
      username: "",
      password: ""
    });
  };

  setUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    let title = "Create User";

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <div className="text-right">
            <a href="/" className="btn btn-info" id="button">
              Back
            </a>
            {this.renderRedirect()}
          </div>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="addUserForm">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.setUsername.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addUserForm">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.setPassword.bind(this)}
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="dark" type="Submit">
                Create
              </Button>

              <div className="text-center">
                {this.state.message}
                {this.state.submitted ? this.state.username : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateUser;
