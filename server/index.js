const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

console.log(process.env.dbKey);

const DB = process.env.dbKey; 
mongoose.connect(DB);

const options = {
    port: 8000
};

var Schema = mongoose.Schema;

//Create User collection schema
var userSchema = new Schema({
  name :  String
}, {collection: "Users"});

//Create collection
const User = mongoose.model("User", userSchema);

//Create texbook collection schema
var textbookSchema = new Schema({
    courseCode :  String
  }, {collection: "Textbooks"});

//Create collection
const Textbook = mongoose.model("Textbook", textbookSchema);

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
  type User {
    id: ID!
    name: String!  
  }
  type Textbook {
    id: ID!
    courseCode: String!  
  }
  type Mutation {
    createUser(name: String!): User
    createTextbook(courseCode: String!): Textbook
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    createUser: async (_, {name} ) => {
        const newUser = new User({name});
        await newUser.save();
        return newUser; 
    },
    createTextbook: async (_, {courseCode} ) => {
        const newTextbook =  new Textbook({courseCode});
        await newTextbook.save(); 
        return newTextbook;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
//Connect to the database. On callback, connect to graphql server.
mongoose.connection.once("open", function() {
    server.start(options, ({ port }) => 
        console.log(
            `Server is running on localhost:${options.port}`
        )
    );
});
