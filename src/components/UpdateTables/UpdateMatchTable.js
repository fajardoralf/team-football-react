import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/match/";
const teamURL = "https://team-football-api.herokuapp.com/team";
const seasonURL = "https://team-football-api.herokuapp.com/season";
const locationURL = "https://team-football-api.herokuapp.com/location";

class UpdateMatchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      teams: [],
      seasons: [],
      matchId: 1,
      match: [],
      matchDate: "",
      start_date: "",
      end_date: "",
      homeTeam_id: "",
      awayTeam_id: "",
      homeTeam_name: "",
      awayTeam_name: "",
      season_id: "",
      location_id: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
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
      .put(
        URL + this.state.matchId,
        {
          macth_id: this.state.matchId,
          match_date: this.state.matchDate,
          home_team_id: this.state.homeTeam_id,
          away_team_id: this.state.awayTeam_id,
          home_team_name: this.state.homeTeam_name,
          away_team_name: this.state.awayTeam_name,
          season_id: this.state.season_id,
          location_id: this.state.location_id
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
      matchId: 1,
      matchDate: "",
      homeTeam_id: 1,
      awayTeam_id: 2,
      season_id: "",
      location_id: ""
    });
  }

  setMatchId(event) {
    let m = this.getMatch(parseInt(event.target.value));
    this.setState({
      matchId: parseInt(event.target.value),
      matchDate: m.date,
      homeTeam_id: m.home_team_id,
      awayTeam_id: m.away_team_id,
      homeTeam_name: m.home_team_name,
      awayTeam_name: m.away_team_name,
      season_id: m.season_id,
      location_id: m.location_id
    });
  }

  setMatchDate(event) {
    this.setState({
      matchDate: event.target.value
    });
  }

  setHomeTeam_id(event) {
    this.setState({
      homeTeam_id: parseInt(event.target.value)
    });
  }

  setAwayTeam_id(event) {
    this.setState({
      awayTeam_id: parseInt(event.target.value)
    });
  }

  setSeason_id(event) {
    this.setState({
      season_id: parseInt(event.target.value),
      start_date: +event.target.selectedOptions[0].getAttribute("start_date"),
      end_date: +event.target.selectedOptions[0].getAttribute("end_date")
    });
  }

  setLocation_id(event) {
    this.setState({
      location_id: parseInt(event.target.value)
    });
  }

  getMatch = id => {
    for (let m of this.state.match) {
      if (m.key === id) return m;
    }
    return {};
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
          this.setState({
            location_name: res.data.name
          });
          return {
            key: data.location_id,
            value: data.location_id,
            text: data.name
          };
        });
        this.setState({ location: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchSeason = () => {
    axios
      .get(seasonURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          start_date: res.data[0].start_date,
          end_date: res.data[0].end_date
        });
        let data = res.data.map(data => {
          this.setState({
            season_name: res.data.name
          });
          return {
            key: data.season_id,
            value: data.season_id,
            start_date: data.start_date,
            end_date: data.end_date,
            text: data.name
          };
        });

        this.setState({ seasons: data });
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

  fetchMatch = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          matchId: res.data[0].match_id,
          matchDate: res.data[0].match_date,
          homeTeam_id: res.data[0].home_team.team_id,
          awayTeam_id: res.data[0].away_team.team_id,
          homeTeam_name: res.data[0].home_team.team_name,
          awayTeam_name: res.data[0].away_team.team_name,
          season_id: res.data[0].season_id,
          location_id: res.data[0].location_id
        });

        let data = res.data.map(data => {
          return {
            key: data.match_id,
            date: data.match_date,
            home_team: data.home_team.team_name,
            home_team_id: data.home_team.team_id,
            away_team: data.away_team.team_name,
            away_team_id: data.away_team.team_id,
            season_id: data.season_id,
            location_id: data.location_id
          };
        });
        this.setState({ match: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  componentDidMount() {
    this.fetchMatch();
    this.fetchTeam();
    this.fetchSeason();
    this.fetchLocationId();
  }

  render() {
    let title = "Update Match";

    const {
      match,

      season_id,
      location_id,
      homeTeam_id,
      awayTeam_id,
      start_date,
      end_date,
      teams,
      seasons,
      location
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateMatchForm">
              <Form.Label>Match</Form.Label>
              <Form.Control onChange={this.setMatchId.bind(this)} as="select">
                {match.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      date={data.match_date}
                      home_team={data.home_team.team_name}
                      home_team_id={data.home_team_id}
                      away_team={data.away_team.team_name}
                      away_team_id={data.away_team_id}
                    >
                      {new Date(data.date).toLocaleDateString() +
                        "-" +
                        data.home_team +
                        " Vs. " +
                        data.away_team}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Match Date</Form.Label>
              <Form.Control

                type="matchDate"
                placeholder="Match Date"
                value={new Date(matchDate).toLocaleDateString()}

                onChange={this.setMatchDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Home Team ID</Form.Label>
              <Form.Control
                value={homeTeam_id}
                onChange={this.setHomeTeam_id.bind(this)}
                as="select"
              >
                {teams.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Away Team ID</Form.Label>
              <Form.Control
                value={awayTeam_id}
                onChange={this.setAwayTeam_id.bind(this)}
                as="select"
              >
                {teams.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Season ID</Form.Label>
              <Form.Control
                value={season_id}
                onChange={this.setSeason_id.bind(this)}
                as="select"
              >
                {seasons.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      start_date={data.start_date}
                      end_date={data.end_date}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
              {"Start date: " + start_date + " End date: " + end_date}
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Location ID</Form.Label>

              <Form.Control
                value={location_id}
                onChange={this.setLocation_id.bind(this)}
                as="select"
              >
                {location.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
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
                Update
              </Button>
            </div>
            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.address_line_1 : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateMatchTable;
