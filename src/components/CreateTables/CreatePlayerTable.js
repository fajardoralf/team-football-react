import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/player";

class CreatePlayerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person_id: "",
      team_id: "",
      normal_position: "",
      number: "",
      message: "",
      submitted: false
    };
  }

  handleForm = event => {
    event.preventDefault();

    axios
      .post(
        URL,
        {
          person_id: this.state.person_id,
          team_id: this.state.team_id,
          normal_position: this.state.normal_position,
          number: this.state.number,
          message: "Successfully created ",
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
      person_id: "",
      team_id: "",
      normal_position: "",
      number: ""
    });
  };

  setPerson_id(event) {
    this.setState({
      person_id: event.target.value
    });
  }

  setTeam_id(event) {
    this.setState({
      team_id: event.target.value
    });
  }
  setNormal_position(event) {
    this.setState({
      normal_position: event.target.value
    });
  }
  setNumber(event) {
    this.setState({
      number: event.target.value
    });
  }

  render() {
    let title = "Create Player";

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="addPlayerForm">
              <Form.Label>Person ID</Form.Label>
              <Form.Control
                type="person_id"
                placeholder="Person ID"
                value={this.state.person_id}
                onChange={this.setPerson_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPlayerForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control
                type="team_id"
                placeholder="Team ID"
                value={this.state.team_id}
                onChange={this.setTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPlayerForm">
              <Form.Label>Normal Position</Form.Label>
              <Form.Control
                type="normal_position"
                placeholder="Normal Position"
                value={this.state.normal_position}
                onChange={this.setNormal_position.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addPlayerForm">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number"
                value={this.state.number}
                onChange={this.setNumber.bind(this)}
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
                {this.state.submitted ? this.state.number : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreatePlayerTable;