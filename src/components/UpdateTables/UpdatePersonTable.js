import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/person/";

const addressURL = "https://team-football-api.herokuapp.com/address/";

class UpdatePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: [],
      address: [],
      addressess: [],
      person_id: 1,
      address_id: 1,
      new_address_id: 1,
      address_line_1: "",
      firstName: "",
      new_firstName: "",
      lastName: "",
      new_lastName: "",
      dateOfBirth: "",
      new_dateOfBirth: "",
      message: "",
      submitted: false
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios
      .put(
        URL + this.state.person_id,
        {
          person_id: this.state.person_id,
          address_id:
            this.state.new_address_id !== ""
              ? this.state.new_address_id
              : this.state.address_id,
          first_name:
            this.state.new_firstName !== ""
              ? this.state.new_firstName
              : this.state.firstName,
          last_name:
            this.state.new_lastName !== ""
              ? this.state.new_lastName
              : this.state.lastName,
          date_of_birth:
            this.state.new_dateOfBirth !== ""
              ? this.state.new_dateOfBirth
              : this.state.dateOfBirth
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
          message: "Successfully Updated"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
  };

  handlePersonId = event => {
    this.setState(
      {
        person_id: event.target.value,
        address_id: event.target.selectedOptions[0].getAttribute("address_id"),
        firstName: event.target.selectedOptions[0].getAttribute("first_name"),
        lastName: event.target.selectedOptions[0].getAttribute("last_name"),
        dateOfBirth: event.target.selectedOptions[0].getAttribute(
          "date_of_birth"
        )
      },
      this.fetchAddress
    );
  };

  setAddressId = event => {
    this.setState({ address_id: event.target.value });
  };

  setNewAddress = event => {
    console.log(event.target.value);
    this.setState({ new_address_id: event.target.value });
  };

  setFirstName = event => {
    this.setState({
      new_firstName: event.target.value
    });
  };

  setLastName = event => {
    this.setState({ new_lastName: event.target.value });
  };

  setDateOfBirth = event => {
    console.log(event.target.value);
    this.setState({ new_dateOfBirth: event.target.value });
  };

  fetchPersons = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          person_id: res.data[0].person_id,
          address_id: res.data[0].address_id,
          firstName: res.data[0].first_name,
          lastName: res.data[0].last_name,
          dateOfBirth: res.data[0].date_of_birth
        });
        let data = res.data.map(data => {
          return {
            key: data.person_id,
            value: data.person_id,
            address_id: data.address_id,
            first_name: data.first_name,
            last_name: data.last_name,
            birth: data.date_of_birth
          };
        });
        this.setState({ person: data }, this.fetchAddress);
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchAddress = () => {
    axios
      .get(addressURL + this.state.address_id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          address_id: res.data.address_id,
          address_line_1: res.data.address_line_1
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchAddressess = () => {
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
            address_line_1: data.address_line_1
          };
        });
        this.setState({
          addressess: data
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  componentDidMount() {
    this.fetchPersons();
    this.fetchAddress();
    this.fetchAddressess();
  }

  render() {
    const title = "Update Person";

    const { person, address_line_1, address_id, addressess } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="updatePersonForm">
              <Form.Label>Person</Form.Label>
              <Form.Control onChange={this.handlePersonId} as="select">
                {person.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      address_id={data.address_id}
                      first_name={data.first_name}
                      last_name={data.last_name}
                      date_of_birth={data.birth}
                    >
                      {data.first_name + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updatePersonForm">
              <Form.Label>Current Address</Form.Label>
              <Form.Control onChange={this.setAddressId} as="select">
                <option key={address_id} value={address_id}>
                  {address_line_1}
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updatePersonForm">
              <Form.Label>Change to</Form.Label>
              <Form.Control onChange={this.setNewAddress} as="select">
                {addressess.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.address_line_1}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="udpatePersonForm">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                style={{ textTransform: "capitalize" }}
                placeholder={this.state.firstName}
                value={this.state.new_firstName}
                onChange={this.setFirstName}
              />
            </Form.Group>

            <Form.Group controlId="updatePersonForm">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                style={{ textTransform: "capitalize" }}
                placeholder={this.state.lastName}
                value={this.state.new_lastName}
                onChange={this.setLastName}
              />
            </Form.Group>

            <Form.Group controlId="updatePersonForm">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" onChange={this.setDateOfBirth} />

              <h6>{"Current date of birth: " + this.state.dateOfBirth}</h6>
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
              {this.state.submitted ? this.state.firstName : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdatePersonTable;
