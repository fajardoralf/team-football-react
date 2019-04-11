import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: "",
      score: "",
      result: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        team_id: this.state.team_id,
        score: this.state.score,
        result: this.state.result
      })
    this.setState({
        team_id: "",
        score: "",
        result: ""
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
    let title = "Create Result"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createResultForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control
                type="team_id"
                placeholder="Team ID"
                value={this.state.team_id}
                onChange={this.setTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createResultForm">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="score"
                placeholder="Score"
                value={this.state.score}
                onChange={this.setScore.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createResultForm">
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
                Create
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateResultTable;