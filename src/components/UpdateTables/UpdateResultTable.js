import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/result/";
const teamURL = "https://team-football-api.herokuapp.com/team";
const matchURL = "https://team-football-api.herokuapp.com/match";

class UpdateResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      teams: [],
      matchId: "",
      new_match_id: "",
      team_id: "",
      new_team_id: "",
      score: "",
      new_score: "",
      result: "",
      new_result: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(URL + matchURL, {
        match_id: this.state.matchId,
        team_id: 
                this.state.new_team_id !== ""
                ? this.state.new_team_id
                : this.state.team_id,
        score: 
              this.state.new_score !== ""
              ? this.state.new_score
              : this.state.score,
        result: 
              this.state.new_result !== ""
              ? this.state.new_result
              : this.state.result,
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
        new_match_id: event.target.value
    });
  }

  setTeam_id(event) {
    this.setState({ 
        new_team_id: event.target.value
    });
  }

  setScore(event) {
    this.setState({ 
        new_score: event.target.value
    });
  }

  setResult(event) {
      this.setState({
          new_result: event.target.value
      })
  }

  fetchMatch = () => {
    axios
      .get(matchURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            match_date: res.data.match_date,
          });
          return {
            key: data.match_id,
            value: data.match_id,
            text: data.match_date,
          };
        });
        this.setState({ matches: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

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
  handleMatchId = event => {
    this.setState({
      matchID: event.target.value,

    });
  };

  componentDidMount() {
    this.fetchTeam();
    this.fetchMatch();
  }

  render() {
    let title = "Update Result"
    const { teams } = this.state;
    const { matches } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Match ID</Form.Label>
              <Form.Control onChange={this.handleMatchId} as="select">
              {matches.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      match_date={data.match_date}
                      onChange={this.setMatchId.bind(this)}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control onChange={this.handleTeamId} as="select">
              {teams.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      team_name={data.team_name}
                      onChange={this.setTeam_id.bind(this)}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
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