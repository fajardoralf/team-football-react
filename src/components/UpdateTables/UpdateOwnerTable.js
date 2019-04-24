import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/owner/";
const personURL = "https://team-football-api.herokuapp.com/person/";

class UpdateOwnerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: [],
      owner: [],
      ownerId: "",
      personId: "",
      contactType: "",
      contactDetail: "",
      message: "",
      submitted: false
    };
  }

  fetchOwner = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ ownerId: res.data[0].owner_id });
        let data = res.data.map(data => {
          return {
            key: data.owner_id,
            first_name: data.person.first_name,
            last_name: data.person.last_name
          };
        });
        this.setState({ owner: data });
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
        URL + this.state.ownerId,
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

  setOwnerId = event => {
    this.setState({
      ownerId: event.target.value
    });
  };

  componentDidMount() {
    this.fetchPerson();
    this.fetchOwner();
  }

  render() {
    let title = "Create Owner";
    const { person, owner } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createContactForm">
              <Form.Label>Owner</Form.Label>
              <Form.Control onChange={this.setOwnerId} as="select">
                {owner.map(data => {
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
                Update
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

export default UpdateOwnerTable;
