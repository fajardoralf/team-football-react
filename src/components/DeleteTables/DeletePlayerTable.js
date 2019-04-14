import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/player/";

class DeletePlayerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      player: [],
      player_name: "",
      id: 1,
      message: "",
      submitted: false,
      mounted: true
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState({
        message: "Successfully deleted ",
        submitted: true
      });
      this.fetchPlayers();
    });
  };

  handleChange = event => {
    this.setState(
      {
        id: event.target.value,
        player_name: event.target.selectedOptions[0].text
      },
      this.fetchPlayer
    );
  };

  fetchPlayers = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            key: data.player_id,
            value: data.player_id,
            first_name: data.person.first_name,
            last_name: data.person.last_name,
            team_name: data.team.team_name
          };
        });
        this.setState({ players: data }, this.fetchPlayer);
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchPlayer = () => {
    axios
      .get(URL + this.state.id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ player: res });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  componentWillMount() {
    this.fetchPlayers();
  }

  render() {
    let title = "Delete Player";
    const { data } = this.state.player;
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Player</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.players.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.first_name + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
              <h1>{data && data.team.team_name}</h1>
              <h1>{data && data.number}</h1>
              <h1>{data && data.normal_position}</h1>
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

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.player_name : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeletePlayerTable;
