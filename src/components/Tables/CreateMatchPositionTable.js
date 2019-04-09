import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: "",
      matchId: "",
      position: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        playerId: this.state.playerId,
        matchId: this.state.matchId,
        position: this.state.position
      })
    this.setState({
      playerId: "",
      matchId: "",
      position: ""
    });
  }

  setPlayerId(event) {
    this.setState({ 
      playerId: event.target.value
    });
  }

  setMatchId(event) {
    this.setState({
      matchId: event.target.value
    });
  }

  setPosition(event) {
    this.setState({
      position: event.target.value
    });
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create Match-Position"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createMatchPositionForm">
              <Form.Label>Player ID</Form.Label>
              <Form.Control
                type="playerId"
                placeholder="Player ID"
                value={this.state.playerId}
                onChange={this.setPlayerId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchPositionForm">
              <Form.Label>Match ID</Form.Label>
              <Form.Control
                type="matchId"
                placeholder="Match ID"
                value={this.state.matchId}
                onChange={this.setMatchId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchPositionForm">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="position"
                placeholder="Position"
                value={this.state.position}
                onChange={this.setPosition.bind(this)}
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
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateMatchPositionTable;