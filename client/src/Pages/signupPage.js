import React, { Component } from 'react';
import { auth, getCurrentUid } from '../helpers/auth';
import { graphql } from "react-apollo";
import { gql } from 'apollo-boost';

function setErrorMsg (error) {
  return {
    registerError: error.message
  }
}

const createUserMutation = gql`
    mutation($fname: String!, $lname: String!, $email: String!, $authId: String!){
        createUser(fname: $fname, lname: $lname, email: $email, authId: $authId) {
            fname
        }
    }
`;

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      registerError: null,
      fname: '',
      lname: '',
      email: '',
      password: '', 
      cpassword: ''
    };
  }

  async insertToDatabase(user) {
    // const firebaseID = getCurrentUid();
    // this.props.mutate({
    //   variables: {
    //     fname: this.state.fname, 
    //     lname: this.state.lname, 
    //     email: this.state.email, 
    //     authId: firebaseID
    //   }
    // });
    await console.log(getCurrentUid);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    if (this.state.password !== this.state.cpassword) {
      this.setState({registerError: "Passwords do not match!"});
      return null; 
    }

    auth(this.state.email, this.state.password)
      .then((this.insertToDatabase()))
      .catch(e => {
        this.setState(setErrorMsg(e))
        return null; 
      }
    );
  }

  render () {

    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit.bind(this)} >
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" onChange={(e)=>this.setState({fname: e.target.value})} placeholder="Name"/>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" onChange={(e)=>this.setState({lname: e.target.value})} placeholder="Last Name"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" onChange={(e)=>this.setState({email: e.target.value})} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" onChange={(e)=>this.setState({password: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e)=>this.setState({cpassword: e.target.value})} />
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

export default graphql(createUserMutation)(Register);
