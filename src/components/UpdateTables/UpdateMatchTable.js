import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/match/";

class UpdateMatchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchId: 1,
      match: [],
      matchDate: "",
      homeTeam_id: "",
      awayTeam_id: "",
      season_id: "",
      location_id: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(
        URL + this.state.matchId,
        {
          macth_id: this.state.matchId,
          match_date: this.state.matchDate,
          home_team_id: this.state.homeTeam_id,
          away_team_id: this.state.awayTeam_id,
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
      })
      .catch(err => {
        console.log("Axios error: ", err);
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
    let m = this.getMatch(parseInt(event.target.value))
    this.setState({
      matchId: parseInt(event.target.value),
      matchDate: m.date,
      homeTeam_id: m.home_team_id,
      awayTeam_id: m.away_team_id,
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
      season_id: parseInt(event.target.value)
    });
  }

  setLocation_id(event) {
    this.setState({
      location_id: parseInt(event.target.value)
    });
  }

  getMatch = id => {
    for (let m of this.state.match){
      if (m.key === id) return m
    }
    return {}
  }

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
  }

  render() {
    let title = "Update Match";

    const { match, matchDate, season_id, location_id, homeTeam_id, awayTeam_id } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
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
                      {data.date +
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
                value={matchDate}
                onChange={this.setMatchDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Home Team ID</Form.Label>
              <Form.Control
                type="homeTeam_id"
                placeholder="Home Team ID"
                value={homeTeam_id}
                onChange={this.setHomeTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Away Team ID</Form.Label>
              <Form.Control
                type="awayTeam_id"
                placeholder="Away Team ID"
                value={awayTeam_id}
                onChange={this.setAwayTeam_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Season ID</Form.Label>
              <Form.Control
                type="season_id"
                placeholder="Season ID"
                value={season_id}
                onChange={this.setSeason_id.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateMatchForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="location_id"
                placeholder="Location ID"
                value={location_id}
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

              <div className="text-center">
                {this.state.message}
                {this.state.submitted ? this.state.address_line_1 : ""}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateMatchTable;
