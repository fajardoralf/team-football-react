import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/location/";
const addressURL = "https://team-football-api.herokuapp.com/address/";

class CreateLocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      addressId: "",
      name: "",
      description: "",
      message: "",
      submitted: false
    };
  }

  fetchAddress = () => {
    axios
      .get(addressURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          address_id: res.data[0].address_id
        });
        let data = res.data.map(data => {
          return {
            key: data.address_id,
            address_name: data.address_line_1,
            postalcode: data.postal_code,
            city: data.city,
            country: data.country
          };
        });
        this.setState({
          address: data
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleForm(event) {
    event.preventDefault();

    axios
      .post(
        URL,
        {
          address_id: this.state.addressId,
          name: this.state.name,
          description: this.state.description
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
      name: "",
      description: ""
    });
  }

  setAddressId = event => {
    this.setState({
      addressId: event.target.value
    });
  };

  setName = event => {
    this.setState({
      name: event.target.value
    });
  };

  setDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  componentDidMount() {
    this.fetchAddress();
  }

  render() {
    let title = "Create Location";
    const { address } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "30rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createLocationForm">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={this.setAddressId} as="select">
                {address.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.address_name +
                        ", " +
                        data.postalcode +
                        ", " +
                        data.city +
                        ", " +
                        data.country}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createLocationForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.setName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createLocationForm">
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
                Create
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

export default CreateLocationTable;
