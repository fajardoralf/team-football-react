import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchgoal/";

const matchURL = "https://team-football-api.herokuapp.com/match/";
const playerURL = "https://team-football-api.herokuapp.com/player/";
const goalTypeURL = "https://team-football-api.herokuapp.com/goaltype/";

const matchGoalURL = "https://team-football-api.herokuapp.com/matchgoal/";

class UpdateMatchGoalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [],
      match: [],
      goalType: [],
      matchGoal: [],
      playerId: "",
      home_team_id: 1,
      away_team_id: 2,
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
              : this.state.description
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
      matchId: event.target.value,
      home_team_id: +event.target.selectedOptions[0].getAttribute(
        "home_team_id"
      ),
      away_team_id: +event.target.selectedOptions[0].getAttribute(
        "away_team_id"
      )
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

  fetchMatch = () => {
    axios
      .get(matchURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          matchId: res.data[0].match_id,
          home_team_id: res.data[0].home_team.team_id,
          away_team_id: res.data[0].away_team.team_id
        });

        let data = res.data.map(data => {
          return {
            key: data.match_id,
            date: data.match_date,
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
            key: data.goal_id,
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
            last_name: data.person.last_name,
            team_id: data.team_id
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

    const {
      match,
      goalType,
      player,
      matchId,
      matchGoal,
      home_team_id,
      away_team_id
    } = this.state;

    console.log(match);

    return (
      <Card bg="light" text="black" style={{ width: "30rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
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
                      home_team_id={data.home_team_id}
                      away_team={data.away_team.team_name}
                      away_team_id={data.away_team_id}
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
                {player
                  .filter(
                    player =>
                      player.team_id === home_team_id ||
                      player.team_id === away_team_id
                  )
                  .map(data => {
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
