import React from "react";
import { Form, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/person/";
const playerURL = "https://team-football-api.herokuapp.com/person/";

class DeletePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      person: "",
      id: "",
      message: "",
      name: "",
      number: "",
      submitted: false,
      mounted: true
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.get(URL + this.state.id).then(res => {
      this.setState({
        message: "Successfully deleted ",
        submitted: true
      });
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      person: event.target.selectedOptions[0].text
    });
  };

  fetchPerson = () => {
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
              key: data.person_id,
              value: data.person_id,
              first_name: data.first_name,
              last_name: data.last_name
            };
          });
          this.setState({ persons: data, name: this.state.person
         });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentWillMount() {
    this.fetchPerson();
  }

  componentWillUpdate() {
    this.fetchPerson();
  }

  render() {
    let title = "Show Player";
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Person</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.persons.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.first_name + " "} {data.last_name}
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
            </div>
            <br />

            <textarea value = {this.state.name}>
            </textarea>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeletePersonTable;