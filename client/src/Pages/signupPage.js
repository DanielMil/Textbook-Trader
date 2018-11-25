import React, { Component } from 'react';
import { auth } from '../helpers/auth';
import { create } from 'domain';
import { graphql } from "react-apollo";
import gql from "graphql-tag";

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

const createUser = gql`
    mutation($fname: String!, $lname: String!, $email: String!, $authId: String!){
        createUser(fname: $fname, lname: $lname, email: $email, authId: $authId) {
            fname
        }
    }
`;

class Register extends Component {

  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault();
    //mutation call here 
    createUser({
      variables: {
        fname:this.firstName.value, 
        lname:this.lastName.value, 
        email: this.email.value , 
        authId: 'uidTest'
      }
    });
    // auth(this.email.value, this.pw.value)
    //   .catch(e => this.setState(setErrorMsg(e)));
  
  }

  render () {

    console.log(this);

    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" ref={(firstName) => this.firstName = firstName} placeholder="Name"/>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" ref={(lastName) => this.lastName = lastName} placeholder="Last Name"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}

export default graphql(createUser)(Register);
