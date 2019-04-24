import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/season/";

class CreateSeasonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      name: "",
      description: "",
      message: "",
      dateArray: [],
      submitted: false
    };
  }

  createDate = () => {
    let dateArray = [];

    for (let i = 1; i < 100; i++) {
      dateArray.push({ key: i, value: 2018 + i });
    }
    this.setState({
      startDate: dateArray[0].value,
      endDate: dateArray[0].value,
      dateArray
    });
  };

  handleForm = event => {
    event.preventDefault();
    if (this.state.startDate > this.state.endDate) {
      this.setState({
        message: "The start date cannot be newer than end date"
      });
      return;
    }

    axios
      .post(URL, {
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        name: this.state.name,
        description: this.state.description
      })
      .then(res => {
        console.log(res);
        this.setState({
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error, ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      startDate: "",
      endDate: "",
      name: "",
      description: ""
    });
  };

  setStartDate = event => {
    this.setState({
      startDate: event.target.value
    });
  };

  setEndDate = event => {
    this.setState({
      endDate: event.target.value
    });
  };

  setName = event => {
    this.setState({
      name: event.target.value
    });
  };

  setDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  componentDidMount() {
    this.createDate();
  }

  render() {
    let title = "Create Season";

    const { dateArray } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="createSeasonForm">
              <Form.Label>Start Date</Form.Label>
              <Form.Control as="select" onChange={this.setStartDate}>
                {dateArray.map(date => {
                  return (
                    <option key={date.key} value={date.value}>
                      {date.value}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createSeasonForm">
              <Form.Label>End Date</Form.Label>
              <Form.Control as="select" onChange={this.setEndDate}>
                {dateArray.map(date => {
                  return (
                    <option key={date.key} value={date.value}>
                      {date.value}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="createSeasonForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.setName}
              />
            </Form.Group>

            <Form.Group controlId="createSeasonForm">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.setDescription}
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
              {this.state.submitted ? this.state.name : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateSeasonTable;
