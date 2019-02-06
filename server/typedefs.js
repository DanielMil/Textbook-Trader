const typeDefs = `
  type Query {
    getUserByAuthId(authId: String!): User
    getUsers: [User]!
    getTextbooks: [Textbook]!
    getUserTextbooks(authId: String!): [Textbook]
    getUser(id: String!): User
    getTextbooksByCourseCode(courseCode: String!): [Textbook]
  }
  type User {
    id: ID!
    fname: String!
    lname: String!  
    email: String!
    textbookIds: [String]
    authId: String!
    error: String
  }
  type Textbook {
    id: ID!
    courseCode: String!
    textbook: String!
    price: String!
    imgURL: String
    authId: String!
    dateAndTime: String!
    error: String
  }
  
  type Mutation {
    createUser(fname: String!, lname: String!, email: String!, authId: String!): User
    createTextbook(courseCode: String!, textbook: String!, price: String!, imgURL: String , authId: String!): Textbook
    removeUser(id: ID!): Boolean
    removeTextbook(id: ID!): Boolean
  }
`;

module.exports = typeDefs;