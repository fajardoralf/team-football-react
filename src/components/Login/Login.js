import React, { Component } from 'react';
import './login.css';



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      user_id: 0,
      role: 'guest'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let xdata = {
      username: data.get('username'),
      password: data.get('password')
    }
    console.log(xdata)
    /*
    fetch('https://week6api.herokuapp.com/auth', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(xdata),
    }).then(resp => resp.json()).then(data => {
      console.log(data)
      sessionStorage.setItem('username', data.username)
      sessionStorage.setItem('user_id', data.user_id)
      sessionStorage.setItem('role', (data.role) ? 'Owner':'Reviewer')
      this.setState({
        username: data.username,
        user_id: parseInt(data.user_id),
        role: (data.role) ? 'Owner':'Reviewer'
      })
      //window.location.reload();
    });
    */
    // Dummy data until we have DB working
    sessionStorage.setItem('username', data.get("username"))
    sessionStorage.setItem('role', 'admin') //admin, user, undefined == anonymous
  }

  handleLogout() {
    sessionStorage.clear()
    this.setState({
      username: null,
      user_id: 0,
      role: ''
    })
    //window.location.reload();
  };


  render() {
    console.log(this.state.username);
    return (
      <div>
        <div className="LoginPage">
          <h1>Football manager</h1>
          {(sessionStorage.getItem('username') == null) ?
            <div><h2>Login!</h2>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Enter username</label>
                <input id="username" type="text" placeholder="Username" name="username" />
                <label htmlFor="password">Enter your password</label>
                <input id="password" type="password" placeholder="Password" name="password" />
                <button className='btn btn-primary'>Login</button>
              </form>
            </div>
            :
            <div className='loggedIn'>
              <p>Hello {sessionStorage.getItem('username')}</p>
              <a href='/dashboard' className='btn btn-info'>Dashboard</a>
              <button className='btn btn-danger' onClick={this.handleLogout}>Logout</button>
            </div>}

        </div>
      </div>

    );
  }
}

export default Login;
