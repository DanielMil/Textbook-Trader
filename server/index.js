const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const databaseSchematics = require('./dbSchemas.js');
const typeDefs = require('./typedefs');
const utilities = require('./utilities');

const options = {
    port: 8000
};

const DB = process.env.dbKey; 
mongoose.connect(DB, { useNewUrlParser: true });
var Schema = mongoose.Schema;

//Create User collection schema
var userSchema = new Schema(databaseSchematics.userSchema, {collection: "Users"});

//Create collection
const User = mongoose.model("User", userSchema);

//Create texbook collection schema
var textbookSchema = new Schema(databaseSchematics.textbookSchema, {collection: "Textbooks"});

//Create collection
const Textbook = mongoose.model("Textbook", textbookSchema);

const resolvers = {
  Query: {
    getUserByAuthId: (_,{authId}) => User.findOne({authId: authId}),
    getTextbooks: () => Textbook.find(),
    getUsers: () => User.find(),
    getUserTextbooks: (_,{authId}) => Textbook.find({authId: authId}),
    getUser: (_,{id}) => User.findById(id)
  },
  Mutation: {
    createUser: async (_, { fname, lname, email, authId } ) => {
        const newUser = new User({fname, lname, email, authId});
        await newUser.save();
        return newUser;
    },
    createTextbook: async (_, { courseCode, textbook, price, imgURL, authId } ) => {
        try {
          let user = await User.findOne({authId: authId}); // Find user by firebase authID
          let userId = user.id; //sets userID to mongo userID not firebaseID
          let dateAndTime = JSON.stringify(utilities.getPostingDateAndTimeInfo());
          const newTextbook = new Textbook({courseCode, textbook, price, imgURL, authId, dateAndTime});
          await newTextbook.save();
          await User.findByIdAndUpdate(userId, {$push : {textbookIds: newTextbook.id}});
          return newTextbook;
        }
        catch (e) {
          console.log(e);
          return null;
        }
    },
    removeUser: async (_, { id } ) => {
      await User.findByIdAndRemove(id); 
      //Need to remove all of the users' textbooks first.
      return true;
    },
    removeTextbook: async (_, { id } ) => {
      try {
        let tb = await Textbook.findById(id);
        let userID = tb.userId;
        //remove texbookID from user array
        await User.findByIdAndUpdate(userID, {$pull : {textbookIds: id}});
        //delete textbook from DB
        await Textbook.findByIdAndRemove(id);
        return true; 
      } catch (e) {
        return false; 
      }
      
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
