const typeDefs = `
  type Query {
    getUsers: [User]!
    getTextbooks: [Textbook]!
    getUserTextbooks(userID: String!): [Textbook]
    getUser(id: String!): User
    login(name:String!, password:String!): Boolean!
  }
  type User {
    id: ID!
    name: String!  
    email: String!
    textbookIds: [String]
    password: String!
  }
  type Textbook {
    id: ID!
    courseCode: String!  
    userID: String
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    createTextbook(courseCode: String!, userID: String): Textbook
    removeUser(id: ID!): Boolean
    removeTextbook(id: ID!): Boolean
  }
`;

module.exports = typeDefs;