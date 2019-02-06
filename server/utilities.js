const utilites = {
    
    getPostingDateAndTimeInfo: function() {
        const date = new Date();
        let dateObject = {
            date: "",
            time: ""
        };
        dateObject.date = date.toDateString(); 
        dateObject.time = this.formatTimeString(); 
        return dateObject;
    },

    formatTimeString: function() {
        let time = new Date(); 
        let timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        return timeString; 
    },

    getTextbooksSorted: function(textBooks) {
        // let arr = [];
        // textBooks.forEach((textbook) => {
        //     arr.push(textbook);
        // });
        // if (textBooks.length === 0 || textBooks === null) {
        //     textBooks.push(this.createError('404', 'No textbooks found with that course code.'));
        // }
        console.log(textBooks); 
        return textBooks; 
    },

    createError: function(errorCode, messsage) {
        let errorObject = {
            errorCode: errorCode,
            messsage: messsage
        }
        return errorObject; 
    }

};

module.exports = utilites; 