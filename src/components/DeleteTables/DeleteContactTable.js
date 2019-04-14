import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/contact/";

class DeleteContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contactName: "",
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
          contactName: this.state.contactName,
          submitted: true
        },
        this.fetchContacts()
      );
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      contactName: event.target.selectedOptions[0].text
    });
  };

  fetchContacts = () => {
    if (this.state.mounted) {
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
              key: data.contact_id,
              value: data.contact_id,
              text: data.contact_type,
              first_name: data.person.first_name,
              last_name: data.person.last_name
            };
          });
          this.setState({ contacts: data });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentDidMount() {
    this.fetchContacts();
  }

  render() {
    let title = "Delete Contacts";
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Contacts</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.contacts.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.first_name +
                        " " +
                        data.last_name +
                        "'s " +
                        data.text}
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
              {this.state.submitted ? this.state.contactName : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteContactTable;
