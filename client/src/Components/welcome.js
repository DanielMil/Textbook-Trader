import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const getUserLoggedIn = gql`
  {
    getUsers {
      id
      name
      email
    }
  }
`;

const getTextbooks = gql`
  query($userID: String!){
    getUserTextbooks (userID: $userID){
      courseCode
    }
  }
`;

class Welcome extends Component {

  getAllTextbooks () {
    let data = this.props.getUserLoggedIn;
    if (data.loading) {
      return null;
    }
    console.log(data);
    this.props.getTextbooks({
      variables: {
          name: data.getUsers[0].id
      }
    });

    // console.log(data);
    // if(data.loading){
    //     return( <option disabled>Loading textbooks</option> );
    // } else {
    //     return data.authors.map(author => {
    //       return( <option key={ author.id } value={author.id}>{ author.name }</option> );
    //     });
    // }
  }

  render() {
    let data  = this.props.getUserLoggedIn;
    if (data.loading) {
      return null;
    }

    return (
      <div>
        <h1>Welcome Page</h1>
        <div>
            <h1>{data.getUsers[0].name}</h1>
            <p>{data.getUsers[0].email}</p>
        </div>
        <h3>Textbooks Sold by {data.getUsers[0].name}:</h3>
        <ul>
            { this.getAllTextbooks }
        </ul>
      </div>
    );
  }
}

export default compose(
    graphql(getUserLoggedIn, {name : 'getUserLoggedIn'}),
    graphql(getTextbooks, {name: "getTextbooks"})
)(Welcome);
