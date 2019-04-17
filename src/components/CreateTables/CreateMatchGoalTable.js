import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchgoal/";

const playerURL = "https://team-football-api.herokuapp.com/player/";

const goalTypeURL = "https://team-football-api.herokuapp.com/goaltype/";

class CreateMatchGoalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [],
      goalType: [],
      playerId: "",
      goalTypeId: "",
      matchId: "",
      description: ""
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

  handleForm(event) {
    event.preventDefault();

    axios
      .post(
        URL,
        {
          player_id: this.state.playerId,
          goal_type_id: this.state.goalTypeId,
          match_id: this.state.matchId,
          description: this.state.description,
          message: "Successfully created ",
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
      description: ""
    });
  }

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

  setDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  componentDidMount() {
    this.fetchPlayer();
    this.fetchGoalType();
  }

  render() {
    let title = "Create Match Goal";
    const { player, goalType } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createMatchGoalForm">
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
              <Form.Label>Match ID</Form.Label>
              <Form.Control
                type="matchId"
                placeholder="Match ID"
                value={this.state.matchId}
                onChange={this.setMatchId.bind(this)}
              />
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

export default CreateMatchGoalTable;
