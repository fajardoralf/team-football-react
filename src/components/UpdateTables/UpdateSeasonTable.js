import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/season/";

const seasonURL = "https://team-football-api.herokuapp.com/season/";

class UpdateSeasonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonId: "",
      season: [],
      startDate: "",
      current_startDate: "",
      endDate: "",
      current_endDate: "",
      name: "",
      current_name: "",
      description: "",
      current_description: "",
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

  fetchSeason = () => {
    axios
      .get(seasonURL + this.state.seasonId, {
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          
        }
      })
      .then(res => {
        this.setState({
          seasonId: res.data[0].season_id,
          current_startDate: res.data[0].start_date,
          current_endDate: res.data[0].end_date,
          current_name: res.data[0].name,
          current_description: res.data[0].description
        });

        let data = res.data.map(data => {
          return {
            key: data.season_id,
            start_date: data.start_date,
            end_date: data.end_date,
            name: data.name,
            description: data.description
          };
        });
        this.setState({
          season: data
        });
      })
      .catch(err => {
        console.log("Axios err ", err);
      });
  };

  handleForm(event) {
    event.preventDefault();

    if (this.state.startDate > this.state.endDate) {
      this.setState({
        message: "The start date cannot be newer than end date"
      });

      return;
    }
    axios
      .put(
        URL + this.state.seasonId,
        {
          key: this.state.seasonId,
          start_date: this.state.startDate,
          end_date: this.state.endDate,
          name: this.state.name,
          description: this.state.description
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            
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
      seasonId: "",
      startDate: "",
      endDate: "",
      name: "",
      description: ""
    });
  }

  setSeasonId = event => {
    this.setState({
      seasonId: event.target.value,
      current_startDate: event.target.selectedOptions[0].getAttribute(
        "start_date"
      ),
      current_endDate: event.target.selectedOptions[0].getAttribute("end_date"),
      current_description: event.target.selectedOptions[0].getAttribute(
        "description"
      ),
      current_name: event.target.selectedOptions[0].getAttribute("name")
    });
  };

  setStartDate(event) {
    this.setState({
      startDate: event.target.value
    });
  }

  setEndDate(event) {
    this.setState({
      endDate: event.target.value
    });
  }

  setName(event) {
    this.setState({
      name: event.target.value
    });
  }

  setDescription(event) {
    this.setState({
      description: event.target.value
    });
  }

  componentDidMount() {
    this.fetchSeason();
    this.createDate();
  }

  render() {
    let title = "Update Season";

    const {
      season,
      current_startDate,
      current_endDate,
      current_description,
      current_name,
      description,
      name,
      dateArray
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateSeasonForm">
              <Form.Label>Season</Form.Label>
              <Form.Control onChange={this.setSeasonId} as="select">
                {season.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      name={data.name}
                      start_date={data.start_date}
                      end_date={data.end_date}
                      description={data.description}
                    >
                      {data.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateSeasonForm">
              <Form.Label>Start Date</Form.Label>
              <Form.Control as="select" onChange={this.setStartDate.bind(this)}>
                {dateArray.map(date => {
                  return (
                    <option key={date.key} value={date.value}>
                      {date.value}
                    </option>
                  );
                })}
              </Form.Control>
              <h6>Current Start date: {current_startDate}</h6>
            </Form.Group>

            <Form.Group controlId="updateSeasonForm">
              <Form.Label>End Date</Form.Label>
              <Form.Control as="select" onChange={this.setEndDate.bind(this)}>
                {dateArray.map(date => {
                  return (
                    <option key={date.key} value={date.value}>
                      {date.value}
                    </option>
                  );
                })}
              </Form.Control>
              <h6>Current End date: {current_endDate}</h6>
            </Form.Group>

            <Form.Group controlId="updateSeasonForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                style={{ textTransform: "capitalize" }}
                value={name}
                onChange={this.setName.bind(this)}
              />
              <h6>Current name: {current_name}</h6>
            </Form.Group>

            <Form.Group controlId="updateSeasonForm">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Description"
                style={{ textTransform: "capitalize" }}
                value={description}
                onChange={this.setDescription.bind(this)}
              />
              <h6>Current Description: {current_description}</h6>
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
              {this.state.submitted ? this.state.name : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateSeasonTable;
