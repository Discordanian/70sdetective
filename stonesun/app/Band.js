var Band = function () {

    // Private vars
    var name = "";
    var masterid = 0; // Just a unique key

    // personal
    var health = 0;
    var creativity = 0;
    var happiness = 0;
    var altertness = 0;

    // time
    var daycount = 1;
    var dow = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    // popularity
    var localp = 0;
    var nationalp = 0;
    var globalp = 0;

    // addictions
    var lsd = 0;
    var alcohol = 0;
    var herion = 0;
    var marijuanna = 0;




    var singles = [];  // Line items in 
    var tours = [];

    // ---------------------- Some private methods ----------------------------------
    // This function returns 'true' if the case was not solvable 
    function addSingle(name) {
        var retval = { 'id' : masterid++, 'name' : name, 'lpop' : 0, 'npop' : 0, 'gpop' : 0 };
        singles.push(retval);
        return retval;
    }

    function init() {
            localp = nationalp = globalp = 0;
            happiness = alertness = creativeness = 50;
            health = 80;
            daycount = 1;
    }


    // Return public interface
    return {
        restart: function() {
            return init();
        },
        incDate: function() {
            daycount++;
            var wk = Math.floor((daycount / 7) + 1);
            var yr = Math.floor((wk / 52) + 1);
            $("#time_dow").html(dow[daycount]);
            $("#time_year").html(yr);
            $("#time_week").html(wk);
            return daycount;
        },
        clear: function() {
            return init();
        }
    }; // end return of public object

}();
