import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateTeamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      associationId: "",
      coachId: "",
      ownerId: "",
      locationId: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        associationId: this.state.associationId,
        coachId: this.state.coachId,
        ownerId: this.state.ownerId,
        locationId: this.state.locationId
      })
    this.setState({
      associationId: "",
      coachId: "",
      ownerId: "",
      locationId: ""
    });
  }

  setAssociationId(event) {
    this.setState({ 
      associationId: event.target.value
    });
  }

  setCoachId(event) {
    this.setState({
      coachId: event.target.value
    });
  }
  setOwnerId(event) {
    this.setState({
      ownerId: event.target.value
    });
  }
  setLocationId(event) {
    this.setState({ 
      locationId: event.target.value
    });
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create team"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createTeamForm">
              <Form.Label>Association ID</Form.Label>
              <Form.Control
                type="associationId"
                placeholder="Association ID"
                value={this.state.associationId}
                onChange={this.setAssociationId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>Coach ID</Form.Label>
              <Form.Control
                type="coachId"
                placeholder="Coach ID"
                value={this.state.coachId}
                onChange={this.setCoachId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>Owner ID</Form.Label>
              <Form.Control
                type="ownerId"
                placeholder="Owner ID"
                value={this.state.ownerId}
                onChange={this.setOwnerId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPersonForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="locationId"
                placeholder="location ID"
                value={this.state.locationId}
                onChange={this.setLocationId.bind(this)}
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

export default CreateTeamTable;