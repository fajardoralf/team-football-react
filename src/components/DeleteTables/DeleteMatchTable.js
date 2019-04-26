import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/match/";

const resultURL = "https://team-football-api.herokuapp.com/resultmatch/";

const seasonURL = "https://team-football-api.herokuapp.com/season/";

class DeleteMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: [],
      matchPosition: "",
      id: 1,
      season: "1",
      season_start: "",
      season_end: "",
      season_name: "",
      home_team: "",
      home_team_id: "",
      away_team: "",
      away_team_id: "",
      match_id: 1,
      score_home: "",
      score_away: "",
      location: "",
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
    });
  };

  handleChange = event => {
    this.setState(
      {
        id: event.target.value,
        matchPosition: event.target.selectedOptions[0].text
      },
      this.fetchMatchInfo
    );
  };

  fetchSeason = () => {
    axios
      .get(seasonURL + this.state.season, {
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          season_start: res.data.start_date,
          season_end: res.data.end_date,
          season_name: res.data.name
        });
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
        let data = res.data.map(data => {
          return {
            key: data.match_id,
            value: data.match_id,
            text: data.match_date
          };
        });
        this.setState({ match: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchMatchInfo = () => {
    axios
      .get(URL + this.state.id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState(
          {
            season: res.data.season_id,
            match_id: res.data.match_id,
            home_team: res.data.home_team.team_name,
            home_team_id: res.data.home_team.team_id,
            away_team: res.data.away_team.team_name,
            away_team_id: res.data.away_team.team_id,
            location: res.data.location.name
          },
          this.fetchResult,
          this.fetchSeason
        );
      });
  };

  fetchResult = () => {
    axios
      .get(resultURL + this.state.match_id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        if (res.data.length !== 0) {
          this.setState({
            score_home: res.data[0].score,
            score_away: res.data[1].score
          });
        } else {
          this.setState({
            score_home: 0,
            score_away: 0
          });
        }
      });
  };

  componentDidMount() {
    this.fetchMatch();
    this.fetchMatchInfo();
    this.fetchResult();
    this.fetchSeason();
  }

  render() {
    let title = "Delete Match";
    const {
      home_team,
      away_team,
      season_start,
      season_end,
      season_name,
      location,
      score_home,
      score_away
    } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Date</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.match.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={new Date(data.value).toLocaleDateString()}
                    >
                      {new Date(data.text).toLocaleDateString()}
                    </option>
                  );
                })}
              </Form.Control>

              <Form.Label>Season</Form.Label>
              <h6>{season_name + " " + season_start + "/" + season_end}</h6>
              <Form.Label>Location</Form.Label>
              <h6>{location}</h6>
              <Form.Label>Match Between</Form.Label>
              <h6>
                {home_team +
                  " " +
                  score_home +
                  " vs " +
                  score_away +
                  " " +
                  away_team}
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

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.match : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteMatchPositionTable;
