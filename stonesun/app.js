(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
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

},{}],2:[function(require,module,exports){
module.exports = function () {
		var first = true;
		var impaired = false;
		var Band = require('./Band.js').band();
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


},{"./GameManager.js":2}]},{},[5]);
