import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/location/";

class UpdateLocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationId: "",
      addressId: "",
      name: "",
      description: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        location_id: this.state.locationId,
        address_id: this.state.addressId,
        name: this.state.addressName,
        description: this.state.description,
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
        locationId: "",
        addressId: "",
        name: "",
        description: ""
    });
  }

  setLocationId(event) {
    this.setState({ 
      locationId: event.target.value
    });
  }

  setAddressId(event) {
    this.setState({ 
      addressId: event.target.value
    });
  }

  setName(event) {
    this.setState({ 
      name: event.target.value
    });
  }

  setDescription(event) {
      this.setState({
          description: event.target.value
      })
  }

  render() {
    let title = "Update Location"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="locationId"
                placeholder="Location ID"
                value={this.state.locationId}
                onChange={this.setLocationId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Address ID</Form.Label>
              <Form.Control
                type="addressId"
                placeholder="Address ID"
                value={this.state.addressId}
                onChange={this.setAddressId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.setName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.setDescription.bind(this)}
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
                {this.state.submitted ? this.state.name : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateLocationTable;