import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateGoalTypeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        type: this.state.type
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
    })
    .catch(err => {
      console.log("Axios error: ", err);
    });
    this.setState({
      type: ""
    });
  }

  setType(event) {
    this.setState({ 
      type: event.target.value
    });
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create Goal Type"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createGoalTypeForm">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="type"
                placeholder="Type"
                value={this.state.type}
                onChange={this.setType.bind(this)}
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

export default CreateGoalTypeTable;