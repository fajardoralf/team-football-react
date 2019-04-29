import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/result/";
const teamURL = "https://team-football-api.herokuapp.com/team";
const matchURL = "https://team-football-api.herokuapp.com/match";

class CreateResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      match: [],
      team_id: "",
      match_id: "",
      home_team_id: "",
      away_team_id: "",
      score: "",
      result: "",
      results: [
        { key: 1, value: "Win" },
        { key: 2, value: "Lose" },
        { key: 3, value: "Draw" }
      ],
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
        match_id: this.state.match_id
      })
      .then(res => {
        console.log(res);
        this.setState({
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios err", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
  }

  fetchTeam = () => {
    axios
      .get(teamURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            team_name: res.data.team_name,
            result: this.state.results[0].value
          });
          return {
            key: data.team_id,
            value: data.team_id,
            text: data.team_name
          };
        });
        this.setState({ teams: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchMatch = () => {
    axios
      .get(matchURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        this.setState({
          match_id: res.data[0].match_id,
          home_team_id: res.data[0].home_team.team_id,
          away_team_id: res.data[0].away_team.team_id
        });
        let data = res.data.map(data => {
          return {
            key: data.match_id,
            text: data.match_date,
            home_team: data.home_team.team_name,
            home_team_id: data.home_team.team_id,
            away_team: data.away_team.team_name,
            away_team_id: data.away_team.team_id
          };
        });
        this.setState({ match: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleTeamId = event => {
    console.log(event.target.value);
    this.setState(
      {
        team_id: event.target.value
      },
      this.fetchTeam()
    );
  };

  setScore = event => {
    this.setState({
      score: event.target.value
    });
  };

  setResult = event => {
    this.setState({
      result: event.target.value
    });
  };

  handleMatchId = event => {
    this.setState(
      {
        match_id: event.target.value,
        home_team_id: +event.target.selectedOptions[0].getAttribute(
          "home_team_id"
        ),
        away_team_id: +event.target.selectedOptions[0].getAttribute(
          "away_team_id"
        )
      },
      this.fetchTeam()
    );
  };

  componentDidMount() {
    this.fetchTeam();
    this.fetchMatch();
  }

  render() {
    let title = "Create Result";
    const { teams, results, match, home_team_id, away_team_id } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createResultForm">
              <Form.Label>Team</Form.Label>
              <Form.Control onChange={this.handleTeamId} as="select">
                {teams
                  .filter(
                    team =>
                      team.value === home_team_id || team.value === away_team_id
                  )
                  .map(data => {
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

            <Form.Label>Match</Form.Label>
            <Form.Control onChange={this.handleMatchId} as="select">
              {match.map(data => {
                return (
                  <option
                    key={data.key}
                    value={data.key}
                    home_team_id={data.home_team_id}
                    away_team_id={data.away_team_id}
                  >
                    {data.home_team + " vs " + data.away_team}
                  </option>
                );
              })}
            </Form.Control>

            <Form.Group controlId="createResultForm">
              <Form.Label>Score</Form.Label>
              <Form.Control type="number" onChange={this.setScore} />
            </Form.Group>

            <Form.Group controlId="createResultForm">
              <Form.Label>Result</Form.Label>
              <Form.Control as="select" onChange={this.setResult}>
                {results.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.value}
                    </option>
                  );
                })}
              </Form.Control>
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
            <br />

            <div className="text-center">{this.state.message}</div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateResultTable;
