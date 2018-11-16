const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const databaseSchematics = require('./dbSchemas.js') 

const options = {
    port: 8000
};

const DB = process.env.dbKey; 
mongoose.connect(DB);
var Schema = mongoose.Schema;

//Create User collection schema
var userSchema = new Schema(databaseSchematics.userSchema, {collection: "Users"});

//Create collection
const User = mongoose.model("User", userSchema);

//Create texbook collection schema
var textbookSchema = new Schema(databaseSchematics.textbookSchema, {collection: "Textbooks"});

//Create collection
const Textbook = mongoose.model("Textbook", textbookSchema);

//TODO: Move this to seperate file
const typeDefs = `
  type Query {
    getUsers: [User]!
    getTextbooks: [Textbook]!
  }
  type User {
    id: ID!
    name: String!  
    email: String!
  }
  type Textbook {
    id: ID!
    courseCode: String!  
  }
  type Mutation {
    createUser(name: String!, email: String!): User
    createTextbook(courseCode: String!): Textbook
    removeUser(id: ID!): Boolean
    removeTextbook(id: ID!): Boolean
  }
`;

//TODO: Move this to seperate file
const resolvers = {
  Query: {
    getTextbooks: () => Textbook.find(),
    getUsers: () => User.find()
  },
  Mutation: {
    createUser: async (_, { name, email } ) => {
        const newUser = new User({name, email});
        await newUser.save();
        return newUser; 
    },
    createTextbook: async (_, { courseCode } ) => {
        const newTextbook =  new Textbook({courseCode});
        await newTextbook.save(); 
        return newTextbook;
    },
    removeUser: async (_, { id } ) => {
      await User.findByIdAndRemove(id); 
      return true;
    },
    removeTextbook: async (_, { id } ) => {
      await Textbook.findByIdAndRemove(id); 
      return true;
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
