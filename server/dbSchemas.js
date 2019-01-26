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
        textbook: String,
        price: String,
        imgURL: String,
        authId : String,
        dateAndTime : String
    }
};
module.exports = SchemasTemplates;