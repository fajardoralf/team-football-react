import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import axios from "axios";

URL = 'https://team-football-api.herokuapp.com/perform_login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "admin",
      message: '',
      rerender: props.rerender,
      path: props.path,
      redirect: false
    };
  }

  componentDidMount() { }

  handleSubmit = event => {
    event.preventDefault()

    var bodyFormData = new FormData()
    bodyFormData.append('username', this.state.username)
    bodyFormData.append('password', this.state.password)
    var data = {
        username: this.state.username,
        password: this.state.password
      }
    /*axios
      .post(URL, {
        username: this.state.username,
        password: this.state.password
      })*/
    axios({
      method: 'post',
      url: URL,
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          sessionStorage.setItem("username", res.data.username);
          sessionStorage.setItem("user_id", res.data.user_id);
          sessionStorage.setItem("role", res.data.role);
          this.state.rerender()
          this.setState({message: ''})
          
        }
      }).catch(e => this.setState({
        username: '',
        password: '',
        message: 'Wrong username/password'
      }) )

    this.setState({
      username: this.state.username
    })
    //admin, user, undefined == anonymous
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleLogout(event) {
    this.setState({
      username: "",
      password: "",
      message: '',
      redirect: true
    });
    sessionStorage.clear()
    this.state.rerender()
    
  }

  renderRedirect = () => {
    if (this.state.redirect && this.state.path !== '/') {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div>
        {sessionStorage.getItem("username") === null ? (
          <Form inline onSubmit={this.handleSubmit.bind(this)} ref={fm => { this.form = fm }}>
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
              <div style={{color:"whitesmoke"}}>{this.state.message}</div>
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
        {this.renderRedirect()}
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
