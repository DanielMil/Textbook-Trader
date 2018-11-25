const typeDefs = `
  type Query {
    getUserByAuthId(authIdToFind: String!): User
    getUsers: [User]!
    getTextbooks: [Textbook]!
    getUserTextbooks(userId: String!): [Textbook]
    getUser(id: String!): User
    login(name:String!, password:String!): Boolean!
  }
  type User {
    id: ID!
    fname: String!
    lname: String!  
    email: String!
    textbookIds: [String]
    authId: String!
  }
  type Textbook {
    id: ID!
    courseCode: String!
    textbook: String!
    price: String!
    imgURL: String
    userId: String!
  }
  type Mutation {
    createUser(fname: String!, lname: String!, email: String!, authId: String!): User
    createTextbook(courseCode: String!, textbook: String!, price: String!, imgURL: String , userId: String!): Textbook
    removeUser(id: ID!): Boolean
    removeTextbook(id: ID!): Boolean
  }
`;

module.exports = typeDefs;