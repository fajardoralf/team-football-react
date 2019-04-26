import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchposition/";
const playerURL = "https://team-football-api.herokuapp.com/player/";
class DeleteMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchPositions: [],
      matchPosition: "",
      id: "",
      player_id: 1,
      message: "",
      first_name: "",
      last_name: "",
      player_number: "",
      team: "",
      submitted: false
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState(
        {
          message: "Successfully deleted ",
          submitted: true
        },
        this.fetchMatchPosition()
      );
    });
  };

  handleChange = event => {
    this.setState(
      {
        id: event.target.value,
        player_id: event.target.selectedOptions[0].getAttribute("player_id"),
        matchPosition: event.target.selectedOptions[0].text,
        message: "",
        submitted: false
      },
      this.fetchPlayer
    );
  };

  fetchMatchPosition = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        this.setState({
          player_id: res.data[0].player_id
        });
        let data = res.data.map(data => {
          return {
            key: data.matchPosition_id,
            value: data.matchPosition_id,
            player_id: data.player_id,
            text: data.position
          };
        });
        this.setState({ matchPositions: data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchPlayer = () => {
    axios
      .get(playerURL + this.state.player_id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        this.setState({
          first_name: res.data.person.first_name,
          last_name: res.data.person.last_name,
          team: res.data.team.team_name,
          player_number: res.data.number
        });
      });
  };

  componentDidMount() {
    this.fetchMatchPosition();
    this.fetchPlayer();
  }

  render() {
    let title = "Delete Match Position";
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Match Position</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.matchPositions.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      player_id={data.player_id}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Label>Team</Form.Label>
              <h6>{this.state.team}</h6>
              <Form.Label>Player</Form.Label>
              <h6>
                {this.state.first_name +
                  " " +
                  this.state.last_name +
                  " " +
                  this.state.player_number}
              </h6>
            </FormGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="dark" type="Submit">
                Delete
              </Button>
            </div>
            <br />

            <div className="text-center">{this.state.message}</div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteMatchPositionTable;
