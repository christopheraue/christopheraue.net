define(function() {
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }
    
    /*
     *  date - Date
     *  reference_date - Date
     */
    var DateOffset = function(date, reference_date) {
        var date_in_millisecs = date.getTime(),
            reference_in_millisecs = reference_date.getTime();
        
        this.valueOf = function() {
            return reference_in_millisecs - date_in_millisecs;
        }
    };
    
    DateOffset.prototype = {
        inSeconds: function() {
            var one_second_in_millisecs = 1000;
            return this / one_second_in_millisecs;
        },
        
        inMinutes: function() {
            var one_minute_in_millisecs = 1000*60;
            return this / one_minute_in_millisecs;
        },
        
        inHours: function() {
            var one_hour_in_millisecs = 1000*60*60;
            return this / one_hour_in_millisecs;
        },
        
        inDays: function() {
            var one_day_in_millisecs = 1000*60*60*24;
            return this / one_day_in_millisecs;
        },
        
        inYears: function() {
            var one_year_in_millisecs = 1000*60*60*24*365; //don't date leap years into account
            return this / one_year_in_millisecs;
        }
    }
    
    if (Date.prototype.getOffset !== undefined)
        return;
    
    /*
     *  reference - Date || undefined
     */
    Date.prototype.getOffset = function(reference) {
        if (reference === undefined) {
            reference = new Date(Date.now());
        }
        
        return new DateOffset(this, reference);
    }
});