import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/address/";

class CreateAddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressLine1: "",
      postalCode: "",
      city: "",
      country: "",
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
          address_line_1: this.state.addressLine1,
          postal_code: this.state.postalCode,
          city: this.state.city,
          country: this.state.country
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
        this.setState({
          submitted: true,
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          submitted: false,
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      addressLine1: "",
      postalCode: "",
      city: "",
      country: ""
    });
  };

  setAddressLine1 = event => {
    this.setState({
      addressLine1: event.target.value
    });
  };

  setPostalCode = event => {
    this.setState({
      postalCode: event.target.value
    });
  };

  setCity = event => {
    this.setState({
      city: event.target.value
    });
  };

  setCountry = event => {
    this.setState({
      country: event.target.value
    });
  };

  render() {
    let title = "Create Address";

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createAddressForm">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="addressLine1"
                style={{ textTransform: "capitalize" }}
                placeholder="Address"
                value={this.state.addressLine1}
                onChange={this.setAddressLine1}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="number"
                placeholder="Postal Code"
                value={this.state.postalCode}
                onChange={this.setPostalCode}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                placeholder="City"
                style={{ textTransform: "capitalize" }}
                value={this.state.city}
                onChange={this.setCity}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="country"
                placeholder="Country"
                style={{ textTransform: "capitalize" }}
                value={this.state.country}
                onChange={this.setCountry}
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

            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.address_line_1 : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateAddressTable;
