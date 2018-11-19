import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../Styles/Login.css";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";

const addUsersQuery = gql`
    mutation($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

class loginPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        name: '',
        email: '',
        redirect: false
      };
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      });
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return (
          <Redirect to='/welcome' />
        );
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.mutate({
            variables: {
                name: this.state.name,
                email: this.state.email
            }
        });
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    render() {
      return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name" bsSize="large">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                value={this.state.name}
                onChange={this.handleChange}
                type="name"
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.renderRedirect()}
            <Button 
              block
              bsSize="large"
              type="submit"
              onClick={this.setRedirect}>Submit</Button>
          </form>
        </div>
      );
    }
  }

export default graphql(addUsersQuery)(loginPage);
