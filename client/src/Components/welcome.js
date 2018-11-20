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
  {
    getUserTextbooks {
      courseCode
    }
  }
`;

class Welcome extends Component {

  render() {
    console.log(this.props);
   // const getUsers  = this.props.getUserLoggedIn;
    const { data: {loading, getUsers} } = this.props; 
    if (loading) {
      return null;
    }
    return (
      <div>
        <h1>Welcome Page</h1>
        <div>
            <h1>{getUsers[0].name}</h1>
            <p>{getUsers[0].email}</p>
        </div>
        <h3>Textbooks Sold by {getUsers[0].name}:</h3>
        <ul>
            {/* <li>{Textbooks[0].courseCode}</li> */}
        </ul>
      </div>
    );
  }
}

// export default compose(
//     graphql(getUserLoggedIn, {name : 'getUserLoggedIn'})
// )(Welcome);

export default graphql(getUserLoggedIn)(Welcome);
