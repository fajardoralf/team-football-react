import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: "",
      contactType: "",
      contactDetail: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        personId: this.state.personId,
        contactType: this.state.contactType,
        contactDetail: this.state.contactDetail
      })
    this.setState({
      personId: "",
      contactType: "",
      contactDetail: ""
    });
  }

  setPersonId(event) {
    this.setState({ 
      personId: event.target.value
    });
  }

  setContactType(event) {
    this.setState({
      contactType: event.target.value
    });
  }

  setContactDetail(event) {
    this.setState({
      contactDetail: event.target.value
    });
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create Contact"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createContactForm">
              <Form.Label>Person ID</Form.Label>
              <Form.Control
                type="personId"
                placeholder="Person ID"
                value={this.state.personId}
                onChange={this.setPersonId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createContactForm">
              <Form.Label>Contact Type</Form.Label>
              <Form.Control
                type="contactType"
                placeholder="Contact Type"
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
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateContactTable;