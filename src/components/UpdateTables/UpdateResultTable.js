import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/result/";

class UpdateResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchId: "",
      team_id: "",
      score: "",
      result: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        match_id: this.state.matchId,
        team_id: this.state.team_id,
        score: this.state.score,
        result: this.state.result,
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
        match_id: "",
        team_id: "",
        score: "",
        result: ""
    });
  }

  setMatchId(event) {
    this.setState({ 
        matchId: event.target.value
    });
  }

  setTeam_id(event) {
    this.setState({ 
        team_id: event.target.value
    });
  }

  setScore(event) {
    this.setState({ 
        score: event.target.value
    });
  }

  setResult(event) {
      this.setState({
          result: event.target.value
      })
  }

  render() {
    let title = "Update Result"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Match ID</Form.Label>
              <Form.Control
                type="matchId"
                placeholder="Match ID"
                value={this.state.matchId}
                onChange={this.setMatchId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control
                type="team_id"
                placeholder="Team ID"
                value={this.state.team_id}
                onChange={this.setTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="score"
                placeholder="Score"
                value={this.state.score}
                onChange={this.setScore.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Result</Form.Label>
              <Form.Control
                type="result"
                placeholder="Result"
                value={this.state.result}
                onChange={this.setResult.bind(this)}
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
                {this.state.submitted ? this.state.matchId : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateResultTable;