define([
    'lib/date-offset'
], function () {
    if (Date.prototype.getMonthName === undefined) {
        Date.prototype.getMonthName = function(/*locale not yet supported*/) {
            var month_names = ['January', 'February', 'March',
                               'April', 'May', 'June',
                               'July', 'August', 'September',
                               'October', 'November', 'December'];
                           
            return month_names[this.getMonth()];
        }
    }
    
    if (Date.prototype.getMonthShortName === undefined) {
        Date.prototype.getMonthShortName = function(/*locale not yet supported*/) {
            var month_names = ['Jan', 'Feb', 'Mar',
                               'Apr', 'May', 'Jun',
                               'Jul', 'Aug', 'Sep',
                               'Oct', 'Nov', 'Dec'];
                           
            return month_names[this.getMonth()];
        }
    }
    
    if (Date.prototype.getDateString === undefined) {
        Date.prototype.getDateString = function() {
            var date = this.getDate();
            return date < 10 ? '0'+date : ''+date;
        }
    }
    
    if (Date.prototype.getTwitterTime === undefined) {
        Date.prototype.getTwitterTime = function() {
            var time_to_now = this.getOffset();
            
            if (time_to_now.inMinutes() < 1) {
                return parseInt(time_to_now.inSeconds()) + 's';
            } else if (time_to_now.inHours() < 1) {
                return parseInt(time_to_now.inMinutes()) + 'm';
            } else if (time_to_now.inDays() < 1) {
                return parseInt(time_to_now.inHours()) + 'h';
            } else if (time_to_now.inYears() < 1) {
                return this.getMonthShortName() + " " + this.getDateString();
            }
            
            return this.getMonthShortName() + " " + this.getDateString() + ', ' + this.getFullYear();
        }
    }
});