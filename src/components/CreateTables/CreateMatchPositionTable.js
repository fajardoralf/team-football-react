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
      message: "",
      submitted: false
    };
  }

  fetchPlayer = () => {
    axios
      .get(playerURL, {
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ player_id: res.data[0].player_id });
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

  fetchMatch = () => {
    axios
      .get(matchURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        console.log(res.data[0].match_id);
        this.setState({
          position: this.state.positionName[0].value,
          match_id: res.data[0].match_id,
          home_team: res.data[0].home_team.team_name,
          home_team_id: res.data[0].home_team.team_id,
          away_team: res.data[0].away_team.team_name,
          away_team_id: res.data[0].away_team.team_id
        });
        let data = res.data.map(data => {
          return {
            key: data.match_id,
            date: data.match_date,
            home_team: data.home_team.team_name,
            home_team_id: data.home_team_id,
            away_team: data.away_team.team_name,
            away_team_id: data.away_team_id
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
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  setPlayer_id = event => {
    console.log(event.target.value);
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
      )
    });
  };

  setPosition = event => {
    this.setState({
      position: event.target.value
    });
  };

  getMatchById = id => {
    for (let m of this.state.match){
      if (id === m.key) return m
    }
  }

  componentDidMount() {
    this.fetchMatch();
    this.fetchPlayer();
  }

  render() {
    let title = "Create Match-Position";
    const { player, match, match_id, positionName, home_team, away_team } = this.state;

    const filteredPlayer = player
      .filter(p => {
        let m = this.getMatchById(match_id)
        return p.team_id === m.home_team_id || p.team_id === m.away_team_id
      })

    return (
      <Card bg="light" text="black" style={{ width: "30rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="createMatchPositionForm">
              <Form.Label>Player</Form.Label>
              <Form.Control onChange={this.setPlayerId} as="select">
                {filteredPlayer.map(data => {
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
                    >
                      {data.date}
                    </option>
                  );
                })}
              </Form.Control>

              {home_team + " vs " + away_team}
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

              <div className="text-center">
                {this.state.message}
                {this.state.submitted ? this.state.position : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateMatchPositionTable;
