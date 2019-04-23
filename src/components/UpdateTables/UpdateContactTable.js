import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/contact/";
const personURL = "https://team-football-api.herokuapp.com/person/";

class UpdateContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: [],
      person: [],
      first_name: "",
      last_name: "",
      contact_name: "",
      contactId: 1,
      personId: 1,
      contactType: "",
      new_contactType: "",
      contactDetail: "",
      new_contactDetail: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(
        URL + this.state.contactId,
        {
          contact_id: this.state.contactId,
          person_id: this.state.personId,
          contact_type:
            this.state.new_contactType !== ""
              ? this.state.new_contactType
              : this.state.contactType,
          contact_detail:
            this.state.new_contactDetail !== ""
              ? this.state.new_contactDetail
              : this.state.contactDetail,
          message: "Successfully Updated ",
          submitted: true
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
      contactId: "",
      personId: "",
      contactType: "",
      contactDetail: ""
    });
  }

  setContactId = event => {
    console.log(event.target.selectedOptions[0].getAttribute("contact_detail"));
    this.setState(
      {
        contactId: event.target.value,
        personId: event.target.selectedOptions[0].getAttribute("person_id"),
        contactType: event.target.selectedOptions[0].getAttribute(
          "contact_type"
        ),
        contactDetail: event.target.selectedOptions[0].getAttribute(
          "contact_detail"
        )
      },
      this.fetchPersons
    );
  };

  setPersonId = event => {
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

  fetchContacts = () => {
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          contactType: res.data[0].contact_type,
          contactDetail: res.data[0].contact_detail
        });
        let data = res.data.map(data => {
          return {
            key: data.contact_id,
            value: data.contact_id,
            text: data.contact_detail,
            type: data.contact_type,
            person_id: data.person_id
          };
        });
        this.setState({ contact: data });
      });
  };

  fetchPersons = () => {
    axios
      .get(personURL + this.state.personId, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          first_name: res.data.first_name,
          last_name: res.data.last_name
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  componentDidMount() {
    this.fetchContacts();
    this.fetchPersons();
  }
  render() {
    let title = "Update Contact";
    const { contact, first_name, last_name, personId } = this.state;
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateContactForm">
              <Form.Label>Contact</Form.Label>
              <Form.Control onChange={this.setContactId} as="select">
                {contact.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      person_id={data.person_id}
                      contact_detail={data.text}
                      contact_type={data.type}
                    >
                      {data.text + " (" + data.type + ")"}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateContactForm">
              <Form.Label>Belongs to</Form.Label>
              <Form.Control onChange={this.handlePersonId} as="select">
                <option key={personId}>{first_name + " " + last_name}</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateContactForm">
              <Form.Label>Contact Type</Form.Label>
              <Form.Control
                type="contactType"
                placeholder={this.state.contactType}
                value={this.state.new_contactType}
                onChange={this.setContactType}
              />
            </Form.Group>

            <Form.Group controlId="updateContactForm">
              <Form.Label>Contact Detail</Form.Label>
              <Form.Control
                type="contactDetail"
                placeholder={this.state.contactDetail}
                value={this.state.new_contactDetail}
                onChange={this.setContactDetail}
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

export default UpdateContactTable;
