module.export = {
        band : function () {

            // Private vars
            var bandname = "Abjurer Nowhere";
            var masterid = 0; // Just a unique key
            var impaired = false;

            // personal
            var health     = 0;
            var creativity = 0;
            var happiness  = 0;
            var alertness  = 0;

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

            var drugs = {
                    "lsd"        : { "addiction" : 0,  "factors" : { "addiction": 10, "health" : 5, "creativity": 20, "happiness" : 3, "alertness" : 20 }},
                    "alcohol"    : { "addiction" : 0,  "factors" : { "addiction": 10, "health" : 5, "creativity": 20, "happiness" : 0, "alertness" : 20 }},
                    "marijuanna" : { "addiction" : 0,  "factors" : { "addiction": 10, "health" : 5, "creativity": 20, "happiness" : 0, "alertness" : 20 }},
                    "herion"     : { "addiction" : 0,  "factors" : { "addiction": 10, "health" : 5, "creativity": 20, "happiness" : 0, "alertness" : 20 }}
                    };


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
                    happiness = alertness = creativity = 50;
                    health = 80;
                    daycount = 1;
                    score = 0;
                    refreshPersonal();
                    refreshPopularity();
            }

            function refreshPersonal() {
                    $("#player_health").html(health);
                    $("#player_creativity").html(creativity);
                    $("#player_happiness").html(happiness);
                    $("#player_alertness").html(alertness);
            }

            function refreshPopularity() {
                    $("#local_pop").html(localp);
                    $("#national_pop").html(nationalp);
                    $("#global_pop").html(globalp);
            }

            function refreshName() {
                    if (impaired) {
                        $("#bandname").html(rot13(bandname));
                    } else {
                        $("#bandname").html(bandname);
                    }
            }


            // Return public interface
            return {
                setName : function(str) {
                    bandname = str;
                    $("#bandname").html(bandname);
                },
                impair: function(b) {
                    impaired = !!b;
                },
                refresh: function() {
                        refreshPersonal();
                        refreshPopularity();
                        refreshName();
                },
                drugoffer: function(drugname, taken) {
                    switch(drugname) {
                            case "lsd":
                                    if(taken) {
                                        happiness += drugs.lsd.factors.happiness;
                                    } else {
                                        happiness -= drugs.lsd.factors.happiness;
                                    }
                                    refreshPersonal();
                                    break;
                            case "alcohol":
                                    break;
                            case "marijuanna":
                                    break;
                            case "herion":
                                    break;
                            default:
                                   console.log("Unknown drug,taken : " + drugname + " , " + taken ); 
                    }
                    
                },
                restart: function() {
                    return init();
                },
                incDate: function() {
                    daycount++;
                    var wk = Math.floor((daycount / 7) + 1) % 52;
                    var yr = Math.floor((daycount / 365) + 1);
                    $("#time_dow").html(dow[daycount % 7]);
                    $("#time_year").html(yr);
                    $("#time_week").html(wk);
                    return daycount;
                },
                clear: function() {
                    return init();
                }
            }; // end return of public object

        }
};
