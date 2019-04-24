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
      users: []
    };
  }

  handleForm(e) {
    e.preventDefault();

    axios.put(URL + "users/" + this.state.user_id, {
      user_id: this.state.user_id,
      username:
        this.state.new_username !== ""
          ? this.state.new_username
          : this.state.username,
      password: this.state.new_password,
      role: this.state.new_role
    });
  }

  getUsername(id) {
    for (let user of this.state.users) {
      if ("" + user.user_id === id) return user.username;
    }
    return "unknown";
  }

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
    this.setState({
      user_id: e.target.value,
      username: this.getUsername(e.target.value)
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
        password: json.data.password
      })
    );
  }

  render() {
    const title = "Update user info";

    const userids = this.state.users.map(u =>
        <option value={u.user_id}>{u.username}</option>)

    return (
      <Card bg="light" text="black">
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateUserForm">
              <Form.Label>User ID</Form.Label>
              <Form.Control onChange={this.setNewUserID.bind(this)} as="select">
              <option
                key={this.state.user_id}
                value={this.state.user_id}
              >
                {userids}
              </option>
            </Form.Control>
            </Form.Group>
            <div className="form-group" controlId="updateUserForm">
              <label for="new_username">Username</label>
              <input
                id="new_username"
                type="text"
                placeholder={this.state.username}
                value={this.state.new_username}
                onChange={this.setNewUsername.bind(this)}
              />
            </div>
            <div className="form-group" controlId="updateUserForm">
              <label for="new_password">New Password</label>
              <input
                id="new_password"
                type="password"
                placeholder="New password"
                value={this.state.new_password}
                onChange={this.setNewPassword.bind(this)}
              />
            </div>
            <div className="form-group" controlId="updateUserForm">
              <label for="new_role">Role</label>
              <select
                value={this.state.new_role}
                onChange={this.setNewRole.bind(this)}
                class="form-group"
                id="new_role"
              >
                <option value={true}>Admin</option>
                <option value={false}>User</option>
              </select>
            </div>
            <Button variant="dark" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateUser;
