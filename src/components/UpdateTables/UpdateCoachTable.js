import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/coach/";
const personURL = "https://team-football-api.herokuapp.com/person/";

class UpdateCoachTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: [],
      coach: [],
      coachId: "",
      personId: "",
      contactType: "",
      contactDetail: "",
      message: "",
      submitted: false
    };
  }

  fetchCoach = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ coachId: res.data[0].coach_id });
        let data = res.data.map(data => {
          return {
            key: data.coach_id,
            first_name: data.person.first_name,
            last_name: data.person.last_name
          };
        });
        this.setState({ coach: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchPerson = () => {
    axios
      .get(personURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ personId: res.data[0].person_id });
        let data = res.data.map(data => {
          return {
            key: data.person_id,
            first_name: data.first_name,
            last_name: data.last_name
          };
        });
        this.setState({ person: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleForm(event) {
    event.preventDefault();
    axios
      .put(
        URL + this.state.coachId,
        {
          person_id: this.state.personId
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
      personId: ""
    });
  }

  setPersonId = event => {
    this.setState({
      personId: event.target.value
    });
  };

  setCoachId = event => {
    this.setState({
      coachId: event.target.value
    });
  };

  componentDidMount() {
    this.fetchPerson();
    this.fetchCoach();
  }

  render() {
    let title = "Update Coach";
    const { person, coach } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createContactForm">
              <Form.Label>Coach</Form.Label>
              <Form.Control onChange={this.setCoachId} as="select">
                {coach.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      first_name={data.first_name}
                      last_name={data.last_name}
                    >
                      {data.first_name + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createContactForm">
              <Form.Label>Person</Form.Label>
              <Form.Control onChange={this.setPersonId} as="select">
                {person.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      first_name={data.first_name}
                      last_name={data.last_name}
                    >
                      {data.first_name + " " + data.last_name}
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
              {this.state.submitted ? this.state.contactType : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateCoachTable;
