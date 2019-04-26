import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/team/";

class DeleteTeamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      team: "",
      id: "",
      message: "",
      submitted: false,
      mounted: true
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState(
        {
          message: "Successfully deleted ",
          submitted: true
        },
        this.fetchTeam()
      );
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      name: event.target.selectedOptions[0].text
    });
  };

  fetchTeam = () => {
    if (this.state.mounted) {
      axios
        .get(URL, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            
          }
        })
        .then(res => {
          let data = res.data.map(data => {
            return {
              key: data.team_id,
              value: data.team_id,
              name: data.team_name
            };
          });
          this.setState({ teams: data });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentDidMount() {
    this.fetchTeam();
  }

  render() {
    let title = "Delete Team";
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Team</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.teams.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.name}
                    </option>
                  );
                })}
              </Form.Control>
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
              {this.state.submitted ? this.state.person : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteTeamTable;
