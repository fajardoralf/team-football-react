import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchgoal/";

const matchURL = "https://team-football-api.herokuapp.com/match/";
const playerURL = "https://team-football-api.herokuapp.com/player/";
const goalTypeURL = "https://team-football-api.herokuapp.com/goaltype/";

let matchGoalURL = "https://team-football-api.herokuapp.com/matchgoal/";

class UpdateMatchGoalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [],
      match: [],
      goalType: [],
      matchGoal: [],
      playerId: "",
      goalTypeId: "",
      matchId: 0,
      matchGoalId: 0,
      description: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(
        URL + this.state.goalId,
        {
          goal_id: this.state.goalId,
          player_id: this.state.playerId,
          goal_type_id: this.state.goalTypeId,
          match_id: this.state.matchId,
          description:
            this.state.description !== ""
              ? this.state.new_description
              : this.state.description,
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
      playerId: "",
      goalTypeId: "",
      matchId: "",
      matchGoalId: "",
      description: ""
    });
  }

  setGoalId = event => {
    this.setState({
      goalId: event.target.value
    });
  };

  setPlayerId = event => {
    this.setState({
      playerId: event.target.value
    });
  };

  setGoalTypeId = event => {
    this.setState({
      goalTypeId: event.target.value
    });
  };

  setMatchId = event => {
    this.setState({
      matchId: event.target.value
    });
  };

  setMatchGoalId = event => {
    this.setState({
      matchGoalId: event.target.value
    });
  };

  setDescription = event => {
    this.setState({
      new_description: event.target.value
    });
  };

  //fetchMatch = () => {}
  fetchMatch = () => {
    axios
      .get(matchURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ matchId: res.data[0].match_id });
        let data = res.data.map(data => {
          return {
            key: data.match_id,
            date: data.match_date,
            home_team: data.home_team.team_name,
            away_team: data.away_team.team_name
          };
        });
        this.setState({ match: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchMatchGoal = () => {
    axios
      .get(matchGoalURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ matchGoalId: res.data[0].match_goal_id });
        let data = res.data.map(data => {
          return {
            key: data.match_goal_id,
            foreginkey: data.match_id,
            description: data.description
          };
        });
        this.setState({ matchGoal: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  //fetchGoalType = () => {}
  fetchGoalType = () => {
    axios
      .get(goalTypeURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        console.log(res);
        let data = res.data.map(data => {
          return {
            key: data.goal_type_id,
            type: data.type
          };
        });
        this.setState({
          goalType: data
        });
      });
  };
  //fetchPlayer = () => {}
  fetchPlayer = () => {
    axios
      .get(playerURL, {
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            key: data.player_id,
            first_name: data.person.first_name,
            last_name: data.person.last_name
          };
        });
        this.setState({ player: data });
      });
  };

  componentDidMount() {
    this.fetchMatch();
    this.fetchGoalType();
    this.fetchPlayer();
    this.fetchMatchGoal();
  }

  render() {
    const title = "Update Match Goal";

    const { match, goalType, player, matchId, matchGoal } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Match</Form.Label>
              <Form.Control
                value={matchId}
                onChange={this.setMatchId}
                as="select"
              >
                {match.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.match_id}
                      date={data.match_date}
                      home_team={data.home_team.team_name}
                      away_team={data.away_team.team_name}
                    >
                      {data.date +
                        "-" +
                        data.home_team +
                        " Vs. " +
                        data.away_team}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Player</Form.Label>
              <Form.Control onChange={this.setPlayerId} as="select">
                {player.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      first_name={data.first_name}
                      last_name={data.last_name}
                    >
                      {data.first_name + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Goal Type</Form.Label>
              <Form.Control onChange={this.setGoalTypeId} as="select">
                {goalType.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.type}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateMatchGoalForm">
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={this.setDescription} as="select">
                {matchGoal.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.description}
                    </option>
                  );
                })}
              </Form.Control>
              {this.state.description}
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
