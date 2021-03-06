import React from 'react';
import Login from '../../components/Login/Login';
import './Navbar.css'


class PageNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleLogout = this.handleLogout.bind(this);
  }


  handleUserChange(event) {
    this.setState({ user: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.user);
    console.log('A password was submitted: ' + this.state.password);
    event.preventDefault();
  }

  handleLogout(event) {
    this.setState({
      user: '',
      passworrd: ''
    })
    sessionStorage.clear()
  }


  render() {

    return (

      <div>
        
        <div className='loggedIn'>

          {(sessionStorage.getItem('username') === null) ?
            <div>
              <Login />
              <a href='/signup'>Sign up</a>
            </div>
            :
            <div >
              <p>Hello {sessionStorage.getItem('username')}</p>
              <a href='/dashboard' className='btn btn-info' id="button">Dashboard</a>
              <button className='btn btn-danger' onClick={this.handleLogout} id="button">Logout</button>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default PageNavbar;
