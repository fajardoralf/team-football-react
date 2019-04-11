import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/association/";

class DeleteAssociationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      association: [],
      associationName: "",
      id: "",
      message: "",
      submitted: false,
      mounted: true
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState({
        message: "Successfully deleted ",
        addressName: this.state.associationName,
        submitted: true
      });
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      associationName: event.target.selectedOptions[0].text
    });
  };

  fetchAssociation = () => {
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
              key: data.association_id,
              value: data.association_id,
              text: data.name
            };
          });
          this.setState({ association: data });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentWillMount() {
    this.fetchAssociation();
  }

  componentWillUpdate() {
    this.fetchAssociation();
  }

  render() {
    let title = "Delete Associations";
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Association</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.association.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
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
              {this.state.submitted ? this.state.associationName : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteAssociationTable;
