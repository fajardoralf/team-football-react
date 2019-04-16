import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/address/";
const personURL = "https://team-football-api.herokuapp.com/person/";

class DeleteAddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      address_id: "",

      addressName: "",
      first_name: "",
      last_name: "",
      id: 1,
      message: "",
      submitted: false
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState(
        {
          message: "Successfully deleted ",
          addressName: this.state.addressName,
          submitted: true
        },
        this.fetchAddress()
      );
    });
  };

  handleChange = event => {
    this.setState(
      {
        id: event.target.value,
        addressName: event.target.selectedOptions[0].text,
        address_id: event.target.selectedOptions[0].getAttribute("address_id")
      },
      this.fetchPerson
    );
  };

  fetchAddress = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            key: data.address_id,
            value: data.address_id,
            text: data.address_line_1
          };
        });
        this.setState({ address: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchPerson = () => {
    axios
      .get(personURL + this.state.id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          first_name: res.data.first_name,
          last_name: res.data.last_name
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  componentDidMount() {
    this.fetchAddress();
    this.fetchPerson();
  }

  componentWillUnmount() {}

  render() {
    let title = "Delete Address";
    const { first_name, last_name } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.address.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Label>Belongs to</Form.Label>
              <h6>{first_name + " " + last_name}</h6>
            </FormGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="dark" type="Submit">
                Delete
              </Button>
            </div>
            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.addressName : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteAddressTable;
