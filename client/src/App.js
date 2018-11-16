import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TestQueryPage from './Components/testQuery';
import LoginPage from './Components/loginPage';

function Routes() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/testQuery">About</Link>
          </li>
          <li>
            <Link to="/login">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/testquery" component={TestQuery} />
        <Route path="/login" component={Login} /> 
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function TestQuery() {
  return (
    <TestQueryPage/>
  );
}

function Login() {
  return (
    <LoginPage/>
  );
}

export default Routes;
