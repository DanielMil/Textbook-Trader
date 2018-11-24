
let SchemasTemplates = {
    userSchema : {
        name :  String,
        email : String,
        textbookIds : [String],
        password: String,
        authId : String
    },

    textbookSchema : {
        courseCode : String,
        userID : String
    }
};
module.exports = SchemasTemplates;