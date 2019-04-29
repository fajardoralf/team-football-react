import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/";

class UpdateSelfTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: sessionStorage.getItem("user_id"),
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
    /*
    axios.get(URL + "person/" + this.state.personId).then(res =>
      this.setState({
        addressId: res.data.address_id,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        dateOfBirth: res.data.date_of_birth
      })
    );
    */
    axios

      .get(URL + "users/" + this.state.personId)
      .then(res => this.setState({ user: res.data }));
    /*
    axios
      .get(URL + "address/", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            key: data.address_id,
            address_line_1: data.address_line_1
          };
        });
        this.setState({
          addresses: data
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
      */
  }

  handlePasswordChange = event => {
    event.preventDefault();
    axios
      .put(URL + "users/" + this.state.personId, {
        user_id: this.state.personId,
        //username: this.state.user.username,
        username: this.state.new_username,
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
    const titlePassword = "Update Your Password";
    const { addressId, addresses } = this.state;

    return (
      <div className="row">
        {/*
        <div className="col">
          <Card bg="light" text="black" style={{ width: "100%" }}>
            <Card.Body>
              <h3 className="text-center">{titleInfo}</h3>
              <br />
              <Form onSubmit={this.handleForm.bind(this)}>
                <Form.Group controlId="updatePersonForm">
                  <Form.Label>Address ID</Form.Label>
                  <Form.Control
                    type="addressId"
                    placeholder="Address ID"
                    value={addressId}
                    onChange={this.setAddressId.bind(this)}
                    as="select"
                  >
                    {addresses.map((a, index) => {
                      return (
                        <option key={index} value={a.address_id}>
                          {a.address_line_1}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="udpatePersonForm">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.setFirstName.bind(this)}
                  />
                </Form.Group>

                <Form.Group controlId="updatePersonForm">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.setLastName.bind(this)}
                  />
                </Form.Group>

                <Form.Group controlId="updatePersonForm">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="dateOfBirth"
                    placeholder="Date of Birth"
                    value={this.state.dateOfBirth}
                    onChange={this.setDateOfBirth.bind(this)}
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
                    Update
                  </Button>

                  <div className="text-center">{this.state.message}</div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
        */}
        <div className="col">
          <Card bg="light" text="black">
            <Card.Body>
              <h3>{titleInfo}</h3>
              <Form onSubmit={this.handlePasswordChange}>
                <Form.Group controlId="changeUsername">
                  <Form.Label>New Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="New Username"
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
