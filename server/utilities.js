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
        return textBooks.reverse(); 
    },

    // This needs to be called when textbooks are created 
    validateCourseCode: function(courseCode) {
        return /^[A-Za-z]{4}\d{4}$/.test(courseCode);
    },

    validatePrice: function(price) {
        //TODO: Regex to check price
    }
};

module.exports = utilites; 