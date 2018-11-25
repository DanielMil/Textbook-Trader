import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants'
import Footer from "./Components/Footer"
import ProfilePage from './Components/protected/profile';
import Login from './Pages/loginPage'
import Register from './Pages/signupPage'
import Home from './Pages/home'
import { Navbar, Nav } from "react-bootstrap";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch); //used for the search symbol

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

// Global authentication id variable for the user session. 
let ID = null; 

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    firebaseID: null
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          firebaseID: user.uid
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    ID = this.state.firebaseID; 
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>

          {/* Navbar Component. Can be made into seperate component. */}
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/" className="navbar-brand">Textbook Trader</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
            <Nav pullRight>
              <div>
                  {this.state.authed
                  ? <div><Link to="/profile" className="navbar-brand">Profile</Link>
                      <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    </div>
                  : 
                    <div>
                      <Link to="/login" className="navbar-brand">Login</Link>
                      <Link to="/register" className="navbar-brand">Register</Link>
                    </div>
                    }
                </div>
            </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* Define Routes Here */}
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact authID={this.state.firebaseID} component={HomeFunc} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/profile' component={ProfilePage} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
            
          {/* Footer Component */}
          <Footer/>
                    
        </div>
      </BrowserRouter>
    );
  }
}

function HomeFunc() {
  return <Home authID={ID} />
}