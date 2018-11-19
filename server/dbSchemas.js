
let SchemasTemplates = {
    userSchema : {
        name :  String,
        email : String,
        textbookIds : [String]
    },

    textbookSchema : {
        courseCode : String,
        userID : String
    }
};
module.exports = SchemasTemplates;