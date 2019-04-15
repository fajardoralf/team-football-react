import React from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
//import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Dashboard from './containers/Dashboard/Dashboard';
import CreateUser from './components/CreateTables/CreateUser'
import Teams from './containers/Teams/Teams'

ReactDOM.render(
<Router>
    <Route path='/' exact component={App}/>
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/signup" exact component={CreateUser}/>
    <Route path="/teams" exact component={Teams}/>
</Router>,
 document.getElementById('root'));