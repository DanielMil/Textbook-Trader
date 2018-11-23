import React, { Component } from 'react';
import {
    Navbar, Nav, NavItem
   } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../Styles/Header.css";

class Header extends Component {

    redirectHome() {
        return <Redirect to='/' />;
    }

    render() {

        return (
            <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a className="Header-Title" href="/">Textbook Trader</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1} href="/login">
                    Login
                </NavItem>
                <NavItem eventKey={2} href="/signup">
                    Sign Up
                </NavItem>
                <NavItem eventKey={3} href="/welcome">
                    Welcome
                </NavItem>
                <NavItem eventKey={4} href="/profile">
                    Profile
                </NavItem>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
            );
        }
}

export default Header;
