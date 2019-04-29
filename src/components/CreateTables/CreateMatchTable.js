import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/match/";
const teamURL = "https://team-football-api.herokuapp.com/team/";
const seasonURL = "https://team-football-api.herokuapp.com/season/";
const locationURL = "https://team-football-api.herokuapp.com/location/";

class CreateMatchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDate: "",
      homeTeam_id: "1",
      awayTeam_id: "1",
      season_id: "1",
      location_id: "1",
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
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            key: data.team_id,
            home_team: data.team_name,
            away_team: data.team_name
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
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        this.setState({
          start_date: res.data[0].start_date,
          end_date: res.data[0].end_date
        });
        let data = res.data.map(data => {
          return {
            key: data.season_id,
            season_name: data.name,
            season_start: data.start_date,
            season_end: data.end_date
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
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            key: data.location_id,
            location_name: data.name
          };
        });
        this.setState({ location: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleForm = event => {
    event.preventDefault();

    const { start_date, end_date } = this.state;

    if (
      this.state.matchDate.slice(0, 4) < start_date ||
      this.state.matchDate.slice(0, 4) > end_date
    ) {
      this.setState({
        message: "The date doenst match with the season chosen"
      });
      return;
    }
    axios
      .post(
        URL,
        {
          match_date: this.state.matchDate,
          home_team_id: this.state.homeTeam_id,
          away_team_id: this.state.awayTeam_id,
          season_id: this.state.season_id,
          location_id: this.state.location_id
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      )
      .then(res => {
        console.log("response: ", res);
        this.setState({
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      matchDate: "",
      homeTeam_id: "",
      awayTeam_id: "",
      season_id: "",
      location_id: ""
    });
  };

  setMatchDate = event => {
    this.setState({
      matchDate: event.target.value
    });
  };

  setHomeTeam_id = event => {
    this.setState({
      homeTeam_id: event.target.value
    });
  };

  setAwayTeam_id = event => {
    this.setState({
      awayTeam_id: event.target.value
    });
  };

  setSeason_id = event => {
    this.setState({
      season_id: event.target.value,
      start_date: +event.target.selectedOptions[0].getAttribute("start_date"),
      end_date: +event.target.selectedOptions[0].getAttribute("end_date")
    });
  };

  setLocation_id = event => {
    this.setState({
      location_id: event.target.value
    });
  };

  componentDidMount() {
    this.fetchTeamId();
    this.fetchSeasonId();
    this.fetchLocationId();
  }

  render() {
    let title = "Create Match";

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createMatchForm">
              <Form.Label>Match Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="YYYY-MM-DD"
                value={this.state.matchDate}
                onChange={this.setMatchDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Home Team ID</Form.Label>
              <Form.Control onChange={this.setHomeTeam_id} as="select">
                {this.state.match.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.home_team}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Away Team</Form.Label>
              <Form.Control onChange={this.setAwayTeam_id} as="select">
                {this.state.match.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.away_team}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Season</Form.Label>
              <Form.Control onChange={this.setSeason_id} as="select">
                {this.state.season.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      start_date={data.season_start}
                      end_date={data.season_end}
                    >
                      {data.season_name +
                        ": " +
                        data.season_start +
                        "-" +
                        data.season_end}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createMatchForm">
              <Form.Label>Location</Form.Label>
              <Form.Control onChange={this.setLocation_id} as="select">
                {this.state.location.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.location_name}
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
            </div>
            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.matchDate : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateMatchTable;
