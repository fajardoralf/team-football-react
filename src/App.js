import React, { Component } from 'react';
import './App.css';
import Navbar from './containers/Navbar/Navbar'
import NavigationBar from './components/NavigationBar/NavigationBar'

class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <NavigationBar></NavigationBar>
        <Navbar />
      </div>
    );
  }
}

export default App;
