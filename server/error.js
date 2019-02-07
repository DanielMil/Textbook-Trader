let error = {
    "ERROR_503":"FORBIDDEN",
    "ERROR_500":"INTERNAL SERVICE ERROR",
    "ERROR_400":"BAD REQUEST",
    "ERROR_404":"NOT FOUND",
    "ERROR_200": "OK",

    createError: function(errorCode, messsage) {
        let errorObject = {
            errorCode: errorCode,
            messsage: messsage
        }
        return JSON.stringify(errorObject); 
    },

    createErrorTextbook: function(dateAndTime) {
        let textbook = {
            'courseCode': '',
            'id': '',
            'textbook': '',
            'price': '',
            'authId': '',
            'dateAndTime': dateAndTime
        }
        return textbook;
    }
}

module.exports =  error; 