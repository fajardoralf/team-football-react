import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/player/";
const personURL = "https://team-football-api.herokuapp.com/person";
const teamURL = "https://team-football-api.herokuapp.com/team";

class UpdatePlayerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      persons: [],
      teams: [],
      positions: [
        { key: 1, value: "Goalkeeper" },
        { key: 2, value: "Defender" },
        { key: 3, value: "Midfielder" },
        { key: 4, value: "Forward" }
      ],
      player_id: "",
      person_id: "",
      team_id: "",
      current_team: "",
      normal_position: "",
      current_position: "",
      numbers: [],
      number: "",
      current_number: "",
      message: "",
      submitted: false
    };
  }

  createNumber = () => {
    for (let i = 1; i < 100; i++) {
      this.state.numbers.push({ key: i, value: i });
    }
  };

  fetchPlayer = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            current_team: res.data[0].team.team_name,
            current_position: res.data[0].normal_position,
            current_number: res.data[0].number
          });
          return {
            key: data.player_id,
            text: data.person.first_name + " " + data.person.last_name,
            current_team: data.team.team_name,
            current_position: data.normal_position,
            current_number: data.number
          };
        });
        this.setState({ players: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchPerson = () => {
    axios
      .get(personURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            first_name: res.data.first_name,
            last_name: res.data.last_name
          });
          return {
            key: data.person_id,
            value: data.person_id,
            text: data.first_name,
            last_name: data.last_name
          };
        });
        this.setState({ persons: data });
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
  };

  handleForm(event) {
    event.preventDefault();

    axios
      .put(
        URL + this.state.player_id,
        {
          person_id: this.state.person_id,
          team_id: this.state.team_id,
          normal_position: this.state.normal_position,
          number: this.state.number
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
      person_id: "",
      team_id: "",
      normal_position: "",
      number: ""
    });
  }

  setPlayer_id = event => {
    console.log(event.target.value);
    this.setState({
      player_id: event.target.value,
      current_number: event.target.selectedOptions[0].getAttribute(
        "current_number"
      ),
      current_position: event.target.selectedOptions[0].getAttribute(
        "current_position"
      ),
      current_team: event.target.selectedOptions[0].getAttribute("team_name")
    });
  };

  setPerson_id = event => {
    console.log(event.target.value);
    this.setState({ person_id: event.target.value });
  };

  setTeam_id = event => {
    console.log(event.target.value);
    this.setState({
      team_id: event.target.value
    });
  };

  setNormal_position = event => {
    console.log(event.target.value);
    this.setState({ normal_position: event.target.value });
  };

  setNumber = event => {
    console.log(event.target.value);
    this.setState({ number: event.target.value });
  };

  componentDidMount() {
    this.fetchPlayer();
    this.fetchPerson();
    this.fetchTeam();
    this.createNumber();

    this.setState({ normal_position: this.state.positions[0].value });
  }

  render() {
    const title = "Update Player";

    const {
      persons,
      teams,
      players,
      current_number,
      current_position,
      current_team,
      positions,
      numbers
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updatePlayerForm">
              <Form.Label>Where Player ID is:</Form.Label>
              <Form.Control onChange={this.setPlayer_id} as="select">
                {players.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      text={data.text}
                      team_name={data.current_team}
                      current_position={data.current_position}
                      current_number={data.current_number}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updatePlayerForm">
              <Form.Label>Person ID</Form.Label>
              <Form.Control onChange={this.setPerson_id} as="select">
                {persons.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      last_name={data.last_name}
                    >
                      {data.text + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="udpatePlayerForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control onChange={this.setTeam_id} as="select">
                {teams.map(data => {
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
              <h6>Current Team: {current_team}</h6>
            </Form.Group>

            <Form.Group controlId="updatePlayerForm">
              <Form.Label>Normal Position</Form.Label>
              <Form.Control as="select" onChange={this.setNormal_position}>
                {positions.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.value}
                    </option>
                  );
                })}
              </Form.Control>
              <h6>Current Position: {current_position}</h6>
            </Form.Group>

            <Form.Group controlId="updatePlayerForm">
              <Form.Label>Number</Form.Label>
              <Form.Control as="select" onChange={this.setNumber}>
                {numbers.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.value}
                    </option>
                  );
                })}
              </Form.Control>
              <h6>Current Number: {current_number}</h6>
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
              {this.state.submitted ? this.state.number : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdatePlayerTable;
