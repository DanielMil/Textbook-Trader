import React, { Component } from "react";
import {
 Button, FormGroup, FormControl
} from "react-bootstrap";
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
           <h2 className="contentHeading">Login to your account</h2>
           {/*
           <FormGroup
             className="formField"
             controlId="name"
             bsSize="large">
             <FormControl
               className="formInputControl"
               placeholder="Name"
               value={this.state.name}
               onChange={this.handleChange}
               type="name"
             />
           </FormGroup>
           */}
           <FormGroup
             className="formField"
             controlId="email"
             bsSize="large">
             <FormControl
               autoFocus
               className="formInputControl"
               placeholder="Email"
               type="email"
               value={this.state.email}
               onChange={this.handleChange}
             />
           </FormGroup>
           <FormGroup
             className="formField"
             controlId="password"
             bsSize="large">
             <FormControl
               autoFocus
               className="formInputControl"
               placeholder="Password"
               type="password"
               value={this.state.email}
               onChange={this.handleChange}
             />
           </FormGroup>
           {this.renderRedirect()}
           <Button
             className="formButton"
             bsStyle="primary"
             bsSize="large"
             type="submit"
             onClick={this.setRedirect}>Submit</Button>

           <h4 className="contentText">Don't have an account? <a href="/signup">Register now</a></h4>
         </form>
       </div>
     );
   }
 }

export default graphql(addUsersQuery)(loginPage);
