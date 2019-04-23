import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/result/";
const resultURL = "https://team-football-api.herokuapp.com/result"
const teamURL = "https://team-football-api.herokuapp.com/team";
const matchURL = "https://team-football-api.herokuapp.com/match";

class UpdateResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [{}],
      matchId: "",
      new_match_id: "",
      team_id: "",
      score: "",
      result: "",
      results: [],
      result_id: 1,
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(URL + this.state.result_id, {
        result_id: this.state.result_id,
        match_id: this.state.matchId,
        team_id: this.state.team_id,
        score: this.state.score,
        result: this.state.result,
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
      submitted: true
    });
  }

  setMatchId(event) {
    let r = this.getResult(parseInt(event.target.value), this.state.team_id)
    this.setState({
      matchId: parseInt(event.target.value),
      result_id: r.result_id,
      score: r.score,
      result: r.result
    });
    //this.setResultId()



  }

  setTeamId(event) {
    let r = this.getResult(this.state.matchId, parseInt(event.target.value))
    this.setState({
      team_id: parseInt(event.target.value),
      result_id: r.result_id,
      score: r.score,
      result: r.result
    });
    //this.setResultId()
  }

  setScore(event) {
    this.setState({
      score: parseInt(event.target.value)
    });
  }

  setResult(event) {
    this.setState({
      result: event.target.value
    })
  }

  setResultId = () => {
    for (let r of this.state.results) {
      if (r.match_id === this.state.matchId && r.team_id === this.state.team_id) {
        this.setState(
          {
            result_id: r.result_id,
            score: r.score,
            result: r.result
          }
        )
        return;
      }
    }
  }


  fetchResult = () => {
    axios
      .get(resultURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          results: res.data,
          result_id: res.data[0].result_id,
          matchId: res.data[0].match_id,
          team_id: res.data[0].team_id,
          score: res.data[0].score,
          result: res.data[0].result
        })
      })
  }

  /*fetchMatch = () => {
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
            match_date: res.data.match_date
          });
          return {
            key: data.match_id,
            value: data.match_id,
            text: data.match_date,
            home_team_id: data.home_team_id,
            away_team_id: data.away_team_id
          };
        });
        this.setState({ 
          matches: data,
          matchId: res.data[0].match_id,
          team_id: res.data[0].home_team_id
         });
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
            team_name: res.data.team_name
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
  }; */

  componentDidMount() {
    this.fetchResult()
  }

  getMatch = (id, matches) => {
    for (let m of matches) {
      if (m.match_id === id) return m
    }
    return { home_team: '', away_team: '' }
  }

  getResult = (match, team) => {
    for (let r of this.state.results) {
      if (r.match_id === match && r.team_id === team) return r
    }
    return {}
  }

  render() {
    let title = "Update Result"
    const { results, matchId, team_id } = this.state;

    const matches = results.map(r => r.match)
    const match = this.getMatch(matchId, matches)
    const teams = [match.home_team, match.away_team]

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateResultForm">
              <Form.Label>Match ID</Form.Label>
              <Form.Control
                value={matchId}
                onChange={this.setMatchId.bind(this)} as="select">
                {matches.map((data, index) => {
                  return (
                    <option
                      key={index}
                      value={data.match_id}
                      match_date={data.match_date}
                      onChange={this.setMatchId.bind(this)}
                    >
                      {data.match_date + " " + data.home_team.team_name + " : " + data.away_team.team_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control
                value={team_id}
                onChange={this.setTeamId.bind(this)} as="select">
                {teams.map(data => {
                  return (
                    <option
                      key={data.team_id}
                      value={data.team_id}
                      team_name={data.team_name}
                    >
                      {data.team_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateResultForm">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
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
                {this.state.submitted ? "Updated match" : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateResultTable;
