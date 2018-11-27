import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { gql } from 'apollo-boost';
import { ref, firebaseAuth } from '../config/constants'
import Icon from 'react-icons-kit';
import {userCircle} from 'react-icons-kit/fa/userCircle';
import {userCircleO} from 'react-icons-kit/fa/userCircleO';
import {mail} from 'react-icons-kit/entypo/mail';
import {lock} from 'react-icons-kit/fa/lock';
import "../Styles/Signup.css";
import { CardImg } from 'reactstrap';


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

  insertToDatabase = (firebaseID) => {
    this.props.mutate({
      variables: {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        authId: firebaseID
      }
    });
  }

  saveUser = (user) => {
    this.insertToDatabase(user.user.uid);
    return ref.child(`users/${user.uid}/info`)
      .set({
        email: user.email,
        uid: user.uid
      })
      .then(() => console.log(user))
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.password !== this.state.cpassword) {
      this.setState({registerError: "Passwords do not match!"});
      return null;
    }

    firebaseAuth().createUserWithEmailAndPassword(this.state.email ,this.state.password)
      .then(this.saveUser)
      .catch(e => {
        this.setState(setErrorMsg(e))
        return null;
      }
    );
  }

  render () {

    return (
      <div className="col-sm-10 col-sm-offset-1 content align-middle main-page">
        <row>
        <div className="col-lg-6">
          <h1>Welcome to Radl</h1>
          <h3>Info about what the platform is goes here...</h3>
          <CardImg top width="75%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap"/>
        </div>
        </row>
      <div className="col-lg-6">

        <h1 className="contentHeading">Get Started</h1>
        <form onSubmit={this.handleSubmit.bind(this)} >
        <row>
          <div className="form-group col-xs-6">
            <label className="inputLabel"><Icon icon={userCircleO} className="icons"/></label>
            <input className="form-control" onChange={(e)=>this.setState({fname: e.target.value})} placeholder="First Name"/>
          </div>
          <div className="form-group col-xs-6">
            <label className="inputLabel"><Icon icon={userCircle} className="icons"/></label>
            <input className="form-control" onChange={(e)=>this.setState({lname: e.target.value})} placeholder="Last Name"/>
          </div>
          </row>
          <row>
          <div className="form-group col-xs-12">
            <label className="inputLabel"><Icon icon={mail} className="icons"/></label>
            <input className="form-control" onChange={(e)=>this.setState({email: e.target.value})} placeholder="Email"/>
          </div>
          </row>
          <row>
          <div className="form-group col-xs-12">
            <label className="inputLabel"><Icon icon={lock} className="icons"/></label>
            <input type="password" className="form-control" placeholder="Password" onChange={(e)=>this.setState({password: e.target.value})} />
          </div>
          </row>
          <row>
          <div className="form-group col-xs-12">
            <label className="inputLabel"><Icon icon={lock} className="icons"/></label>
            <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e)=>this.setState({cpassword: e.target.value})} />
          </div>
          </row>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <row>
          <div className="col-xs-12 container">
          <button type="submit" className="btn formButton">Create Account</button>
          </div>
          </row>
        </form>
        </div>

      </div>
    )
  }
}

export default graphql(createUserMutation)(Register);
