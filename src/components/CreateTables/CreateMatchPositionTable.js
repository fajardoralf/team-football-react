import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchposition/";
const matchURL = "https://team-football-api.herokuapp.com/match/";
const playerURL = "https://team-football-api.herokuapp.com/player/";
const matchpositionURL =
  "https://team-football-api.herokuapp.com/matchposition/";
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
            team_id: data.team_id
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
        this.setState({ match_id: res.data[0].match_id });
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

  handleForm(event) {
    event.preventDefault();

    axios.post(URL, {
      player_id: this.state.player_id,
      match_id: this.state.match_id,
      position: this.state.position
    });
    this.setState({
      player_id: "",
      match_id: "",
      position: ""
    });
  }

  setPlayer_id = event => {
    this.setState({
      player_id: event.target.value
    });
  };

  setMatch_id = event => {
    this.setState({
      match_id: event.target.value
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
    this.setState({ position: this.state.positionName[0].value });
  }

  render() {
    let title = "Create Match-Position";
    const { player, match, match_id, positionName } = this.state;

    const filteredPlayer = player
      .filter(p => {
        let m = this.getMatchById(match_id)
        return p.team_id === m.home_team_id || p.team_id === m.away_team_id
      })

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
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
              <Form.Control onChange={this.setMatchId} as="select">
                {match.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.date}
                    </option>
                  );
                })}
              </Form.Control>
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
