import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/address/";

class DeleteAddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      addressName: "",
      id: "",
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
    this.setState({
      id: event.target.value,
      addressName: event.target.selectedOptions[0].text
    });
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

  componentDidMount() {
    this.fetchAddress();
  }

  componentWillUnmount() {}

  render() {
    let title = "Delete Address";
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
