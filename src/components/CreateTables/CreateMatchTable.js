import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const teamURL = "https://team-football-api.herokuapp.com/team/";
const seasonURL = "https://team-football-api.herokuapp.com/season/";
const locationURL = "https://team-football-api.herokuapp.com/location/";

class CreateMatchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDate: "",
      homeTeam_id: "",
      awayTeam_id: "",
      season_id: "",
      location_id: "",
      message: "",
      submitted: false,
      match: [],
      season: [],
      location: []
    };
  }

  fetchTeamId = () => {
    axios
      .get(teamURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            home_team_id: data.team_id,
            away_team_id: data.team_id
          };
        });
        this.setState({ match: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchSeasonId = () => {
    axios
      .get(seasonURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            season_id: data.season_id
          };
        });
        this.setState({ season: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchLocationId = () => {
    axios
      .get(locationURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            location_id: data.location_id
          };
        });
        this.setState({ location: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleForm(event) {
    event.preventDefault();

    axios.post(URL, {
      matchDate: this.state.matchDate,
      homeTeam_id: this.state.homeTeam_id,
      awayTeam_id: this.state.awayTeam_id,
      season_id: this.state.season_id,
      location_id: this.state.location_id,
      message: "Successfully created ",
      submitted: true
    });
    this.setState({
      matchDate: "",
      homeTeam_id: "",
      awayTeam_id: "",
      season_id: "",
      location_id: ""
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
    });
  }

  componentDidMount() {
    this.fetchTeamId();
    this.fetchSeasonId();
    this.fetchLocationId();
  }

  render() {
    let title = "Create Match";

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createMatchForm">
              <Form.Label>Match Date</Form.Label>
              <Form.Control
                type="match_date"
                placeholder="Match Date"
                value={this.state.matchDate}
                onChange={this.setMatchDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Home Team ID</Form.Label>
              <Form.Control
                onChange={this.setHomeTeam_id.bind(this)}
                as="select"
              >
                {this.state.match.map(data => {
                  return (
                    <option key={data.home_team_id} value={data.home_team_id}>
                      {data.home_team_id}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Away Team ID</Form.Label>
              <Form.Control
                onChange={this.setAwayTeam_id.bind(this)}
                as="select"
              >
                {this.state.match.map(data => {
                  return (
                    <option key={data.away_team_id} value={data.away_team_id}>
                      {data.away_team_id}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Season ID</Form.Label>
              <Form.Control onChange={this.setSeason_id.bind(this)} as="select">
                {this.state.season.map(data => {
                  return (
                    <option key={data.season_id} value={data.season_id}>
                      {data.season_id}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                onChange={this.setLocation_id.bind(this)}
                as="select"
              >
                {this.state.location.map(data => {
                  return (
                    <option key={data.location_id} value={data.location_id}>
                      {data.location_id}
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
                {this.state.submitted ? this.state.matchDate : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateMatchTable;
