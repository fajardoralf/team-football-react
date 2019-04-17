import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "admin"
    };
  }

  componentDidMount() { }

  handleSubmit() {
    var _this = this;
    _this.setState({
      username: _this.state.username
    })
    sessionStorage.setItem("username", _this.state.username);
    sessionStorage.setItem("password", _this.state.password);
    sessionStorage.setItem("role", _this.state.role); //admin, user, undefined == anonymous
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleLogout(event) {
    this.setState({
      user: "",
      passworrd: ""
    });
    sessionStorage.clear();
  }

  render() {
    return (
      <div>
        {sessionStorage.getItem("username") === null ? (
          <Form inline onSubmit={this.handleSubmit.bind(this)}>
            <InputGroup>
              <FormControl
                type="username"
                placeholder="Username"
                className="mr-sm-2"
                value={this.state.username}
                onChange={this.handleChangeUsername.bind(this)}
              />
              <FormControl
                type="password"
                placeholder="Password"
                className="mr-sm-2"
                onChange={this.handleChangePassword.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
              />
              <Button
                type="submit"
                variant="outline-light"
                onClick={this.handleSubmit.bind(this)}
                id="button"
                ahref="/"
              >
                Login
              </Button>
              <Button variant="outline-light" id="button" href="/signup">
                Sign Up
          </Button>
            </InputGroup>
          </Form>
        )
          :
          <Button
            className="text-nowrap"
            variant="outline-light"
            onClick={this.handleLogout.bind(this)}
            id="button"
            ahref="/"
          >
            Log out
          </Button>
        }
      </div>
      /*
      <div id="form">
        <div className="navbar-collapse collapse w-100 order-3 dual-collapsed">
          {sessionStorage.getItem("username") === null ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <input
                  className="form-control"
                  type="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChangeUsername.bind(this)}
                />
              </li>
              <li className="nav-item">
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChangePassword.bind(this)}
                    onSubmit={this.handleSubmit.bind(this)}
                  />
                </form>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-nowrap text-white"
                  href="/"
                  onClick={this.handleSubmit.bind(this)}
                  id="button"
                >
                  Log in
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-nowrap text-white"
                  href="/signup"
                  id="button"
                >
                  Sign up
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto">
              <li className="navbar-text">
                Hello {sessionStorage.getItem("username")}!
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-nowrap text-danger"
                  href="/"
                  onClick={this.handleLogout.bind(this)}
                  id="button"
                >
                  Log out
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
          */
    );
  }
}

export default Login;
