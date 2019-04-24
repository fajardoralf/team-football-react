import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/person/";

const addressURL = "https://team-football-api.herokuapp.com/address/";

class CreatePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      address_id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
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

  handleForm = event => {
    event.preventDefault();
    axios
      .post(
        URL,
        {
          address_id: this.state.address_id,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          date_of_birth: this.state.dateOfBirth
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
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      address_id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    });
  };

  setAddressId = event => {
    console.log(event.target.value);
    this.setState({
      address_id: event.target.value
    });
  };

  setFirstName = event => {
    this.setState({
      firstName: event.target.value
    });
  };
  setLastName = event => {
    this.setState({
      lastName: event.target.value
    });
  };
  setDateOfBirth = event => {
    console.log(event.target.value);
    this.setState({
      dateOfBirth: event.target.value
    });
  };

  componentDidMount() {
    this.fetchAddress();
  }

  render() {
    let title = "Create Person";
    const { address } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="addPersonForm">
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

            <Form.Group controlId="addPersonForm">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="First Name"
                style={{ textTransform: "capitalize" }}
                value={this.state.firstName}
                onChange={this.setFirstName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Last Name"
                style={{ textTransform: "capitalize" }}
                value={this.state.lastName}
                onChange={this.setLastName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
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

            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.firstName : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreatePersonTable;
