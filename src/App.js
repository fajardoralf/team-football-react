import React, { Component } from 'react';
import './App.css';
import Navbar from './containers/Navbar/Navbar'
import NavigationBar from './components/NavigationBar/NavigationBar'
import MatchViewer from './containers/MatchViewer/MatchViewer'

class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <NavigationBar></NavigationBar>
        <MatchViewer></MatchViewer>
      </div>
    );
  }
}

export default App;
