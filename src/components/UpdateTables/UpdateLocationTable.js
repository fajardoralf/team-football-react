import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/location/";

const addressURL = "https://team-football-api.herokuapp.com/address/";
class UpdateLocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      address: [],
      address_line: "",
      postalCode: "",
      city: "",
      country: "",
      locationId: "",
      addressid: 14,
      new_address_id: "",
      name: "",
      new_name: "",
      description: "",
      new_description: "",
      message: "",
      submitted: false
    };
  }

  fetchLocation = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          
        }
      })
      .then(res => {
        this.setState({
          locationId: res.data[0].location_id,
          addressid: res.data[0].address_id,
          name: res.data[0].name,
          description: res.data[0].description
        });

        let data = res.data.map(data => {
          return {
            key: data.location_id,
            addressid: data.address_id,
            name: data.name,
            description: data.description
          };
        });
        this.setState({ location: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchAddressName = () => {
    axios
      .get(addressURL + this.state.addressid, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          
        }
      })
      .then(res => {
        this.setState({
          address_line: res.data.address_line_1,
          postalCode: res.data.postal_code,
          city: res.data.city,
          country: res.data.country
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchAddress = () => {
    axios
      .get(addressURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            key: data.address_id,
            address_line: data.address_line_1,
            postalCode: data.postal_code,
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
    const {
      addressid,
      new_address_id,
      new_name,
      name,
      new_description,
      description
    } = this.state;
    axios
      .put(
        URL + this.state.locationId,
        {
          location_id: this.state.locationId,
          address_id: new_address_id !== "" ? new_address_id : addressid,
          name: new_name !== "" ? new_name : name,
          description: new_description !== "" ? new_description : description
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
    this.setState({
      locationId: "",
      addressid: "",
      name: "",
      description: ""
    });
  }

  setLocationId = event => {
    this.setState(
      {
        locationId: event.target.value,
        addressid: event.target.selectedOptions[0].getAttribute("addressid"),
        name: event.target.selectedOptions[0].getAttribute("name"),
        description: event.target.selectedOptions[0].getAttribute("description")
      },
      this.fetchAddressName
    );
  };

  setaddressid = event => {
    this.setState({
      addressid: event.target.value
    });
  };

  setName = event => {
    this.setState({
      new_name: event.target.value
    });
  };

  setDescription = event => {
    this.setState({
      new_description: event.target.value
    });
  };

  componentDidMount() {
    this.fetchLocation();
    this.fetchAddressName();
    this.fetchAddress();
  }

  render() {
    let title = "Update Location";

    const {
      location,
      address,
      address_line,
      postalCode,
      city,
      country,
      new_name,
      name,
      new_description,
      description
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateLocationForm">
              <Form.Label>Location</Form.Label>
              <Form.Control onChange={this.setLocationId} as="select">
                {location.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      name={data.name}
                      description={data.description}
                      addressid={data.addressid}
                    >
                      {data.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Current Address</Form.Label>
              <h6>
                {address_line +
                  ", " +
                  postalCode +
                  ", " +
                  city +
                  ", " +
                  country}
              </h6>
            </Form.Group>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Change To</Form.Label>
              <Form.Control onChange={this.setaddressid} as="select">
                {address.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.address_line +
                        ", " +
                        data.postalCode +
                        ", " +
                        data.city +
                        ", " +
                        data.country}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder={name}
                style={{ textTransform: "capitalize" }}
                value={new_name}
                onChange={this.setName}
              />
            </Form.Group>

            <Form.Group controlId="updateLocationForm">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder={description}
                style={{ textTransform: "capitalize" }}
                value={new_description}
                onChange={this.setDescription}
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
              {this.state.submitted ? this.state.name : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateLocationTable;
