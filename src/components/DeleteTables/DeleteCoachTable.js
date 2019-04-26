import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/coach/";

class DeletePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coaches: [],
      coach: "",
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
        this.fetchCoach()
      );
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      coach: event.target.selectedOptions[0].text
    });
  };

  fetchCoach = () => {
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
              key: data.coach_id,
              value: data.coach_id,
              first_name: data.person.first_name,
              last_name: data.person.last_name
            };
          });
          this.setState({ coaches: data });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentDidMount() {
    this.fetchCoach();
  }

  render() {
    let title = "Delete Coach";
    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Coach</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.coaches.map(data => {
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
              <Button variant="dark" type="Submit">
                Delete
              </Button>
            </div>
            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.coach : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeletePersonTable;
