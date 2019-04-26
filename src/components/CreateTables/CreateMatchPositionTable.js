import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchposition/";
const matchURL = "https://team-football-api.herokuapp.com/match/";
const playerURL = "https://team-football-api.herokuapp.com/player/";

class CreateMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [],
      match: [],
      positionName: [
        { key: 1, value: "GoalKeeper" },
        { key: 2, value: "Defender" },
        { key: 3, value: "Midfielder" },
        { key: 4, value: "Forward" }
      ],
      player_id: "",
      match_id: "",
      home_team: "",
      home_team_id: "",
      away_team: "",
      away_team_id: "",
      position: "",
      date: "",
      message: "",
      submitted: false
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
        this.setState({ player_id: res.data[0].player_id });
        let data = res.data.map(data => {
          return {
            key: data.player_id,
            first_name: data.person.first_name,
            last_name: data.person.last_name,
            team_id: data.team.team_id,
            team_name: data.team.team_name
          };
        });
        this.setState({ player: data });
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
          position: this.state.positionName[0].value,
          match_id: res.data[0].match_id,
          home_team: res.data[0].home_team.team_name,
          home_team_id: res.data[0].home_team.team_id,
          away_team: res.data[0].away_team.team_name,
          away_team_id: res.data[0].away_team.team_id,
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
      .post(URL, {
        player_id: this.state.player_id,
        match_id: this.state.match_id,
        position: this.state.position
      })
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
  };

  setPlayer_id = event => {
    this.setState({
      player_id: event.target.value
    });
  };

  setMatch_id = event => {
    this.setState({
      match_id: event.target.value,
      home_team: event.target.selectedOptions[0].getAttribute("home_team"),
      home_team_id: +event.target.selectedOptions[0].getAttribute(
        "home_team_id"
      ),
      away_team: event.target.selectedOptions[0].getAttribute("away_team"),
      away_team_id: +event.target.selectedOptions[0].getAttribute(
        "away_team_id"
      ),
      date: event.target.selectedOptions[0].getAttribute("date")
    });
  };

  setPosition = event => {
    this.setState({
      position: event.target.value
    });
  };

  componentDidMount() {
    this.fetchMatch();
    this.fetchPlayer();
  }

  render() {
    let title = "Create Match-Position";
    const {
      player,
      match,
      positionName,

      home_team_id,

      away_team_id,
      date
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="createMatchPositionForm">
              <Form.Label>Player</Form.Label>
              <Form.Control onChange={this.setPlayer_id} as="select">
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

            <Form.Group controlId="createMatchPositionForm">
              <Form.Label>Match</Form.Label>
              <Form.Control onChange={this.setMatch_id} as="select">
                {match.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      home_team={data.home_team}
                      home_team_id={data.home_team_id}
                      away_team={data.away_team}
                      away_team_id={data.away_team_id}
                      date={data.date}
                    >
                      {data.home_team + " vs " + data.away_team}
                    </option>
                  );
                })}
              </Form.Control>
              {"Date: " + new Date(date).toLocaleDateString()}
            </Form.Group>

            <Form.Group controlId="createMatchPositionForm">
              <Form.Label>Position</Form.Label>
              <Form.Control onChange={this.setPosition} as="select">
                {positionName.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
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

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.position : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateMatchPositionTable;
