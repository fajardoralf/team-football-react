import React from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
//import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Dashboard from './containers/Dashboard/Dashboard';

ReactDOM.render(
<Router>
    <Route path='/' exact component={App}/>
    <Route path="/dashboard" exact component={Dashboard} />
</Router>,
 document.getElementById('root'));