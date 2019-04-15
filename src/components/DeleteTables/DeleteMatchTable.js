import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/match/";

class DeleteMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: [],
      matchPosition: "",
      id: 1,
      season: "",
      home_team: "",
      away_team: "",
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
        this.setState({
          season: res.data.season_id,
          home_team: res.data.home_team.team_name,
          away_team: res.data.away_team.team_name,
          location: res.data.location.name
        });
      });
  };

  componentDidMount() {
    this.fetchMatch();
    this.fetchMatchInfo();
  }

  render() {
    let title = "Delete Match";
    const { home_team, away_team, season, location } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Date</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.match.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Label>Season</Form.Label>
              <h6>{season}</h6>
              <Form.Label>Location</Form.Label>
              <h6>{location}</h6>
              <Form.Label>Match Between</Form.Label>
              <h6>{home_team + " vs " + away_team}</h6>
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
