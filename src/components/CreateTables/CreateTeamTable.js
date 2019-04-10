import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateTeamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      association_id: "",
      coach_id: "",
      owner_id: "",
      location_id: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        association_id: this.state.association_id,
        coach_id: this.state.coach_id,
        owner_id: this.state.owner_id,
        location_id: this.state.location_id
      })
    this.setState({
      association_id: "",
      coach_id: "",
      owner_id: "",
      location_id: ""
    });
  }

  setAssociation_id(event) {
    this.setState({ 
      association_id: event.target.value
    });
  }

  setCoach_id(event) {
    this.setState({
      coach_id: event.target.value
    });
  }
  setOwner_id(event) {
    this.setState({
      owner_id: event.target.value
    });
  }
  setLocation_id(event) {
    this.setState({ 
      location_id: event.target.value
    });
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create Team"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createTeamForm">
              <Form.Label>Association ID</Form.Label>
              <Form.Control
                type="association_id"
                placeholder="Association ID"
                value={this.state.association_id}
                onChange={this.setAssociation_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createTeamForm">
              <Form.Label>Coach ID</Form.Label>
              <Form.Control
                type="coach_id"
                placeholder="Coach ID"
                value={this.state.coach_id}
                onChange={this.setCoach_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createTeamForm">
              <Form.Label>Owner ID</Form.Label>
              <Form.Control
                type="owner_id"
                placeholder="Owner ID"
                value={this.state.owner_id}
                onChange={this.setOwner_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createTeamForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="location_id"
                placeholder="location ID"
                value={this.state.location_id}
                onChange={this.setLocation_id.bind(this)}
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