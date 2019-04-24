import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/contact/";
const personURL = "https://team-football-api.herokuapp.com/person/";

class CreateContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: [],
      personId: "",
      contactType: "",
      contactDetail: "",
      message: "",
      submitted: false
    };
  }

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
      .post(
        URL,
        {
          person_id: this.state.personId,
          contact_type: this.state.contactType,
          contact_detail: this.state.contactDetail
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
          submitted: true,
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          submitted: false,
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      personId: "",
      contactType: "",
      contactDetail: ""
    });
  }

  setPersonId = event => {
    console.log(event.target.value);
    this.setState({
      personId: event.target.value
    });
  };

  setContactType = event => {
    this.setState({
      contactType: event.target.value
    });
  };

  setContactDetail = event => {
    this.setState({
      contactDetail: event.target.value
    });
  };

  componentDidMount() {
    this.fetchPerson();
  }

  render() {
    let title = "Create Contact";
    const { person } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
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

            <Form.Group controlId="createContactForm">
              <Form.Label>Contact Type</Form.Label>
              <Form.Control
                type="contactType"
                placeholder="Contact Type"
                style={{ textTransform: "capitalize" }}
                value={this.state.contactType}
                onChange={this.setContactType.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createContactForm">
              <Form.Label>Contact Detail</Form.Label>
              <Form.Control
                type="contactDetail"
                placeholder="Contact Detail"
                value={this.state.contactDetail}
                onChange={this.setContactDetail.bind(this)}
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

export default CreateContactTable;
