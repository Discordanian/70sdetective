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

},{}],4:[function(require,module,exports){
module.exports = function(){

	    // Private vars
	    var impaired = false;
	    var maxitems = 12;
	    var mastercount = 0;
	    var items = [];  // Line items in 

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

},{}],5:[function(require,module,exports){
// stonesun.js
var GameManager = require('./GameManager.js')();

$(window).load(GameManager.init);


},{"./GameManager.js":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9HYW1lTWFuYWdlci5qcyIsImFwcC9HcmFwZXZpbmUuanMiLCJhcHAvV0dPLmpzIiwiYXBwL3N0b25lc3VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAvLyBQcml2YXRlIHZhcnNcbiAgICAgICAgICAgIHZhciBiYW5kbmFtZSA9IFwiQWJqdXJlciBOb3doZXJlXCI7XG4gICAgICAgICAgICB2YXIgbWFzdGVyaWQgPSAwOyAvLyBKdXN0IGEgdW5pcXVlIGtleVxuICAgICAgICAgICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHBlcnNvbmFsXG4gICAgICAgICAgICB2YXIgaGVhbHRoICAgICA9IDA7XG4gICAgICAgICAgICB2YXIgY3JlYXRpdml0eSA9IDA7XG4gICAgICAgICAgICB2YXIgaGFwcGluZXNzICA9IDA7XG4gICAgICAgICAgICB2YXIgYWxlcnRuZXNzICA9IDA7XG5cbiAgICAgICAgICAgIC8vIHRpbWVcbiAgICAgICAgICAgIHZhciBkYXljb3VudCA9IDE7XG4gICAgICAgICAgICB2YXIgZG93ID0gW1xuICAgICAgICAgICAgICAgIFwiU3VuZGF5XCIsXG4gICAgICAgICAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgICAgICAgICBcIlR1ZXNkYXlcIixcbiAgICAgICAgICAgICAgICBcIldlZG5lc2RheVwiLFxuICAgICAgICAgICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgICAgICAgICBcIkZyaWRheVwiLFxuICAgICAgICAgICAgICAgIFwiU2F0dXJkYXlcIlxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgLy8gcG9wdWxhcml0eVxuICAgICAgICAgICAgdmFyIGxvY2FscCA9IDA7XG4gICAgICAgICAgICB2YXIgbmF0aW9uYWxwID0gMDtcbiAgICAgICAgICAgIHZhciBnbG9iYWxwID0gMDtcblxuICAgICAgICAgICAgdmFyIGRydWdzID0ge1xuICAgICAgICAgICAgICAgICAgICBcImxzZFwiICAgICAgICA6IHsgXCJhZGRpY3Rpb25cIiA6IDAsICBcImZhY3RvcnNcIiA6IHsgXCJhZGRpY3Rpb25cIjogMTAsIFwiaGVhbHRoXCIgOiA1LCBcImNyZWF0aXZpdHlcIjogMjAsIFwiaGFwcGluZXNzXCIgOiAzLCBcImFsZXJ0bmVzc1wiIDogMjAgfX0sXG4gICAgICAgICAgICAgICAgICAgIFwiYWxjb2hvbFwiICAgIDogeyBcImFkZGljdGlvblwiIDogMCwgIFwiZmFjdG9yc1wiIDogeyBcImFkZGljdGlvblwiOiAxMCwgXCJoZWFsdGhcIiA6IDUsIFwiY3JlYXRpdml0eVwiOiAyMCwgXCJoYXBwaW5lc3NcIiA6IDAsIFwiYWxlcnRuZXNzXCIgOiAyMCB9fSxcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJpanVhbm5hXCIgOiB7IFwiYWRkaWN0aW9uXCIgOiAwLCAgXCJmYWN0b3JzXCIgOiB7IFwiYWRkaWN0aW9uXCI6IDEwLCBcImhlYWx0aFwiIDogNSwgXCJjcmVhdGl2aXR5XCI6IDIwLCBcImhhcHBpbmVzc1wiIDogMCwgXCJhbGVydG5lc3NcIiA6IDIwIH19LFxuICAgICAgICAgICAgICAgICAgICBcImhlcmlvblwiICAgICA6IHsgXCJhZGRpY3Rpb25cIiA6IDAsICBcImZhY3RvcnNcIiA6IHsgXCJhZGRpY3Rpb25cIjogMTAsIFwiaGVhbHRoXCIgOiA1LCBcImNyZWF0aXZpdHlcIjogMjAsIFwiaGFwcGluZXNzXCIgOiAwLCBcImFsZXJ0bmVzc1wiIDogMjAgfX1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB2YXIgc2luZ2xlcyA9IFtdOyAgLy8gTGluZSBpdGVtcyBpbiBcbiAgICAgICAgICAgIHZhciB0b3VycyA9IFtdO1xuXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFNvbWUgcHJpdmF0ZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFNpbmdsZShuYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJldHZhbCA9IHsgJ2lkJyA6IG1hc3RlcmlkKyssICduYW1lJyA6IG5hbWUsICdscG9wJyA6IDAsICducG9wJyA6IDAsICdncG9wJyA6IDAgfTtcbiAgICAgICAgICAgICAgICBzaW5nbGVzLnB1c2gocmV0dmFsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbHAgPSBuYXRpb25hbHAgPSBnbG9iYWxwID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzID0gYWxlcnRuZXNzID0gY3JlYXRpdml0eSA9IDUwO1xuICAgICAgICAgICAgICAgICAgICBoZWFsdGggPSA4MDtcbiAgICAgICAgICAgICAgICAgICAgZGF5Y291bnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiByZWZyZXNoUGVyc29uYWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjcGxheWVyX2hlYWx0aFwiKS5odG1sKGhlYWx0aCk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjcGxheWVyX2NyZWF0aXZpdHlcIikuaHRtbChjcmVhdGl2aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwbGF5ZXJfaGFwcGluZXNzXCIpLmh0bWwoaGFwcGluZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwbGF5ZXJfYWxlcnRuZXNzXCIpLmh0bWwoYWxlcnRuZXNzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcmVmcmVzaFBvcHVsYXJpdHkoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjbG9jYWxfcG9wXCIpLmh0bWwobG9jYWxwKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNuYXRpb25hbF9wb3BcIikuaHRtbChuYXRpb25hbHApO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2dsb2JhbF9wb3BcIikuaHRtbChnbG9iYWxwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcmVmcmVzaE5hbWUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKHJvdDEzKGJhbmRuYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2V0TmFtZSA6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgICAgICBiYW5kbmFtZSA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKGJhbmRuYW1lKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaE5hbWUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRydWdvZmZlcjogZnVuY3Rpb24oZHJ1Z25hbWUsIHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChkcnVnbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsc2RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLmxzZC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmxzZC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFsY29ob2xcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXJpanVhbm5hXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGVyaW9uXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gZHJ1Zyx0YWtlbiA6IFwiICsgZHJ1Z25hbWUgKyBcIiAsIFwiICsgdGFrZW4gKTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGluY0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkYXljb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2sgPSBNYXRoLmZsb29yKChkYXljb3VudCAvIDcpICsgMSkgJSA1MjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlyID0gTWF0aC5mbG9vcigoZGF5Y291bnQgLyAzNjUpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjdGltZV9kb3dcIikuaHRtbChkb3dbZGF5Y291bnQgJSA3XSk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjdGltZV95ZWFyXCIpLmh0bWwoeXIpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI3RpbWVfd2Vla1wiKS5odG1sKHdrKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRheWNvdW50O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGZpcnN0ID0gdHJ1ZTtcblx0XHR2YXIgaW1wYWlyZWQgPSBmYWxzZTtcblx0XHR2YXIgQmFuZCA9IHJlcXVpcmUoJy4vQmFuZC5qcycpKCk7XG5cdFx0dmFyIFdHTyA9IHJlcXVpcmUoJy4vV0dPLmpzJykoKTtcblx0XHR2YXIgR3JhcGV2aW5lID0gcmVxdWlyZSgnLi9HcmFwZXZpbmUuanMnKSgpO1xuXG5cdFx0dmFyIGltcGFpcmwgPSBmdW5jdGlvbihiKSB7XG5cdFx0ICAgIFdHTy5pbXBhaXIoISFiKTtcblx0XHQgICAgV0dPLnJlZnJlc2goKTtcblx0XHQgICAgR3JhcGV2aW5lLmltcGFpcighIWIpO1xuXHRcdCAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuXHRcdCAgICBCYW5kLmltcGFpcighIWIpO1xuXHRcdCAgICBCYW5kLnJlZnJlc2goKTtcblx0XHQgICAgcmV0dXJuIGltcGFpcmVkO1xuXHRcdH07XG5cblx0XHR2YXIgcmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRcdCAgICBCYW5kLmNsZWFyKCk7XG5cdFx0ICAgIFdHTy5jbGVhcigpO1xuXHRcdCAgICBHcmFwZXZpbmUuY2xlYXIoKTtcblxuXHRcdCAgICAvKiBPbmx5IGJpbmQgdGhlc2UgZXZlbnRzIG9uIGZpcnN0IHBhc3MgKi9cblx0XHQgICAgaWYgKGZpcnN0KSB7XG5cdFx0XHRmaXJzdD1mYWxzZTtcblx0XHRcdCQoXCIjdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKSAgICAgIHsgQmFuZC5pbmNEYXRlKCk7IH0pO1xuXHRcdFx0JChcIiNhYm91dFwiKS5jbGljayhmdW5jdGlvbigpICAgICAgeyBCYW5kLmRydWdvZmZlcihcImxzZFwiLHRydWUpOyB9KTtcblx0XHRcdCQoXCIjbmV3X2dhbWVcIikuY2xpY2soZnVuY3Rpb24oKSAgIHsgcmVzdGFydCgpOyB9KTtcblx0XHRcdCQoXCIjdG91cnNcIikuY2xpY2soZnVuY3Rpb24oKSAgICAgIHsgR3JhcGV2aW5lLm90aGVyU29uZygpOyBHcmFwZXZpbmUucmVmcmVzaCgpOyB9KTtcblx0XHRcdCQoXCIjY2hhcnRzXCIpLmNsaWNrKGZ1bmN0aW9uKCkgICAgIHsgR3JhcGV2aW5lLmFkZEl0ZW0oXCJZb3UgYXJlIG9uIHRoZSBjaGFydHNcIik7IEdyYXBldmluZS5yZWZyZXNoKCk7IH0pO1xuXHRcdFx0JChcIiNob3dfdG9fcGxheVwiKS5jbGljayhmdW5jdGlvbigpeyBpbXBhaXJlZCA9ICFpbXBhaXJlZDsgaW1wYWlybChpbXBhaXJlZCk7IH0pO1xuXHRcdFx0JChcIiNyZWxlYXNlc1wiKS5jbGljayhmdW5jdGlvbigpICAgeyBXR08uYWRkSXRlbShcIlJlbGVhc2VzIHNlbGVjdGVkXCIpOyBXR08ucmVmcmVzaCgpOyB9KTtcblx0XHRcdCQoXCIjZHJ1Z3NcIikuY2xpY2soZnVuY3Rpb24oKSAgICAgIHsgQmFuZC5kcnVnb2ZmZXIoXCJsc2RcIixmYWxzZSk7IH0pO1xuXHRcdCAgICB9XG5cblx0XHQgICAgcmV0dXJuIHRydWU7XG5cdFx0fTtcblxuXHQgICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2Vcblx0ICAgIHJldHVybiB7XG5cdFx0d2hhdGV2ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICByZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICByZXR1cm4gcmVzdGFydCgpO1xuXHRcdH0sXG5cdFx0aW1wYWlyOiBmdW5jdGlvbihiKSB7XG5cdFx0ICAgIHJldHVybiBpbXBhaXJsKGIpO1xuXHRcdH1cblx0ICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuXG5cdCAgICAvLyBQcml2YXRlIHZhcnNcblx0ICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuXHQgICAgdmFyIG1heGl0ZW1zID0gMTI7XG5cdCAgICB2YXIgbWFzdGVyY291bnQgPSAwO1xuXHQgICAgdmFyIGl0ZW1zID0gW107ICAvLyBMaW5lIGl0ZW1zIGluIFxuXG5cdCAgICB2YXIgY2xhc3N0eXBlcyA9IFtcblx0XHRcInRleHQtbXV0ZWRcIixcblx0XHRcInRleHQtcHJpbWFyeVwiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LXByaW1hcnlcIixcblx0XHRcInRleHQtaW5mb1wiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LWRhbmdlclwiLFxuXHRcdFwidGV4dC1zdWNjZXNzXCIsXG5cdFx0XCJ0ZXh0LXdhcm5pbmdcIixcblx0XHRcInRleHQtcHJpbWFyeVwiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LWluZm9cIixcblx0XHRcInRleHQtZGFuZ2VyXCIsXG5cdFx0XCJ0ZXh0LXN1Y2Nlc3NcIixcblx0XHRcInRleHQtaW5mb1wiXG5cdCAgICBdO1xuXG5cblx0ICAgIHZhciBhcnRpc3RzID0gW1xuXHRcdCAgICBcIlRoZSBCaW5nIEJhbmdzXCIsXG5cdFx0ICAgIFwiTW9kZXJuIFNob2VcIixcblx0XHQgICAgXCJUZWFtIEdvcmRvblwiLFxuXHRcdCAgICBcIkNvcmV5IERvY3Rvcm93XCIsXG5cdFx0ICAgIFwiS3VydCAobm90IHRoYXQgb25lLCB0aGUgb3RoZXIgb25lKVwiLFxuXHRcdCAgICBcIk15IFVuZGVyd2VhclwiLFxuXHRcdCAgICBcIkludGVybmFsIElzc3Vlc1wiLFxuXHRcdCAgICBcIkNhdCBWaWRlbyBDbHViXCIsXG5cdFx0ICAgIFwiTmF2aSBpcyBteSBTcGlyaXQgR3VpZGVcIixcblx0XHQgICAgXCJCbHVlIENoaWNrZW4gTnVnZ2V0XCIsXG5cdFx0ICAgIFwiWWFybiBQb3Jub2dyYXBoeVwiLFxuXHRcdCAgICBcIjYgY3lsaW5kZXIgTWFrZXVwXCIsXG5cdFx0ICAgIFwiVGhlIEJ1cmxhcCBQZWFudXRcIixcblx0XHQgICAgXCJUZXF1aWxsYSBNb2NraW5nYmlyZFwiLFxuXHRcdCAgICBcIkFuYXJrZXkgaW4gdGhlIExpYnJhcnlcIixcblx0XHQgICAgXCJCcm90aGVyIFRzaG9iZXJcIlxuXHRcdCAgICBdO1xuXG5cdCAgICB2YXIgc29uZ3RpdGxlcyA9IFtcblx0XHQgICAgXCJUaGlzIGlzIGEgVHVuZVwiLFxuXHRcdCAgICBcIllvZGVscyBtYWtlIG1lIGhhcHB5XCIsXG5cdFx0ICAgIFwiSXQncyBhIHdpbGwgcm9sbCBkYW1taXRcIixcblx0XHQgICAgXCJJIGxpa2UgcG9wY29yblwiLFxuXHRcdCAgICBcIk15IEVsZWN0cmljaWFuIE1hZGUgbWUgU2FkXCIsXG5cdFx0ICAgIFwiUk5HIGluIEhlYXJ0aHN0b25lLCBGVFdcIixcblx0XHQgICAgXCJNeSB0aGlyZCBiZWxseSBidXR0b25cIixcblx0XHQgICAgXCJXYXRjaGluZyBZb3VUdWJlIGF0IFdvcmtcIixcblx0XHQgICAgXCJUaGUgVHJpZm9yY2UgaXMgcG9pbnR5XCIsXG5cdFx0ICAgIFwiVGhleSBncm93IGZyb20gc3BlbGxzXCIsXG5cdFx0ICAgIFwiSSBwbGF5ZWQgYSBtYWdlIGFuZCBJIGxpa2VkIGl0XCIsXG5cdFx0ICAgIFwiSSBzdGlsbCBwbGF5IG9sZCBnYW1lc1wiLFxuXHRcdCAgICBcIkphdmEgYWludCBqYXZhc2NyaXB0XCIsXG5cdFx0ICAgIFwiNTAgcmVhc29ucyB3aHkgSmF2YSBpcyBhIGZhZFwiLFxuXHRcdCAgICBcIlRoZSBiZXN0IHBhcnQgb2YgbWUgaXMgbGVmdCBoYW5kZWRcIixcblx0XHQgICAgXCJJdCB0YWtlcyBhIGZldyB5ZWFycyB0byBsaXN0ZW4gdG8gbXkgcGxheWxpc3RcIixcblx0XHQgICAgXCJUYW5nZW50aWFsIENvbGRcIixcblx0XHQgICAgXCJUaHJvd2luZyBhIHF1YXJ0ZXIgYW5kIHdpc2hpbmcgeW91IHdlbGxcIixcblx0XHQgICAgXCJNeSBnb29nbGUgY2FsZW5kYXIgaXMgcmlkaWN1bG91c1wiLFxuXHRcdCAgICBcIlJlbWVtYmVyIHdoZW4gcGVvcGxlIGxpbmVkIHVwIHRvIGJ1eSBXaW5kb3dzIDk1PyAgQ3JhenkhXCIsXG5cdFx0ICAgIFwiUmljaGFyZCBTdGFsbG1hbiB3YXMgbXkgYmFieSBzaXR0ZXJcIixcblx0XHQgICAgXCJMb29raW5nIHRvIFRyYWluP1wiLFxuXHRcdCAgICBcIllvdSBkbyBub3QgaGF2ZSB0aGUgcHJvcGVyIHN0b25lXCIsXG5cdFx0ICAgIFwiSSBhbSBub3QgcmVhZHlcIixcblx0XHQgICAgXCJCdWdneSB2aWRlbyBnYW1lcy4gIFdoYXQncyB1cCB3aXRoIHRoYXQ/XCIsXG5cdFx0ICAgIFwiSXMgQ2FsbCBvZiBEdXR5IHN0aWxsIGEgdGhpbmc/XCIsXG5cdFx0ICAgIFwiSSBoYXZlIGEgbWlsbGlvbiBiYWxscyBhbmQgSSBhbSB0aGUgc2l6ZSBvZiBhIHBlYW51dFwiLFxuXHRcdCAgICBcIkJlY2F1c2UsIHlvdSBrbm93LCB0aGUgYmFieVwiXG5cdFx0ICAgIF07XG5cblx0ICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuXHQgICAgZnVuY3Rpb24gZm9ybWF0TGluZShvYmopIHtcblx0XHR2YXIgcmV0dmFsO1xuXHRcdGlmIChpbXBhaXJlZCkge1xuXHRcdFx0c3dpdGNoKHJhbmRvbSg0KSkge1xuXHRcdFx0XHRjYXNlIDA6IHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAxOiByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAyOiByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzogcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6IHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdCAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG5cdFx0fVxuXHRcdHJldHVybiByZXR2YWw7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0oc3RyKSB7XG5cdFx0bWFzdGVyY291bnQrKztcblx0XHR2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuXHRcdHZhciByZXR2YWwgPSB7ICdjbGFzc3R5cGUnIDogY3QgLCAnc3RyJyA6IHN0ciB9O1xuXHRcdHJldHVybiByZXR2YWw7XG5cdCAgICB9XG5cblxuXHQgICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2Vcblx0ICAgIHJldHVybiB7XG5cdFx0aW1wYWlyOiBmdW5jdGlvbihiKSB7XG5cdFx0ICAgIGltcGFpcmVkID0gISFiO1xuXHRcdH0sXG5cdFx0b3RoZXJTb25nOiBmdW5jdGlvbigpIHtcblx0XHQgICAgdmFyIGFydGlzdF9pbmRleCA9IG1hc3RlcmNvdW50ICUgYXJ0aXN0cy5sZW5ndGg7XG5cdFx0ICAgIHZhciBzb25nX2luZGV4ID0gbWFzdGVyY291bnQgJSBzb25ndGl0bGVzLmxlbmd0aDtcblx0XHQgICAgdmFyIHJlbGVhc2Vfbm90aWNlID0gXCJOZXcgc2luZ2xlIHJlbGVhc2VkIGJ5ICdcIisgYXJ0aXN0c1thcnRpc3RfaW5kZXhdICtcIicgY2FsbGVkICdcIiArIHNvbmd0aXRsZXNbc29uZ19pbmRleF0gKyBcIidcIjtcblx0XHQgICAgcmV0dXJuIHRoaXMuYWRkSXRlbShyZWxlYXNlX25vdGljZSk7XG5cdFx0fSxcblx0XHRhZGRJdGVtOiBmdW5jdGlvbihzdHIpIHtcblx0XHRcdCBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0oc3RyKSk7XG5cdFx0XHQgaWYgKCBpdGVtcy5sZW5ndGggPiBtYXhpdGVtcykge1xuXHRcdFx0XHQgaXRlbXMuc2hpZnQoKTtcblx0XHRcdCB9XG5cdFx0ICAgIHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24oKSB7XG5cdFx0ICAgIHZhciBodG1sc3RyID0gXCJcIjtcblx0XHQgICAgdmFyIGkgPSAwO1xuXHRcdCAgICBmb3IgKCA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykgeyBcblx0XHRcdCAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpOyBcblx0XHQgICAgfVxuXHRcdCAgICAkKFwiI3NzZ2xvYmFsXCIpLmh0bWwoaHRtbHN0cik7XG5cdFx0ICAgIHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0Y2xlYXI6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICBpdGVtcyA9IFtdO1xuXHRcdCAgICBhcnRpc3RzLnNodWZmbGUoKTtcblx0XHQgICAgc29uZ3RpdGxlcy5zaHVmZmxlKCk7XG5cdFx0ICAgIHRoaXMucmVmcmVzaCgpO1xuXHRcdCAgICByZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdCAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcblxuXHQgICAgLy8gUHJpdmF0ZSB2YXJzXG5cdCAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcblx0ICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuXHQgICAgdmFyIG1hc3RlcmNvdW50ID0gMDtcblx0ICAgIHZhciBpdGVtcyA9IFtdOyAgLy8gTGluZSBpdGVtcyBpbiBcblxuXHQgICAgdmFyIGNsYXNzdHlwZXMgPSBbXG5cdFx0XCJ0ZXh0LW11dGVkXCIsXG5cdFx0XCJ0ZXh0LXByaW1hcnlcIixcblx0XHRcInRleHQtd2FybmluZ1wiLFxuXHRcdFwidGV4dC1wcmltYXJ5XCIsXG5cdFx0XCJ0ZXh0LWluZm9cIixcblx0XHRcInRleHQtd2FybmluZ1wiLFxuXHRcdFwidGV4dC1kYW5nZXJcIixcblx0XHRcInRleHQtc3VjY2Vzc1wiLFxuXHRcdFwidGV4dC13YXJuaW5nXCIsXG5cdFx0XCJ0ZXh0LXByaW1hcnlcIixcblx0XHRcInRleHQtd2FybmluZ1wiLFxuXHRcdFwidGV4dC1pbmZvXCIsXG5cdFx0XCJ0ZXh0LWRhbmdlclwiLFxuXHRcdFwidGV4dC1zdWNjZXNzXCIsXG5cdFx0XCJ0ZXh0LWluZm9cIlxuXHQgICAgXTtcblx0ICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuXHQgICAgZnVuY3Rpb24gZm9ybWF0TGluZShvYmopIHtcblx0XHR2YXIgcmV0dmFsO1xuXHRcdGlmIChpbXBhaXJlZCkge1xuXHRcdFx0c3dpdGNoKHJhbmRvbSg0KSkge1xuXHRcdFx0XHRjYXNlIDA6IHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAxOiByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAyOiByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzogcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6IHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdCAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG5cdFx0fVxuXHRcdHJldHVybiByZXR2YWw7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0oc3RyKSB7XG5cdFx0bWFzdGVyY291bnQrKztcblx0XHR2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuXHRcdHZhciByZXR2YWwgPSB7ICdjbGFzc3R5cGUnIDogY3QgLCAnc3RyJyA6IHN0ciB9O1xuXHRcdHJldHVybiByZXR2YWw7XG5cdCAgICB9XG5cblx0ICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG5cdCAgICByZXR1cm4ge1xuXHRcdGltcGFpcjogZnVuY3Rpb24oYikge1xuXHRcdCAgICBpbXBhaXJlZCA9ICEhYjtcblx0XHR9LFxuXHRcdGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0IGl0ZW1zLnB1c2goY3JlYXRlSXRlbShzdHIpKTtcblx0XHRcdCBpZiAoIGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG5cdFx0XHRcdCBpdGVtcy5zaGlmdCgpO1xuXHRcdFx0IH1cblx0XHQgICAgcmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHRyZWZyZXNoOiBmdW5jdGlvbigpIHtcblx0XHQgICAgdmFyIGh0bWxzdHIgPSBcIlwiO1xuXHRcdCAgICB2YXIgaSA9IDA7XG5cdFx0ICAgIGZvciAoIDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7IFxuXHRcdFx0ICAgIGh0bWxzdHIgPSBodG1sc3RyLmNvbmNhdChmb3JtYXRMaW5lKGl0ZW1zW2ldKSk7IFxuXHRcdCAgICB9XG5cdFx0ICAgICQoXCIjc3Nsb2NhbFwiKS5odG1sKGh0bWxzdHIpO1xuXHRcdCAgICByZXR1cm4gaHRtbHN0cjtcblx0XHR9LFxuXHRcdGNsZWFyOiBmdW5jdGlvbigpIHtcblx0XHQgICAgaXRlbXMgPSBbXTtcblx0XHQgICAgdGhpcy5yZWZyZXNoKCk7XG5cdFx0ICAgIHJldHVybiB0cnVlO1xuXHRcdH1cblx0ICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxufTtcbiIsIi8vIHN0b25lc3VuLmpzXG52YXIgR2FtZU1hbmFnZXIgPSByZXF1aXJlKCcuL0dhbWVNYW5hZ2VyLmpzJykoKTtcblxuJCh3aW5kb3cpLmxvYWQoR2FtZU1hbmFnZXIuaW5pdCk7XG5cbiJdfQ==
