import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const getAllTextbooks = gql` 
  {
    getTextbooks {
      id
      courseCode
    }
  }
`;

class testQuery extends Component {
  render() {
    const {data: {loading, getTextbooks}} = this.props;
    if (loading) {
      return null;
    }
    return (
      <div>
        <h1>Example of test query:</h1>
        <div>{getTextbooks.map(textbook => (
          <div key={`${textbook.id}--course-code`}> 
            <h3>{textbook.courseCode}</h3> 
            <p>ID: {textbook.id}</p></div>
          ))}
          </div>
      </div>
    );
  }
}

export default graphql(getAllTextbooks)(testQuery);
