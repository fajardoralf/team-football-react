import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class UpdateMatchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchId: "",
      matchDate: "",
      homeTeam_id: "",
      awayTeam_id: "",
      season_id: "",
      location_id: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        macth_id: this.state.matchId,
        match_date: this.state.matchDate,
        home_team_id: this.state.homeTeam_id,
        away_team_id: this.state.awayTeam_id,
        season_id: this.state.season_id,
        location_id: this.state.location_id
      })
    this.setState({
      matchId: "",
      matchDate: "",
      homeTeam_id: "",
      awayTeam_id: "",
      season_id: "",
      location_id: ""
    });
  }

  setMatchId(event) {
    this.setState({ 
      matchId: event.target.value
    });
  }

  setMatchDate(event) {
    this.setState({ 
      matchDate: event.target.value
    });
  }

  setHomeTeam_id(event) {
    this.setState({
      homeTeam_id: event.target.value
    });
  }

  setAwayTeam_id(event) {
    this.setState({
      awayTeam_id: event.target.value
    });
  }

  setSeason_id(event) {
    this.setState({ 
      season_id: event.target.value
    });
  }

  setLocation_id(event) {
      this.setState({
          location_id: event.target.value
      })
  }

  render() {
    let title = "Update Match"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Match ID</Form.Label>
              <Form.Control
                type="matchId"
                placeholder="Match ID"
                value={this.state.matchId}
                onChange={this.setMatchId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Match Date</Form.Label>
              <Form.Control
                type="matchDate"
                placeholder="Match Date"
                value={this.state.matchDate}
                onChange={this.setMatchDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Home Team ID</Form.Label>
              <Form.Control
                type="homeTeam_id"
                placeholder="Home Team ID"
                value={this.state.homeTeam_id}
                onChange={this.setHomeTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Away Team ID</Form.Label>
              <Form.Control
                type="awayTeam_id"
                placeholder="Away Team ID"
                value={this.state.awayTeam_id}
                onChange={this.setAwayTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Season ID</Form.Label>
              <Form.Control
                type="season_id"
                placeholder="Season ID"
                value={this.state.season_id}
                onChange={this.setSeason_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="location_id"
                placeholder="Location ID"
                value={this.state.location_id}
                onChange={this.setLocation_id.bind(this)}
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
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateMatchTable;