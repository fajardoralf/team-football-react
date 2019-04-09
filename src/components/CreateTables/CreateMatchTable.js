import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateMatchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDate: "",
      homeTeamId: "",
      awayTeamId: "",
      seasonId: "",
      locationId: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        matchDate: this.state.matchDate,
        homeTeamId: this.state.homeTeamId,
        awayTeamId: this.state.awayTeamId,
        seasonId: this.state.seasonId,
        locationId: this.state.locationId
      })
    this.setState({
      matchDate: "",
      homeTeamId: "",
      awayTeamId: "",
      seasonId: "",
      locationId: ""
    });
  }

  setMatchDate(event) {
    this.setState({ 
      matchDate: event.target.value
    });
  }

  setHomeTeamId(event) {
    this.setState({
      homeTeamId: event.target.value
    });
  }

  setAwayTeamId(event) {
    this.setState({
      awayTeamId: event.target.value
    });
  }

  setSeasonId(event) {
    this.setState({ 
      seasonId: event.target.value
    });
  }

  setLocationId(event) {
      this.setState({
          locationId: event.target.value
      })
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create Match"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Match Date</Form.Label>
              <Form.Control
                type="match Date"
                placeholder="Match Date"
                value={this.state.matchDate}
                onChange={this.setMatchDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Home Team ID</Form.Label>
              <Form.Control
                type="homeTeamId"
                placeholder="Home Team ID"
                value={this.state.homeTeamId}
                onChange={this.setHomeTeamId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Away Team ID</Form.Label>
              <Form.Control
                type="awayTeamId"
                placeholder="Away Team ID"
                value={this.state.awayTeamId}
                onChange={this.setAwayTeamId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Season ID</Form.Label>
              <Form.Control
                type="seasonId"
                placeholder="Season ID"
                value={this.state.seasonId}
                onChange={this.setSeasonId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="locationId"
                placeholder="Location ID"
                value={this.state.locationId}
                onChange={this.setLocationId.bind(this)}
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

export default CreateMatchTable;