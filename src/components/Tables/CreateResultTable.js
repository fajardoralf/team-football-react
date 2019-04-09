import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: "",
      score: "",
      result: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        teamId: this.state.teamId,
        score: this.state.score,
        result: this.state.result
      })
    this.setState({
        teamId: "",
        score: "",
        result: ""
    });
  }

  setTeamId(event) {
    this.setState({ 
        teamId: event.target.value
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

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
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
                type="teamId"
                placeholder="Team ID"
                value={this.state.teamId}
                onChange={this.setTeamId.bind(this)}
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