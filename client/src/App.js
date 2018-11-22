import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestQueryPage from './Pages/testQuery';
import LoginPage from './Pages/loginPage';
import WelcomePage from './Pages/welcome';
import SignupPage from './Pages/signupPage';
import Header from './Components/Header'

function Routes() {
 return (
   <Router>
     <div>

       <Header/>
       
       <hr />

       <Route exact path="/" component={Home} />
       <Route path="/testquery" component={TestQuery} />
       <Route path="/login" component={Login} />
       <Route path="/welcome" component={Welcome} />
       <Route path="/signup" component={Signup} />

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
   <div>
     <h1>This is a test query to the GraphQL Server</h1>
     <TestQueryPage/>
   </div>
 );
}

function Welcome() {
 return (
   <WelcomePage/>
 );
}

function Login() {
 return (
   <LoginPage/>
 );
}

function Signup() {
 return (
   <SignupPage/>
 );
}

export default Routes;
