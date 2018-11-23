import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import WelcomePage from './Pages/welcome';
import SignupPage from './Pages/signupPage';
import ProfilePage from './Pages/profile';
import Header from './Components/Header'
import HomePage from './Pages/home'
import Footer from "./Components/Footer"

function App() {
 return (
   <Router>
     <div>

       <Header/>
       
       <Route exact path="/" component={() => { return <HomePage/> } } />
       <Route path="/profile" component={() => { return <ProfilePage/> } } />
       <Route path="/login" component={() => { return <LoginPage/> } } />
       <Route path="/welcome" component={() => {return <WelcomePage/> } } />
       <Route path="/signup" component={() => {return <SignupPage/> } } />

       <Footer/>

     </div>

   </Router>
 );
}

export default App;
