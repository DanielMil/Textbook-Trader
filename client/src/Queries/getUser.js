import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const getUserName = gql`
    query($authId: String!){
        getUserByAuthId(authId: $authId){
            fname
            lname
        }
    }
`;



const welcome = (uid) => (
    <Query query={getUserName} variables={{authId: uid+""}}>
        {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1></h1>;

            return (
                <h1>Welcome {data.getUserByAuthId.fname}!</h1>
                );
        }}
    </Query>
);

const profile = (uid) => (
    <Query query={getUserName} variables={{authId: uid+""}}>
        {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1></h1>;

            return (
                <h1>{data.getUserByAuthId.fname} {data.getUserByAuthId.lname}</h1>
                );
        }}
    </Query>
);

const User = {
    welcome,
    profile
}

export default User; 
