import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchgoal/";

const playerURL = "https://team-football-api.herokuapp.com/player/";
const goalTypeURL = "https://team-football-api.herokuapp.com/goaltype/";
const matchURL = "https://team-football-api.herokuapp.com/match/";

class CreateMatchGoalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [],
      goalType: [],
      match: [],
      filtered_player: [],
      player_team_id: "",
      playerId: "",
      goalTypeId: "",
      matchId: "",
      home_team: "",
      home_team_id: 0,
      away_team: "",
      away_team_id: 0,
      description: "",
      date: ""
    };
  }

  fetchPlayer = () => {
    axios
      .get(playerURL, {
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ playerId: res.data[0].player_id });
        let data = res.data.map(data => {
          return {
            key: data.player_id,
            first_name: data.person.first_name,
            last_name: data.person.last_name,
            team_id: data.team_id,
            team_name: data.team.team_name
          };
        });
        this.setState({ player: data });
      });
  };

  fetchGoalType = () => {
    axios
      .get(goalTypeURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        this.setState({ goalTypeId: res.data[0].goal_type_id });
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

  fetchMatch = () => {
    axios
      .get(matchURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        this.setState({
          matchId: res.data[0].match_id,
          home_team_id: res.data[0].home_team.team_id,
          away_team_id: res.data[0].away_team.team_id,
          home_team: res.data[0].home_team.team_name,
          away_team: res.data[0].away_team.team_name,
          date: res.data[0].match_date
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

  handleForm = event => {
    event.preventDefault();

    axios
      .post(
        URL,
        {
          player_id: this.state.playerId,
          goal_type_id: this.state.goalTypeId,
          match_id: this.state.matchId,
          description: this.state.description
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      )
      .then(res => {
        console.log("response: ", res);
        this.setState({
          submitted: true,
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          submitted: false,
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      playerId: "",
      goalTypeId: "",
      matchId: "",
      description: ""
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
      ),
      home_team: event.target.selectedOptions[0].getAttribute("home_team"),
      away_team: event.target.selectedOptions[0].getAttribute("away_team")
    });
  };

  setDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  componentDidMount() {
    this.fetchPlayer();
    this.fetchGoalType();
    this.fetchMatch();
  }

  render() {
    let title = "Create Match Goal";
    const {
      player,
      goalType,
      match,
      home_team_id,
      away_team_id,
      date
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createMatchGoalForm">
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
                        {data.first_name +
                          " " +
                          data.last_name +
                          " (" +
                          data.team_name +
                          ") "}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createMatchGoalForm">
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

            <Form.Group controlId="createMatchGoalForm">
              <Form.Label>Match</Form.Label>
              <Form.Control onChange={this.setMatchId} as="select">
                {match.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      home_team={data.home_team}
                      away_team={data.away_team}
                      home_team_id={data.home_team_id}
                      away_team_id={data.away_team_id}
                    >
                      {data.home_team + " vs " + data.away_team}
                    </option>
                  );
                })}
              </Form.Control>
              {"Date: " + new Date(date).toLocaleDateString()}
            </Form.Group>

            <Form.Group controlId="createMatchGoalForm">
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
                Create
              </Button>
            </div>

            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.description : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateMatchGoalTable;
