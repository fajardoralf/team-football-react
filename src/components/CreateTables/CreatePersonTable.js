import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/person";

class CreatePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.post(URL, {
      addressId:this.state.addressId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    this.setState({
      addressId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    })
  };

  setAddressId(event) {
    this.setState({
      addressId: event.target.value
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

  //componentDidMount() {
  //axios.get(URL).then(json => this.setState({ store: json.data }));
  //}

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
                type="addressId"
                placeholder="Address ID"
                value={this.state.addressId}
                onChange={this.setAddressId.bind(this)}
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
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreatePersonTable;
