import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/address/";

class UpdateAddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      addressId: 1,
      addressLine1: "",
      new_address: "",
      postalcode: "",
      new_postalCode: "",
      city: "",
      new_city: "",
      country: "",
      new_country: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(
        URL + this.state.addressId,
        {
          address_id: this.state.addressId,
          address_line_1:
            this.state.new_address !== ""
              ? this.state.new_address
              : this.state.addressLine1,
          postal_code:
            this.state.new_postalCode !== ""
              ? this.state.new_postalCode
              : this.state.postalcode,
          city:
            this.state.new_city !== "" ? this.state.new_city : this.state.city,
          country:
            this.state.new_country !== ""
              ? this.state.new_country
              : this.state.country
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          }
        }
      )
      .then(res => {
        console.log("response: ", res);
        this.setState({
          message: "Successfully Updated"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
  }

  fetchAddress = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            addressLine1: res.data[0].address_line_1,
            postalcode: res.data[0].postal_code,
            city: res.data[0].city,
            country: res.data[0].country
          });
          return {
            key: data.address_id,
            value: data.address_id,
            text: data.address_line_1,
            postalcode: data.postal_code,
            city: data.city,
            country: data.country
          };
        });
        this.setState({ address: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleAddressId = event => {
    this.setState({
      addressId: event.target.value,
      addressLine1: event.target.selectedOptions[0].text,
      postalcode: event.target.selectedOptions[0].getAttribute("postalCode"),
      city: event.target.selectedOptions[0].getAttribute("city"),
      country: event.target.selectedOptions[0].getAttribute("country")
    });
  };

  setAddressLine1 = event => {
    this.setState({
      new_address: event.target.value
    });
  };

  setPostalCode = event => {
    this.setState({
      new_postalCode: event.target.value
    });
  };

  setCity = event => {
    this.setState({
      new_city: event.target.value
    });
  };

  setCountry = event => {
    this.setState({
      new_country: event.target.value
    });
  };

  componentDidMount() {
    this.fetchAddress();
  }

  render() {
    const title = "Update Address";
    const { address } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateAddressForm">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={this.handleAddressId} as="select">
                {address.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      postalcode={data.postalcode}
                      city={data.city}
                      country={data.country}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="addressLine1"
                style={{ textTransform: "capitalize" }}
                placeholder={this.state.addressLine1}
                value={this.state.new_address}
                onChange={this.setAddressLine1}
              />
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="number"
                placeholder={this.state.postalcode}
                value={this.state.new_postalCode}
                onChange={this.setPostalCode}
              />
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                style={{ textTransform: "capitalize" }}
                placeholder={this.state.city}
                value={this.state.new_city}
                onChange={this.setCity}
              />
            </Form.Group>

            <Form.Group controlId="updateAddressForm">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="country"
                style={{ textTransform: "capitalize" }}
                placeholder={this.state.country}
                value={this.state.new_country}
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
                Update
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

export default UpdateAddressTable;
