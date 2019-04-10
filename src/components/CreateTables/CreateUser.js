import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/person";

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleForm = event => {
        event.preventDefault();
        axios.post(URL, {
            username: this.state.username,
            password: this.state.password,
            role: false // false == regular user
        });
        console.log(
            this.state.username,
            this.state.password,
            this.state.lastName,
            this.state.dateOfBirth
        );
        this.setState({
            username: "",
            password: "",
        });
    };

    setUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    setPassword(event) {
        this.setState({
            firstName: event.target.value
        });
    }
    setLastName(event) {
        this.setState({
            lastName: event.target.value
        });
    }
    setDateOfBirth(event) {
        this.setState({
            dateOfBirth: event.target.value
        });
    }

    //componentDidMount() {
    //axios.get(URL).then(json => this.setState({ store: json.data }));
    //}

    render() {
        let title = "Register User";

        return (
            <Card bg="light" text="black" style={{ width: "18rem" }}>
                <Card.Body>
                    <h3 className="text-center">{title}</h3>
                    <div className="text-right">
                        <a href='/' className='btn btn-info' id="button">Back</a>
                    </div>
                    <br />
                    <Form onSubmit={this.handleForm}>

                        <Form.Group controlId="addUserForm">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.setUsername.bind(this)}
                            />
                        </Form.Group>

                        <Form.Group controlId="addUserForm">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.setPassword.bind(this)}
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

export default CreateUser;
