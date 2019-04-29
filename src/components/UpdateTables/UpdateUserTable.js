import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/";

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: 1,
      password: "",
      new_password: "",
      new_role: false,
      username: "",
      new_username: "",
      users: [],
      message: ""
    };
  }

  handleForm(e) {
    e.preventDefault();

    axios
      .put(
        URL + "users/" + this.state.user_id,
        {
          user_id: this.state.user_id,
          username:
            this.state.new_username !== ""
              ? this.state.new_username
              : this.state.username,
          password:
            this.state.new_password !== ""
              ? this.state.new_password
              : this.state.password,
          role: this.state.new_role
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({ message: "Successfully Updated" });
      })
      .catch(err => {
        this.setState({
          message: "Something went wrong. Please check your input"
        });
        console.log(err);
      });
  }

  getUsername(id) {
    for (let user of this.state.users) {
      if ("" + user.user_id === id) return user.username;
    }
    return "unknown";
  }

  getUser = id => {
    for (let u of this.state.users) {
      if (id === u.user_id) return u;
    }
    return {};
  };

  setNewPassword(e) {
    this.setState({
      new_password: e.target.value
    });
  }

  setNewRole(e) {
    this.setState({
      new_role: e.target.value
    });
  }

  setNewUserID(e) {
    let u = this.getUser(parseInt(e.target.value));
    this.setState({
      user_id: parseInt(e.target.value),
      username: u.username,
      password: u.password,
      new_role: u.role,
      message: ""
    });
  }

  setNewUsername(e) {
    this.setState({
      new_username: e.target.value
    });
  }

  componentDidMount() {
    axios.get(URL + "users").then(json =>
      this.setState({
        users: json.data,
        username: json.data[0].username,
        user_id: json.data[0].user_id,
        password: json.data[0].password,
        new_role: json.data[0].role
      })
    );
  }

  render() {
    const title = "Update user info";

    const userids = this.state.users.map(u => (
      <option value={u.user_id}>{u.username}</option>
    ));

    return (
      <Card bg="light" text="black">
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateUserForm">
              <Form.Label for="userID">User ID</Form.Label>
              <Form.Control
                id="userID"
                type="number"
                placeholder="user ID"
                value={this.state.user_id}
                onChange={this.setNewUserID.bind(this)}
                as="select"
              >
                {userids}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="updateUserForm">
              <Form.Label for="new_username">Username</Form.Label>
              <Form.Control
                id="new_username"
                type="text"
                placeholder={this.state.username}
                value={this.state.new_username}
                onChange={this.setNewUsername.bind(this)}
              />
            </Form.Group>
            <Form.Group controlId="updateUserForm">
              <Form.Label for="new_password">New Password</Form.Label>
              <Form.Control
                id="new_password"
                type="password"
                placeholder="New password"
                value={this.state.new_password}
                onChange={this.setNewPassword.bind(this)}
              />
            </Form.Group>
            <Form.Group controlId="updateUserForm">
              <Form.Label for="new_role">Role</Form.Label>
              <Form.Control
                value={this.state.new_role}
                onChange={this.setNewRole.bind(this)}
                id="new_role"
                as="select"
              >
                <option value={true}>Admin</option>
                <option value={false}>User</option>
              </Form.Control>
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="dark" type="submit">
                Update
              </Button>
            </div>
            <div className="text-center">
              <br />
              {this.state.message}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateUser;
