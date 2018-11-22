import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const getUserLoggedIn = gql`
  {
    getUsers {
      id
      name
      email
    }
  }
`;

const User = () => (
    <Query query={getUserLoggedIn}>
        {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1>Loading...</h1>;

            return (
                <div>
                    <h1>{data.getUsers[0].name}</h1>
                    <h3>{data.getUsers[0].email}</h3>
                    <h4>{data.getUsers[0].name}'s Textbooks:</h4>
                </div>
                );
        }}
    </Query>
);

export default User; 
