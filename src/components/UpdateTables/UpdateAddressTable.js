import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/address/";

class UpdateAddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressId: "",
      addressLine1: "",
      postalCode: "",
      city: "",
      country: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL + this.state.addressId, {
        address_id: this.state.addressId,
        address_line_1: this.state.addressLine1,
        postal_code: this.state.postalCode,
        city: this.state.postalCode,
        country: this.state.country,
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
        addressId: "",
        addressLine1: "",
        postalCode: "",
        city: "",
        country: ""
    });
  }

  handleAddressId(event) {
      this.setState({
          addressId: event.target.value
      })
  }

  setAddressLine1(event) {
    this.setState({ 
      addressLine1: event.target.value
    });
  }

  setPostalCode(event) {
    this.setState({ 
      postalCode: event.target.value
    });
  }

  setCity(event) {
    this.setState({ 
      city: event.target.value
    });
  }

  setCountry(event) {
    this.setState({ 
      country: event.target.value
    });
  }

  render() {
    const title = "Update Address";

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateAddressForm">
              <Form.Label>Where Address ID is:</Form.Label>
              <Form.Control
                type="addressId"
                placeholder="Address ID"
                value={this.state.addressId}
                onChange={this.handleAddressId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="addressLine1"
                placeholder="Address Line 1"
                value={this.state.addressLine1}
                onChange={this.setAddressLine1.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="postalCode"
                placeholder="Postal Code"
                value={this.state.postalCode}
                onChange={this.setPostalCode.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                placeholder="City"
                value={this.state.city}
                onChange={this.setCity.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="country"
                placeholder="Country"
                value={this.state.country}
                onChange={this.setCountry.bind(this)}
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
                {this.state.submitted ? this.state.address_line_1 : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateAddressTable;