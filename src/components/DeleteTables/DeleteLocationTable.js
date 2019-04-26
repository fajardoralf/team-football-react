import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/location/";

class DeleteLocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      locationName: "",
      id: "",
      message: "",
      submitted: false,
      mounted: true
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState(
        {
          message: "Successfully deleted ",
          contactName: this.state.locationName,
          submitted: true
        },
        this.fetchLocation()
      );
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      goalType: event.target.selectedOptions[0].text,
      message: "",
      submitted: false
    });
  };

  fetchLocation = () => {
    if (this.state.mounted) {
      axios
        .get(URL, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          let data = res.data.map(data => {
            return {
              key: data.location_id,
              value: data.location_id,
              text: data.name
            };
          });
          this.setState({ locations: data });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentDidMount() {
    this.fetchLocation();
  }

  render() {
    let title = "Delete Location";
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Location</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.locations.map(data => {
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

            <div className="text-center">{this.state.message}</div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteLocationTable;
