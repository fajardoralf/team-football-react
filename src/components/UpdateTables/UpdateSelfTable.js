import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/";

class UpdateSelfTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: parseInt(sessionStorage.getItem("user_id")),
      user: {},
      addressId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      message: "",
      new_username: "",
      new_password: "",
      submitted: false,
      password_updated: false,
      addresses: []
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios.post(URL + "person", {
      person_id: this.state.personId,
      address_id: this.state.addressId,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth,
      message: "Successfully Updated",
      submitted: true
    });
    this.setState({
      addressId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    });
  }

  setAddressId(event) {
    this.setState({ addressId: event.target.value });
  }

  setFirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  setLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  setDateOfBirth(event) {
    this.setState({ dateOfBirth: event.target.value });
  }

  componentDidMount() {
    axios
      .get(URL + "users/" + this.state.personId)
      .then(res => this.setState({ user: res.data }));
  }

  handlePasswordChange = event => {
    event.preventDefault();
    axios
      .put(URL + "users/" + this.state.personId, {
        user_id: this.state.personId,
        //username: this.state.user.username,
        username: this.state.new_username !== '' 
          ? this.state.new_username
          : this.state.user.username,
        password:
          this.state.new_password !== ""
            ? this.state.new_password
            : this.state.user.password,
        role: this.state.user.role
      })
      .then(res => {
        if (res.status === 202) {
          this.setState({
            password_updated: true
          });
        }
      });
  };

  setNewUsername = event => {
    this.setState({ new_username: event.target.value });
  };

  setNewPassword = event => {
    this.setState({ new_password: event.target.value });
  };

  render() {
    const titleInfo = "Update Your Information";
    const {user} = this.state;

    return (
      <div className="row">
        <div className="col">
          <Card bg="light" text="black">
            <Card.Body>
              <h3>{titleInfo}</h3>
              <Form onSubmit={this.handlePasswordChange}>
                <Form.Group controlId="changeUsername">
                  <Form.Label>New Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder={user.username}
                    value={this.state.new_username}
                    onChange={this.setNewUsername}
                  />
                </Form.Group>
                <Form.Group controlId="changePassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    value={this.state.new_password}
                    onChange={this.setNewPassword}
                  />
                </Form.Group>

                <Button variant="dark" type="submit">
                  Change
                </Button>
                <br />
                {this.state.password_updated
                  ? "Password successfully changed"
                  : ""}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default UpdateSelfTable;
