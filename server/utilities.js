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
        let timeString = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        return timeString; 
    }
};

module.exports = utilites; 