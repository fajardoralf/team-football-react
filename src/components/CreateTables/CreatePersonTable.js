import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/person";

class CreatePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address_id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
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
          address_id: this.state.address_id,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          date_of_birth: this.state.dateOfBirth,
          message: "Successfully created ",
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
      address_id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    });
  };

  setAddress_id(event) {
    this.setState({
      address_id: event.target.value
    });
  }

  setFirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }
  setLastName(event) {
    this.setState({
      lastName: event.target.value
    });
  }
  setDateOfBirth(event) {
    this.setState({
      dateOfBirth: event.target.value
    });
  }

  render() {
    let title = "Create Person";

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="addPersonForm">
              <Form.Label>Address ID</Form.Label>
              <Form.Control
                type="address_id"
                placeholder="Address ID"
                value={this.state.address_id}
                onChange={this.setAddress_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.setFirstName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.setLastName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="dateOfBirth"
                placeholder="YYYY-MM-DD"
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
                Create
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

export default CreatePersonTable;