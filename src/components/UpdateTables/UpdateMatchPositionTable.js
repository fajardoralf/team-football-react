import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchposition/";

class UpdateMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_id: "",
      match_id: "",
      position: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL + this.state.player_id, {
        player_id: this.state.player_id,
        match_id: this.state.match_id,
        position: this.state.position,
        message: "Successfully Updated",
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
      player_id: "",
      match_id: "",
      position: ""
    });
  }

  setPlayer_id(event) {
    this.setState({ 
      player_id: event.target.value
    });
  }

  setMatch_id(event) {
    this.setState({
      match_id: event.target.value
    });
  }

  setPosition(event) {
    this.setState({
      position: event.target.value
    });
  }

  render() {
    let title = "Update Match-Position"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="updateMatchPositionForm">
              <Form.Label>Player ID</Form.Label>
              <Form.Control
                type="player_id"
                placeholder="Player ID"
                value={this.state.player_id}
                onChange={this.setPlayer_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchPositionForm">
              <Form.Label>Match ID</Form.Label>
              <Form.Control
                type="match_id"
                placeholder="Match ID"
                value={this.state.match_id}
                onChange={this.setMatch_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchPositionForm">
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
                Update
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

export default UpdateMatchPositionTable;