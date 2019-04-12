import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/team/";

class UpdateTeamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: "",
      association_id: "",
      coach_id: "",
      owner_id: "",
      location_id: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL + this.state.team_id, {
        team_id: this.state.team_id,
        association_id: this.state.association_id,
        coach_id: this.state.coach_id,
        owner_id: this.state.owner_id,
        location_id: this.state.location_id,
        message: "Successfully Updated",
        submitted: true
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
      team_id: "",
      association_id: "",
      coach_id: "",
      owner_id: "",
      location_id: ""
    });
  }

  setTeam_id(event) {
    this.setState({ 
      team_id: event.target.value
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

  render() {
    let title = "Update Team"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="updateTeamForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control
                type="team_id"
                placeholder="Team ID"
                value={this.state.team_id}
                onChange={this.setTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateTeamForm">
              <Form.Label>Association ID</Form.Label>
              <Form.Control
                type="association_id"
                placeholder="Association ID"
                value={this.state.association_id}
                onChange={this.setAssociation_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateTeamForm">
              <Form.Label>Coach ID</Form.Label>
              <Form.Control
                type="coach_id"
                placeholder="Coach ID"
                value={this.state.coach_id}
                onChange={this.setCoach_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="udpateTeamForm">
              <Form.Label>Owner ID</Form.Label>
              <Form.Control
                type="owner_id"
                placeholder="Owner ID"
                value={this.state.owner_id}
                onChange={this.setOwner_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateTeamForm">
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
                Update
              </Button>

              <div className="text-center">
                {this.state.message}
                {this.state.submitted ? this.state.team_id : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateTeamTable;