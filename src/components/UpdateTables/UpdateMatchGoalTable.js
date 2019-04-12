import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchgoal/";

class UpdateMatchGoalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalId: "",
      playerId: "",
      goalTypeId: "",
      matchId: "",
      description: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL + this.state.goalId, {
        goal_id: this.state.goalId,
        player_id: this.state.playerId,
        goal_type_id: this.state.goalTypeId,
        match_id: this.state.matchId,
        description: this.state.description,
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
      goalId: "",
      playerId: "",
      goalTypeId: "",
      matchId: "",
      description: ""
    });
  }

  setGoalId(event) {
    this.setState({ 
      goalId: event.target.value
    });
  }

  setPlayerId(event) {
    this.setState({ 
      playerId: event.target.value
    });
  }

  setGoalTypeId(event) {
    this.setState({ 
      goalTypeId: event.target.value
    });
  }

  setMatchId(event) {
      this.setState({
          matchId: event.target.value
      })
  }

  setDescription(event) {
      this.setState({
          description: event.target.value
      })
  }

  render() {
    let title = "Update Match Goal"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Goal ID</Form.Label>
              <Form.Control
                type="goalId"
                placeholder="Goal ID"
                value={this.state.goalId}
                onChange={this.setGoalId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Player ID</Form.Label>
              <Form.Control
                type="playerId"
                placeholder="Player ID"
                value={this.state.playerId}
                onChange={this.setPlayerId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Goal Type ID</Form.Label>
              <Form.Control
                type="goalTypeId"
                placeholder="Goal Type ID"
                value={this.state.goalTypeId}
                onChange={this.setGoalTypeId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Match ID</Form.Label>
              <Form.Control
                type="matchId"
                placeholder="Match ID"
                value={this.state.matchId}
                onChange={this.setMatchId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.setDescription.bind(this)}
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
                {this.state.submitted ? this.state.description : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateMatchGoalTable;