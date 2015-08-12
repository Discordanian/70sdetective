(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(){

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

};

},{}],2:[function(require,module,exports){
module.exports = function () {
		var first = true;
		var impaired = false;
		var Band = require('./Band.js')();
		var WGO = require('./WGO.js')();
		var Grapevine = require('./Grapevine.js')();

		var impairl = function(b) {
		    WGO.impair(!!b);
		    WGO.refresh();
		    Grapevine.impair(!!b);
		    Grapevine.refresh();
		    Band.impair(!!b);
		    Band.refresh();
		    return impaired;
		};

		var restart = function() {
		    Band.clear();
		    WGO.clear();
		    Grapevine.clear();

		    /* Only bind these events on first pass */
		    if (first) {
			first=false;
			$("#title").click(function()      { Band.incDate(); });
			$("#about").click(function()      { Band.drugoffer("lsd",true); });
			$("#new_game").click(function()   { restart(); });
			$("#tours").click(function()      { Grapevine.otherSong(); Grapevine.refresh(); });
			$("#charts").click(function()     { Grapevine.addItem("You are on the charts"); Grapevine.refresh(); });
			$("#how_to_play").click(function(){ impaired = !impaired; impairl(impaired); });
			$("#releases").click(function()   { WGO.addItem("Releases selected"); WGO.refresh(); });
			$("#drugs").click(function()      { Band.drugoffer("lsd",false); });
		    }

		    return true;
		};

	    // Return public interface
	    return {
		whatever: function() {
		    return true;
		},
		init: function() {
		    return restart();
		},
		impair: function(b) {
		    return impairl(b);
		}
	    }; // end return of public object

};

},{"./Band.js":1,"./Grapevine.js":3,"./WGO.js":4}],3:[function(require,module,exports){
module.exports = function(){

	    // Private vars
	    var impaired = false;
	    var maxitems = 12;
	    var mastercount = 0;
	    var items = [];  // Line items in 
            var random = require('./random.js');

	    var classtypes = [
		"text-muted",
		"text-primary",
		"text-warning",
		"text-primary",
		"text-info",
		"text-warning",
		"text-danger",
		"text-success",
		"text-warning",
		"text-primary",
		"text-warning",
		"text-info",
		"text-danger",
		"text-success",
		"text-info"
	    ];


	    var artists = [
		    "The Bing Bangs",
		    "Modern Shoe",
		    "Team Gordon",
		    "Corey Doctorow",
		    "Kurt (not that one, the other one)",
		    "My Underwear",
		    "Internal Issues",
		    "Cat Video Club",
		    "Navi is my Spirit Guide",
		    "Blue Chicken Nugget",
		    "Yarn Pornography",
		    "6 cylinder Makeup",
		    "The Burlap Peanut",
		    "Tequilla Mockingbird",
		    "Anarkey in the Library",
		    "Brother Tshober"
		    ];

	    var songtitles = [
		    "This is a Tune",
		    "Yodels make me happy",
		    "It's a will roll dammit",
		    "I like popcorn",
		    "My Electrician Made me Sad",
		    "RNG in Hearthstone, FTW",
		    "My third belly button",
		    "Watching YouTube at Work",
		    "The Triforce is pointy",
		    "They grow from spells",
		    "I played a mage and I liked it",
		    "I still play old games",
		    "Java aint javascript",
		    "50 reasons why Java is a fad",
		    "The best part of me is left handed",
		    "It takes a few years to listen to my playlist",
		    "Tangential Cold",
		    "Throwing a quarter and wishing you well",
		    "My google calendar is ridiculous",
		    "Remember when people lined up to buy Windows 95?  Crazy!",
		    "Richard Stallman was my baby sitter",
		    "Looking to Train?",
		    "You do not have the proper stone",
		    "I am not ready",
		    "Buggy video games.  What's up with that?",
		    "Is Call of Duty still a thing?",
		    "I have a million balls and I am the size of a peanut",
		    "Because, you know, the baby"
		    ];

	    // ---------------------- Some private methods ----------------------------------
	    // This function returns 'true' if the case was not solvable 
	    function formatLine(obj) {
		var retval;
		if (impaired) {
			switch(random(4)) {
				case 0: retval = "<p class=\"" + obj.classtype + " lead\">" + rot13(obj.str) + "</p>";
					break;
				case 1: retval = "<p class=\"" + obj.classtype + "\"><mark>" + rot13(obj.str) + "</mark></p>";
					break;
				case 2: retval = "<p class=\"" + obj.classtype + "\"><del>" + rot13(obj.str) + "</del></p>";
					break;
				case 3: retval = "<p class=\"" + obj.classtype + "\"><s>" + rot13(obj.str) + "</s></p>";
					break;
				default: retval = "<p class=\"" + obj.classtype + "\">" + rot13(obj.str) + "</p>";
					break;

			}
		} else {
		    retval = "<p class=\"" + obj.classtype + "\">" + obj.str + "</p>";
		}
		return retval;
	    }

	    function createItem(str) {
		mastercount++;
		var ct = classtypes[mastercount % classtypes.length];
		var retval = { 'classtype' : ct , 'str' : str };
		return retval;
	    }


	    // Return public interface
	    return {
		impair: function(b) {
		    impaired = !!b;
		},
		otherSong: function() {
		    var artist_index = mastercount % artists.length;
		    var song_index = mastercount % songtitles.length;
		    var release_notice = "New single released by '"+ artists[artist_index] +"' called '" + songtitles[song_index] + "'";
		    return this.addItem(release_notice);
		},
		addItem: function(str) {
			 items.push(createItem(str));
			 if ( items.length > maxitems) {
				 items.shift();
			 }
		    return true;
		},
		refresh: function() {
		    var htmlstr = "";
		    var i = 0;
		    for ( ; i < items.length; i++) { 
			    htmlstr = htmlstr.concat(formatLine(items[i])); 
		    }
		    $("#ssglobal").html(htmlstr);
		    return true;
		},
		clear: function() {
		    items = [];
		    artists.shuffle();
		    songtitles.shuffle();
		    this.refresh();
		    return true;
		}
	    }; // end return of public object

};

},{"./random.js":5}],4:[function(require,module,exports){
module.exports = function(){

	    // Private vars
	    var impaired = false;
	    var maxitems = 12;
	    var mastercount = 0;
	    var items = [];  // Line items in 
        var random = require('./random.js');

	    var classtypes = [
		"text-muted",
		"text-primary",
		"text-warning",
		"text-primary",
		"text-info",
		"text-warning",
		"text-danger",
		"text-success",
		"text-warning",
		"text-primary",
		"text-warning",
		"text-info",
		"text-danger",
		"text-success",
		"text-info"
	    ];
	    // ---------------------- Some private methods ----------------------------------
	    // This function returns 'true' if the case was not solvable 
	    function formatLine(obj) {
		var retval;
		if (impaired) {
			switch(random(4)) {
				case 0: retval = "<p class=\"" + obj.classtype + " lead\">" + rot13(obj.str) + "</p>";
					break;
				case 1: retval = "<p class=\"" + obj.classtype + "\"><mark>" + rot13(obj.str) + "</mark></p>";
					break;
				case 2: retval = "<p class=\"" + obj.classtype + "\"><del>" + rot13(obj.str) + "</del></p>";
					break;
				case 3: retval = "<p class=\"" + obj.classtype + "\"><s>" + rot13(obj.str) + "</s></p>";
					break;
				default: retval = "<p class=\"" + obj.classtype + "\">" + rot13(obj.str) + "</p>";
					break;

			}
		} else {
		    retval = "<p class=\"" + obj.classtype + "\">" + obj.str + "</p>";
		}
		return retval;
	    }

	    function createItem(str) {
		mastercount++;
		var ct = classtypes[mastercount % classtypes.length];
		var retval = { 'classtype' : ct , 'str' : str };
		return retval;
	    }

	    // Return public interface
	    return {
		impair: function(b) {
		    impaired = !!b;
		},
		addItem: function(str) {
			 items.push(createItem(str));
			 if ( items.length > maxitems) {
				 items.shift();
			 }
		    return true;
		},
		refresh: function() {
		    var htmlstr = "";
		    var i = 0;
		    for ( ; i < items.length; i++) { 
			    htmlstr = htmlstr.concat(formatLine(items[i])); 
		    }
		    $("#sslocal").html(htmlstr);
		    return htmlstr;
		},
		clear: function() {
		    items = [];
		    this.refresh();
		    return true;
		}
	    }; // end return of public object
};

},{"./random.js":5}],5:[function(require,module,exports){
module.exports = function(target) {
        return Math.floor(Math.random() *target);
};

},{}],6:[function(require,module,exports){
// stonesun.js
var GameManager = require('./GameManager.js')();

$(window).load(GameManager.init);


},{"./GameManager.js":2}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9HYW1lTWFuYWdlci5qcyIsImFwcC9HcmFwZXZpbmUuanMiLCJhcHAvV0dPLmpzIiwiYXBwL3JhbmRvbS5qcyIsImFwcC9zdG9uZXN1bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIFByaXZhdGUgdmFyc1xuICAgICAgICAgICAgdmFyIGJhbmRuYW1lID0gXCJBYmp1cmVyIE5vd2hlcmVcIjtcbiAgICAgICAgICAgIHZhciBtYXN0ZXJpZCA9IDA7IC8vIEp1c3QgYSB1bmlxdWUga2V5XG4gICAgICAgICAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gcGVyc29uYWxcbiAgICAgICAgICAgIHZhciBoZWFsdGggICAgID0gMDtcbiAgICAgICAgICAgIHZhciBjcmVhdGl2aXR5ID0gMDtcbiAgICAgICAgICAgIHZhciBoYXBwaW5lc3MgID0gMDtcbiAgICAgICAgICAgIHZhciBhbGVydG5lc3MgID0gMDtcblxuICAgICAgICAgICAgLy8gdGltZVxuICAgICAgICAgICAgdmFyIGRheWNvdW50ID0gMTtcbiAgICAgICAgICAgIHZhciBkb3cgPSBbXG4gICAgICAgICAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgICAgICAgICBcIk1vbmRheVwiLFxuICAgICAgICAgICAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgICAgICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgICAgICAgICAgXCJUaHVyc2RheVwiLFxuICAgICAgICAgICAgICAgIFwiRnJpZGF5XCIsXG4gICAgICAgICAgICAgICAgXCJTYXR1cmRheVwiXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAvLyBwb3B1bGFyaXR5XG4gICAgICAgICAgICB2YXIgbG9jYWxwID0gMDtcbiAgICAgICAgICAgIHZhciBuYXRpb25hbHAgPSAwO1xuICAgICAgICAgICAgdmFyIGdsb2JhbHAgPSAwO1xuXG4gICAgICAgICAgICB2YXIgZHJ1Z3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibHNkXCIgICAgICAgIDogeyBcImFkZGljdGlvblwiIDogMCwgIFwiZmFjdG9yc1wiIDogeyBcImFkZGljdGlvblwiOiAxMCwgXCJoZWFsdGhcIiA6IDUsIFwiY3JlYXRpdml0eVwiOiAyMCwgXCJoYXBwaW5lc3NcIiA6IDMsIFwiYWxlcnRuZXNzXCIgOiAyMCB9fSxcbiAgICAgICAgICAgICAgICAgICAgXCJhbGNvaG9sXCIgICAgOiB7IFwiYWRkaWN0aW9uXCIgOiAwLCAgXCJmYWN0b3JzXCIgOiB7IFwiYWRkaWN0aW9uXCI6IDEwLCBcImhlYWx0aFwiIDogNSwgXCJjcmVhdGl2aXR5XCI6IDIwLCBcImhhcHBpbmVzc1wiIDogMCwgXCJhbGVydG5lc3NcIiA6IDIwIH19LFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmlqdWFubmFcIiA6IHsgXCJhZGRpY3Rpb25cIiA6IDAsICBcImZhY3RvcnNcIiA6IHsgXCJhZGRpY3Rpb25cIjogMTAsIFwiaGVhbHRoXCIgOiA1LCBcImNyZWF0aXZpdHlcIjogMjAsIFwiaGFwcGluZXNzXCIgOiAwLCBcImFsZXJ0bmVzc1wiIDogMjAgfX0sXG4gICAgICAgICAgICAgICAgICAgIFwiaGVyaW9uXCIgICAgIDogeyBcImFkZGljdGlvblwiIDogMCwgIFwiZmFjdG9yc1wiIDogeyBcImFkZGljdGlvblwiOiAxMCwgXCJoZWFsdGhcIiA6IDUsIFwiY3JlYXRpdml0eVwiOiAyMCwgXCJoYXBwaW5lc3NcIiA6IDAsIFwiYWxlcnRuZXNzXCIgOiAyMCB9fVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHZhciBzaW5nbGVzID0gW107ICAvLyBMaW5lIGl0ZW1zIGluIFxuICAgICAgICAgICAgdmFyIHRvdXJzID0gW107XG5cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkU2luZ2xlKG5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV0dmFsID0geyAnaWQnIDogbWFzdGVyaWQrKywgJ25hbWUnIDogbmFtZSwgJ2xwb3AnIDogMCwgJ25wb3AnIDogMCwgJ2dwb3AnIDogMCB9O1xuICAgICAgICAgICAgICAgIHNpbmdsZXMucHVzaChyZXR2YWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FscCA9IG5hdGlvbmFscCA9IGdsb2JhbHAgPSAwO1xuICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgPSBhbGVydG5lc3MgPSBjcmVhdGl2aXR5ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIGhlYWx0aCA9IDgwO1xuICAgICAgICAgICAgICAgICAgICBkYXljb3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQb3B1bGFyaXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hQZXJzb25hbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwbGF5ZXJfaGVhbHRoXCIpLmh0bWwoaGVhbHRoKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwbGF5ZXJfY3JlYXRpdml0eVwiKS5odG1sKGNyZWF0aXZpdHkpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI3BsYXllcl9oYXBwaW5lc3NcIikuaHRtbChoYXBwaW5lc3MpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI3BsYXllcl9hbGVydG5lc3NcIikuaHRtbChhbGVydG5lc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiByZWZyZXNoUG9wdWxhcml0eSgpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNsb2NhbF9wb3BcIikuaHRtbChsb2NhbHApO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI25hdGlvbmFsX3BvcFwiKS5odG1sKG5hdGlvbmFscCk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjZ2xvYmFsX3BvcFwiKS5odG1sKGdsb2JhbHApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiByZWZyZXNoTmFtZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltcGFpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwocm90MTMoYmFuZG5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjYmFuZG5hbWVcIikuaHRtbChiYW5kbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZXROYW1lIDogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhbmRuYW1lID0gc3RyO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQb3B1bGFyaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoTmFtZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZHJ1Z29mZmVyOiBmdW5jdGlvbihkcnVnbmFtZSwgdGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGRydWduYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxzZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYWxjb2hvbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm1hcmlqdWFubmFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJoZXJpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBkcnVnLHRha2VuIDogXCIgKyBkcnVnbmFtZSArIFwiICwgXCIgKyB0YWtlbiApOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5jRGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRheWNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3ayA9IE1hdGguZmxvb3IoKGRheWNvdW50IC8gNykgKyAxKSAlIDUyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeXIgPSBNYXRoLmZsb29yKChkYXljb3VudCAvIDM2NSkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiN0aW1lX2Rvd1wiKS5odG1sKGRvd1tkYXljb3VudCAlIDddKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiN0aW1lX3llYXJcIikuaHRtbCh5cik7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjdGltZV93ZWVrXCIpLmh0bWwod2spO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5Y291bnQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZmlyc3QgPSB0cnVlO1xuXHRcdHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuXHRcdHZhciBCYW5kID0gcmVxdWlyZSgnLi9CYW5kLmpzJykoKTtcblx0XHR2YXIgV0dPID0gcmVxdWlyZSgnLi9XR08uanMnKSgpO1xuXHRcdHZhciBHcmFwZXZpbmUgPSByZXF1aXJlKCcuL0dyYXBldmluZS5qcycpKCk7XG5cblx0XHR2YXIgaW1wYWlybCA9IGZ1bmN0aW9uKGIpIHtcblx0XHQgICAgV0dPLmltcGFpcighIWIpO1xuXHRcdCAgICBXR08ucmVmcmVzaCgpO1xuXHRcdCAgICBHcmFwZXZpbmUuaW1wYWlyKCEhYik7XG5cdFx0ICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG5cdFx0ICAgIEJhbmQuaW1wYWlyKCEhYik7XG5cdFx0ICAgIEJhbmQucmVmcmVzaCgpO1xuXHRcdCAgICByZXR1cm4gaW1wYWlyZWQ7XG5cdFx0fTtcblxuXHRcdHZhciByZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdFx0ICAgIEJhbmQuY2xlYXIoKTtcblx0XHQgICAgV0dPLmNsZWFyKCk7XG5cdFx0ICAgIEdyYXBldmluZS5jbGVhcigpO1xuXG5cdFx0ICAgIC8qIE9ubHkgYmluZCB0aGVzZSBldmVudHMgb24gZmlyc3QgcGFzcyAqL1xuXHRcdCAgICBpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0PWZhbHNlO1xuXHRcdFx0JChcIiN0aXRsZVwiKS5jbGljayhmdW5jdGlvbigpICAgICAgeyBCYW5kLmluY0RhdGUoKTsgfSk7XG5cdFx0XHQkKFwiI2Fib3V0XCIpLmNsaWNrKGZ1bmN0aW9uKCkgICAgICB7IEJhbmQuZHJ1Z29mZmVyKFwibHNkXCIsdHJ1ZSk7IH0pO1xuXHRcdFx0JChcIiNuZXdfZ2FtZVwiKS5jbGljayhmdW5jdGlvbigpICAgeyByZXN0YXJ0KCk7IH0pO1xuXHRcdFx0JChcIiN0b3Vyc1wiKS5jbGljayhmdW5jdGlvbigpICAgICAgeyBHcmFwZXZpbmUub3RoZXJTb25nKCk7IEdyYXBldmluZS5yZWZyZXNoKCk7IH0pO1xuXHRcdFx0JChcIiNjaGFydHNcIikuY2xpY2soZnVuY3Rpb24oKSAgICAgeyBHcmFwZXZpbmUuYWRkSXRlbShcIllvdSBhcmUgb24gdGhlIGNoYXJ0c1wiKTsgR3JhcGV2aW5lLnJlZnJlc2goKTsgfSk7XG5cdFx0XHQkKFwiI2hvd190b19wbGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7IGltcGFpcmVkID0gIWltcGFpcmVkOyBpbXBhaXJsKGltcGFpcmVkKTsgfSk7XG5cdFx0XHQkKFwiI3JlbGVhc2VzXCIpLmNsaWNrKGZ1bmN0aW9uKCkgICB7IFdHTy5hZGRJdGVtKFwiUmVsZWFzZXMgc2VsZWN0ZWRcIik7IFdHTy5yZWZyZXNoKCk7IH0pO1xuXHRcdFx0JChcIiNkcnVnc1wiKS5jbGljayhmdW5jdGlvbigpICAgICAgeyBCYW5kLmRydWdvZmZlcihcImxzZFwiLGZhbHNlKTsgfSk7XG5cdFx0ICAgIH1cblxuXHRcdCAgICByZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXG5cdCAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuXHQgICAgcmV0dXJuIHtcblx0XHR3aGF0ZXZlcjogZnVuY3Rpb24oKSB7XG5cdFx0ICAgIHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0ICAgIHJldHVybiByZXN0YXJ0KCk7XG5cdFx0fSxcblx0XHRpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcblx0XHQgICAgcmV0dXJuIGltcGFpcmwoYik7XG5cdFx0fVxuXHQgICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG5cblx0ICAgIC8vIFByaXZhdGUgdmFyc1xuXHQgICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG5cdCAgICB2YXIgbWF4aXRlbXMgPSAxMjtcblx0ICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG5cdCAgICB2YXIgaXRlbXMgPSBbXTsgIC8vIExpbmUgaXRlbXMgaW4gXG4gICAgICAgICAgICB2YXIgcmFuZG9tID0gcmVxdWlyZSgnLi9yYW5kb20uanMnKTtcblxuXHQgICAgdmFyIGNsYXNzdHlwZXMgPSBbXG5cdFx0XCJ0ZXh0LW11dGVkXCIsXG5cdFx0XCJ0ZXh0LXByaW1hcnlcIixcblx0XHRcInRleHQtd2FybmluZ1wiLFxuXHRcdFwidGV4dC1wcmltYXJ5XCIsXG5cdFx0XCJ0ZXh0LWluZm9cIixcblx0XHRcInRleHQtd2FybmluZ1wiLFxuXHRcdFwidGV4dC1kYW5nZXJcIixcblx0XHRcInRleHQtc3VjY2Vzc1wiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LXByaW1hcnlcIixcblx0XHRcInRleHQtd2FybmluZ1wiLFxuXHRcdFwidGV4dC1pbmZvXCIsXG5cdFx0XCJ0ZXh0LWRhbmdlclwiLFxuXHRcdFwidGV4dC1zdWNjZXNzXCIsXG5cdFx0XCJ0ZXh0LWluZm9cIlxuXHQgICAgXTtcblxuXG5cdCAgICB2YXIgYXJ0aXN0cyA9IFtcblx0XHQgICAgXCJUaGUgQmluZyBCYW5nc1wiLFxuXHRcdCAgICBcIk1vZGVybiBTaG9lXCIsXG5cdFx0ICAgIFwiVGVhbSBHb3Jkb25cIixcblx0XHQgICAgXCJDb3JleSBEb2N0b3Jvd1wiLFxuXHRcdCAgICBcIkt1cnQgKG5vdCB0aGF0IG9uZSwgdGhlIG90aGVyIG9uZSlcIixcblx0XHQgICAgXCJNeSBVbmRlcndlYXJcIixcblx0XHQgICAgXCJJbnRlcm5hbCBJc3N1ZXNcIixcblx0XHQgICAgXCJDYXQgVmlkZW8gQ2x1YlwiLFxuXHRcdCAgICBcIk5hdmkgaXMgbXkgU3Bpcml0IEd1aWRlXCIsXG5cdFx0ICAgIFwiQmx1ZSBDaGlja2VuIE51Z2dldFwiLFxuXHRcdCAgICBcIllhcm4gUG9ybm9ncmFwaHlcIixcblx0XHQgICAgXCI2IGN5bGluZGVyIE1ha2V1cFwiLFxuXHRcdCAgICBcIlRoZSBCdXJsYXAgUGVhbnV0XCIsXG5cdFx0ICAgIFwiVGVxdWlsbGEgTW9ja2luZ2JpcmRcIixcblx0XHQgICAgXCJBbmFya2V5IGluIHRoZSBMaWJyYXJ5XCIsXG5cdFx0ICAgIFwiQnJvdGhlciBUc2hvYmVyXCJcblx0XHQgICAgXTtcblxuXHQgICAgdmFyIHNvbmd0aXRsZXMgPSBbXG5cdFx0ICAgIFwiVGhpcyBpcyBhIFR1bmVcIixcblx0XHQgICAgXCJZb2RlbHMgbWFrZSBtZSBoYXBweVwiLFxuXHRcdCAgICBcIkl0J3MgYSB3aWxsIHJvbGwgZGFtbWl0XCIsXG5cdFx0ICAgIFwiSSBsaWtlIHBvcGNvcm5cIixcblx0XHQgICAgXCJNeSBFbGVjdHJpY2lhbiBNYWRlIG1lIFNhZFwiLFxuXHRcdCAgICBcIlJORyBpbiBIZWFydGhzdG9uZSwgRlRXXCIsXG5cdFx0ICAgIFwiTXkgdGhpcmQgYmVsbHkgYnV0dG9uXCIsXG5cdFx0ICAgIFwiV2F0Y2hpbmcgWW91VHViZSBhdCBXb3JrXCIsXG5cdFx0ICAgIFwiVGhlIFRyaWZvcmNlIGlzIHBvaW50eVwiLFxuXHRcdCAgICBcIlRoZXkgZ3JvdyBmcm9tIHNwZWxsc1wiLFxuXHRcdCAgICBcIkkgcGxheWVkIGEgbWFnZSBhbmQgSSBsaWtlZCBpdFwiLFxuXHRcdCAgICBcIkkgc3RpbGwgcGxheSBvbGQgZ2FtZXNcIixcblx0XHQgICAgXCJKYXZhIGFpbnQgamF2YXNjcmlwdFwiLFxuXHRcdCAgICBcIjUwIHJlYXNvbnMgd2h5IEphdmEgaXMgYSBmYWRcIixcblx0XHQgICAgXCJUaGUgYmVzdCBwYXJ0IG9mIG1lIGlzIGxlZnQgaGFuZGVkXCIsXG5cdFx0ICAgIFwiSXQgdGFrZXMgYSBmZXcgeWVhcnMgdG8gbGlzdGVuIHRvIG15IHBsYXlsaXN0XCIsXG5cdFx0ICAgIFwiVGFuZ2VudGlhbCBDb2xkXCIsXG5cdFx0ICAgIFwiVGhyb3dpbmcgYSBxdWFydGVyIGFuZCB3aXNoaW5nIHlvdSB3ZWxsXCIsXG5cdFx0ICAgIFwiTXkgZ29vZ2xlIGNhbGVuZGFyIGlzIHJpZGljdWxvdXNcIixcblx0XHQgICAgXCJSZW1lbWJlciB3aGVuIHBlb3BsZSBsaW5lZCB1cCB0byBidXkgV2luZG93cyA5NT8gIENyYXp5IVwiLFxuXHRcdCAgICBcIlJpY2hhcmQgU3RhbGxtYW4gd2FzIG15IGJhYnkgc2l0dGVyXCIsXG5cdFx0ICAgIFwiTG9va2luZyB0byBUcmFpbj9cIixcblx0XHQgICAgXCJZb3UgZG8gbm90IGhhdmUgdGhlIHByb3BlciBzdG9uZVwiLFxuXHRcdCAgICBcIkkgYW0gbm90IHJlYWR5XCIsXG5cdFx0ICAgIFwiQnVnZ3kgdmlkZW8gZ2FtZXMuICBXaGF0J3MgdXAgd2l0aCB0aGF0P1wiLFxuXHRcdCAgICBcIklzIENhbGwgb2YgRHV0eSBzdGlsbCBhIHRoaW5nP1wiLFxuXHRcdCAgICBcIkkgaGF2ZSBhIG1pbGxpb24gYmFsbHMgYW5kIEkgYW0gdGhlIHNpemUgb2YgYSBwZWFudXRcIixcblx0XHQgICAgXCJCZWNhdXNlLCB5b3Uga25vdywgdGhlIGJhYnlcIlxuXHRcdCAgICBdO1xuXG5cdCAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFNvbWUgcHJpdmF0ZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcblx0ICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUob2JqKSB7XG5cdFx0dmFyIHJldHZhbDtcblx0XHRpZiAoaW1wYWlyZWQpIHtcblx0XHRcdHN3aXRjaChyYW5kb20oNCkpIHtcblx0XHRcdFx0Y2FzZSAwOiByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMTogcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMjogcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDM6IHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OiByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHQgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0dmFsO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0cikge1xuXHRcdG1hc3RlcmNvdW50Kys7XG5cdFx0dmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcblx0XHR2YXIgcmV0dmFsID0geyAnY2xhc3N0eXBlJyA6IGN0ICwgJ3N0cicgOiBzdHIgfTtcblx0XHRyZXR1cm4gcmV0dmFsO1xuXHQgICAgfVxuXG5cblx0ICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG5cdCAgICByZXR1cm4ge1xuXHRcdGltcGFpcjogZnVuY3Rpb24oYikge1xuXHRcdCAgICBpbXBhaXJlZCA9ICEhYjtcblx0XHR9LFxuXHRcdG90aGVyU29uZzogZnVuY3Rpb24oKSB7XG5cdFx0ICAgIHZhciBhcnRpc3RfaW5kZXggPSBtYXN0ZXJjb3VudCAlIGFydGlzdHMubGVuZ3RoO1xuXHRcdCAgICB2YXIgc29uZ19pbmRleCA9IG1hc3RlcmNvdW50ICUgc29uZ3RpdGxlcy5sZW5ndGg7XG5cdFx0ICAgIHZhciByZWxlYXNlX25vdGljZSA9IFwiTmV3IHNpbmdsZSByZWxlYXNlZCBieSAnXCIrIGFydGlzdHNbYXJ0aXN0X2luZGV4XSArXCInIGNhbGxlZCAnXCIgKyBzb25ndGl0bGVzW3NvbmdfaW5kZXhdICsgXCInXCI7XG5cdFx0ICAgIHJldHVybiB0aGlzLmFkZEl0ZW0ocmVsZWFzZV9ub3RpY2UpO1xuXHRcdH0sXG5cdFx0YWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHQgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuXHRcdFx0IGlmICggaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcblx0XHRcdFx0IGl0ZW1zLnNoaWZ0KCk7XG5cdFx0XHQgfVxuXHRcdCAgICByZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICB2YXIgaHRtbHN0ciA9IFwiXCI7XG5cdFx0ICAgIHZhciBpID0gMDtcblx0XHQgICAgZm9yICggOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHsgXG5cdFx0XHQgICAgaHRtbHN0ciA9IGh0bWxzdHIuY29uY2F0KGZvcm1hdExpbmUoaXRlbXNbaV0pKTsgXG5cdFx0ICAgIH1cblx0XHQgICAgJChcIiNzc2dsb2JhbFwiKS5odG1sKGh0bWxzdHIpO1xuXHRcdCAgICByZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdGNsZWFyOiBmdW5jdGlvbigpIHtcblx0XHQgICAgaXRlbXMgPSBbXTtcblx0XHQgICAgYXJ0aXN0cy5zaHVmZmxlKCk7XG5cdFx0ICAgIHNvbmd0aXRsZXMuc2h1ZmZsZSgpO1xuXHRcdCAgICB0aGlzLnJlZnJlc2goKTtcblx0XHQgICAgcmV0dXJuIHRydWU7XG5cdFx0fVxuXHQgICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG5cblx0ICAgIC8vIFByaXZhdGUgdmFyc1xuXHQgICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG5cdCAgICB2YXIgbWF4aXRlbXMgPSAxMjtcblx0ICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG5cdCAgICB2YXIgaXRlbXMgPSBbXTsgIC8vIExpbmUgaXRlbXMgaW4gXG4gICAgICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS5qcycpO1xuXG5cdCAgICB2YXIgY2xhc3N0eXBlcyA9IFtcblx0XHRcInRleHQtbXV0ZWRcIixcblx0XHRcInRleHQtcHJpbWFyeVwiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LXByaW1hcnlcIixcblx0XHRcInRleHQtaW5mb1wiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LWRhbmdlclwiLFxuXHRcdFwidGV4dC1zdWNjZXNzXCIsXG5cdFx0XCJ0ZXh0LXdhcm5pbmdcIixcblx0XHRcInRleHQtcHJpbWFyeVwiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LWluZm9cIixcblx0XHRcInRleHQtZGFuZ2VyXCIsXG5cdFx0XCJ0ZXh0LXN1Y2Nlc3NcIixcblx0XHRcInRleHQtaW5mb1wiXG5cdCAgICBdO1xuXHQgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAgICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgJ3RydWUnIGlmIHRoZSBjYXNlIHdhcyBub3Qgc29sdmFibGUgXG5cdCAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuXHRcdHZhciByZXR2YWw7XG5cdFx0aWYgKGltcGFpcmVkKSB7XG5cdFx0XHRzd2l0Y2gocmFuZG9tKDQpKSB7XG5cdFx0XHRcdGNhc2UgMDogcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCIgbGVhZFxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDE6IHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48bWFyaz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L21hcms+PC9wPlwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDI6IHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48ZGVsPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvZGVsPjwvcD5cIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzOiByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PHM+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9zPjwvcD5cIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDogcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0ICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIG9iai5zdHIgKyBcIjwvcD5cIjtcblx0XHR9XG5cdFx0cmV0dXJuIHJldHZhbDtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcblx0XHRtYXN0ZXJjb3VudCsrO1xuXHRcdHZhciBjdCA9IGNsYXNzdHlwZXNbbWFzdGVyY291bnQgJSBjbGFzc3R5cGVzLmxlbmd0aF07XG5cdFx0dmFyIHJldHZhbCA9IHsgJ2NsYXNzdHlwZScgOiBjdCAsICdzdHInIDogc3RyIH07XG5cdFx0cmV0dXJuIHJldHZhbDtcblx0ICAgIH1cblxuXHQgICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2Vcblx0ICAgIHJldHVybiB7XG5cdFx0aW1wYWlyOiBmdW5jdGlvbihiKSB7XG5cdFx0ICAgIGltcGFpcmVkID0gISFiO1xuXHRcdH0sXG5cdFx0YWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHQgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuXHRcdFx0IGlmICggaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcblx0XHRcdFx0IGl0ZW1zLnNoaWZ0KCk7XG5cdFx0XHQgfVxuXHRcdCAgICByZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICB2YXIgaHRtbHN0ciA9IFwiXCI7XG5cdFx0ICAgIHZhciBpID0gMDtcblx0XHQgICAgZm9yICggOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHsgXG5cdFx0XHQgICAgaHRtbHN0ciA9IGh0bWxzdHIuY29uY2F0KGZvcm1hdExpbmUoaXRlbXNbaV0pKTsgXG5cdFx0ICAgIH1cblx0XHQgICAgJChcIiNzc2xvY2FsXCIpLmh0bWwoaHRtbHN0cik7XG5cdFx0ICAgIHJldHVybiBodG1sc3RyO1xuXHRcdH0sXG5cdFx0Y2xlYXI6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICBpdGVtcyA9IFtdO1xuXHRcdCAgICB0aGlzLnJlZnJlc2goKTtcblx0XHQgICAgcmV0dXJuIHRydWU7XG5cdFx0fVxuXHQgICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqdGFyZ2V0KTtcbn07XG4iLCIvLyBzdG9uZXN1bi5qc1xudmFyIEdhbWVNYW5hZ2VyID0gcmVxdWlyZSgnLi9HYW1lTWFuYWdlci5qcycpKCk7XG5cbiQod2luZG93KS5sb2FkKEdhbWVNYW5hZ2VyLmluaXQpO1xuXG4iXX0=
