const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const databaseSchematics = require('./dbSchemas.js');
const typeDefs = require('./typedefs');


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
    getTextbooks: () => Textbook.find(),
    getUsers: () => User.find(),
    getUserTextbooks: (_,{id}) => Textbook.find({id: id}),
    getUser: (_,{id}) => User.findById(id),
    login: async (_, {name, password}) => {

      let user = await User.findOne({name: name}); // Find user by username
      let hash = user.password; //Get the hashed password
      let match = await bcrypt.compare(password, hash); //compare the inputed pass with hashed pass

      if (match) {

        //Find a user with the username and hash
        let user = await User.collection.findOne({
          name: name, 
          password: hash
        });

        //if a the user exists, return true
        if (user) 
          return true
      }
      return false;
    }
  },
  Mutation: {
    createUser: async (_, { name, email, password } ) => {
        let hashedPass = await bcrypt.hash(password, 12);
        const newUser = new User({name, email, password: hashedPass});
        await newUser.save();
        return newUser;
    },
    createTextbook: async (_, { courseCode, userID } ) => {
        const newTextbook =  new Textbook({courseCode, userID});
        await newTextbook.save();
        await User.findByIdAndUpdate(userID, {$push : {textbookIds: newTextbook.id}});
        return newTextbook;
    },
    removeUser: async (_, { id } ) => {
      await User.findByIdAndRemove(id); 
      return true;
    },
    removeTextbook: async (_, { id } ) => {
      let tb = await Textbook.findById(id);
      let userID = tb.userID;
      //remove texbookID from user array
      await User.findByIdAndUpdate(userID, {$pull : {textbookIds: id}});
      //delete textbook from DB
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
