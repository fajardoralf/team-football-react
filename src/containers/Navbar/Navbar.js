import React from 'react';
import Login from '../Login/Login';


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
 
  }
  

      handleUserChange(event) {
        this.setState({user: event.target.value});
      }

      handlePasswordChange(event) {
        this.setState({password: event.target.value});
      }
    
      handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.user);
        console.log('A password was submitted: ' + this.state.password);
        event.preventDefault();
      }
      
  
  render() {

    return (
      <div>
        <Login/>
      </div>
    );
  }
}
export default PageNavbar;
