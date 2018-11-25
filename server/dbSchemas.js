
let SchemasTemplates = {
    userSchema : {
        fname :  String,
        lname :  String,
        email : String,
        textbookIds : [String],
        authId : String
    },

    textbookSchema : {
        courseCode : String,
        userID : String
    }
};
module.exports = SchemasTemplates;