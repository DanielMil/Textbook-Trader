import React, { Component } from 'react';
import {
    Navbar, Nav, 
   } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import { logout } from '../helpers/auth'

class Header extends Component {

    render() {

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link to="/" className="navbar-brand">Textbook Trader</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                <Nav pullRight>
                    
                        {this.state.authed
                        ? <div>
                        <Link to="/profile" className="navbar-brand">Profile</Link>
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
                    
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            );
        }
}

export default Header;
