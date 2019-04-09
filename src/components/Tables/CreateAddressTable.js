import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateAddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      postalCode: "",
      city: "",
      country: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        addressLine1: this.state.addressLine1,
        addressLine2: this.state.addressLine2,
        addressLine3: this.state.addressLine3,
        postalCode: this.state.postalCode,
        city: this.state.city,
        country: this.state.country
      })
    this.setState({
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        postalCode: "",
        city: "",
        country: ""
    });
  }

  setAddressLine1(event) {
    this.setState({ 
      addressLine1: event.target.value
    });
  }

  setAddressLine2(event) {
    this.setState({ 
      addressLine2: event.target.value
    });
  }

  setAddressLine3(event) {
    this.setState({ 
      addressLine3: event.target.value
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

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create Address"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createAddressForm">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="addressLine1"
                placeholder="Address Line 1"
                value={this.state.addressLine1}
                onChange={this.setAddressLine1.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="addressLine2"
                placeholder="Address Line 2"
                value={this.state.addressLine2}
                onChange={this.setAddressLine2.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
              <Form.Label>Address Line 3</Form.Label>
              <Form.Control
                type="addressLine3"
                placeholder="Address Line 3"
                value={this.state.addressLine3}
                onChange={this.setAddressLine3.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="postalCode"
                placeholder="Postal Code"
                value={this.state.postalCode}
                onChange={this.setPostalCode.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                placeholder="City"
                value={this.state.city}
                onChange={this.setCity.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createAddressForm">
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
                Create
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateAddressTable;