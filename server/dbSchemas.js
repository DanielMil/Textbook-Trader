
let SchemasTemplates = {
    userSchema : {
        name :  String,
        email : String,
        textbookIds : [String],
        password: String
    },

    textbookSchema : {
        courseCode : String,
        userID : String
    }
};
module.exports = SchemasTemplates;