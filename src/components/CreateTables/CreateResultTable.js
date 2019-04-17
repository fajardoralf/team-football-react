import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/result/";
const teamURL = "https://team-football-api.herokuapp.com/team"

class CreateResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
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
        team_id: this.state.team_id,
        score: this.state.score,
        result: this.state.result,
        message: "Successfully created ",
        submitted: true
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

  fetchTeam = () => {
    axios
      .get(teamURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            team_name: res.data.team_name,
          });
          return {
            key: data.team_id,
            value: data.team_id,
            text: data.team_name,
          };
        });
        this.setState({ teams: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleTeamId = event => {
    this.setState({
      teamID: event.target.value,

    });
  };

  componentDidMount() {
    this.fetchTeam();
  }

  render() {
    let title = "Create Result"
    const { teams } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createResultForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control onChange={this.handleTeamId} as="select">
              {teams.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      team_name={data.team_name}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
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

              <div className="text-center">
                {this.state.message}
                {this.state.submitted ? this.state.address_line_1 : ""}
              </div>
              
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateResultTable;