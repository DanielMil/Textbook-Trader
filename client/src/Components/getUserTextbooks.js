import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const getTextbooks = gql`
    query($userID: String!){
        getUserTextbooks (userID: $userID){
            courseCode
        }
    }
`;

const UserTextbooks = () => (
    <Query query={getTextbooks} variables={{userID: '5bf32900ee77f377257e39f4'}}>
        {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1>Loading...</h1>;
 
            return (
                <div>
                    <div>{data.getUserTextbooks.map(textbook => (
                        <div key={`${textbook.courseCode}--course-code`}> 
                            <li>Couse code: {textbook.courseCode}</li> 
                        </div>
                    ))}
                    </div>
                </div>
                );
        }}
    </Query>
);

export default UserTextbooks;

