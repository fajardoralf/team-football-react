import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchposition/";
const matchURL = "https://team-football-api.herokuapp.com/match/";

class UpdateMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_id: "",
      matchPosition: [],
      match: [],
      match_id: "",
      home_team_id: "",
      away_team_id: "",
      position: "",
      positions: [
        { key: 1, value: "Goalkeeper" },
        { key: 2, value: "Defender" },
        { key: 3, value: "Midfielder" },
        { key: 4, value: "Forward" }
      ],
      message: "",
      submitted: false
    };
  }

  handleForm = event => {
    event.preventDefault();

    axios
      .put(
        URL + this.state.player_id,
        {
          player_id: this.state.player_id,
          match_id: this.state.match_id,
          position: this.state.position
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
        this.setState({
          message: "Successfully Updated"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      player_id: "",
      match_id: "",
      position: ""
    });
  };

  fetchMatchPosition = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          matchPosition_id: res.data[0].matchPosition_id,
          player_id: res.data[0].player.player_id,
          team_id: res.data[0].player.team_id
        });
        let data = res.data.map(data => {
          return {
            key: data.player_id,
            value: data.player_id,
            position: data.position,
            team_name: data.player.team.team_name,
            team_id: data.player.team_id,
            first_name: data.player.person.first_name,
            last_name: data.player.person.last_name
          };
        });
        console.log(data);
        this.setState({ matchPosition: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
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
          match_id: res.data[0].match_id,
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

  setPlayer_id = event => {
    this.setState({
      player_id: event.target.value
    });
  };

  setMatch_id = event => {
    console.log(event.target.selectedOptions[0].getAttribute("away_team_id"));
    this.setState({
      match_id: event.target.value,
      home_team_id: +event.target.selectedOptions[0].getAttribute(
        "home_team_id"
      ),
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

  componentDidMount() {
    this.fetchMatchPosition();
    this.fetchMatch();
  }

  render() {
    let title = "Update Match-Position";

    const {
      matchPosition,
      match,
      positions,
      home_team_id,
      away_team_id
    } = this.state;

    console.log(matchPosition);

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateMatchPositionForm">
              <Form.Label>Person</Form.Label>
              <Form.Control onChange={this.setPlayer_id} as="select">
                {matchPosition
                  .filter(
                    matchPosition =>
                      matchPosition.team_id === home_team_id ||
                      matchPosition.team_id === away_team_id
                  )
                  .map(data => {
                    return (
                      <option
                        key={data.key}
                        value={data.value}
                        address_id={data.address_id}
                        first_name={data.first_name}
                        last_name={data.last_name}
                        date_of_birth={data.birth}
                      >
                        {data.first_name +
                          " " +
                          data.last_name +
                          " " +
                          data.position +
                          " " +
                          data.team_name}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateMatchPositionForm">
              <Form.Label>Match</Form.Label>
              <Form.Control onChange={this.setMatch_id} as="select">
                {match.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
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

            <Form.Group controlId="updateMatchPositionForm">
              <Form.Label>Position</Form.Label>
              <Form.Control as="select" onChange={this.setPosition}>
                {positions.map(data => {
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
                Update
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

export default UpdateMatchPositionTable;
