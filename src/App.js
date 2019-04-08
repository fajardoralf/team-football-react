import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PageNavbar from './containers/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageNavbar/>
      </div>
    );
  }
}

export default App;
