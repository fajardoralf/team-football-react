import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/person/";

class UpdatePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: "",
      addressId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(
        URL + this.state.personId,
        {
          person_id: this.state.personId,
          address_id: this.state.addressId,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          date_of_birth: this.state.dateOfBirth,
          message: "Successfully Updated",
          submitted: true
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        console.log("response: ", res);
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
    this.setState({
      personId: "",
      addressId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    });
  }

  handlePersonId(event) {
    this.setState({
      personId: event.target.value
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

  render() {
    const title = "Update Person";

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updatePersonForm">
              <Form.Label>Where Person ID is:</Form.Label>
              <Form.Control
                type="personId"
                placeholder="Person ID"
                value={this.state.personId}
                onChange={this.handlePersonId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updatePersonForm">
              <Form.Label>Address ID</Form.Label>
              <Form.Control
                type="addressId"
                placeholder="Address OD"
                value={this.state.addressId}
                onChange={this.setAddressId.bind(this)}
              />
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

              <div className="text-center">
                {this.state.message}
                {this.state.submitted ? this.state.firstName : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdatePersonTable;
