(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {

    // Private vars
    var bandname = "Abjurer Nowhere";
    var masterid = 0; // Just a unique key
    var impaired = false;
    var rot13 = require('./rot13.js');

    // personal
    var health = 0;
    var creativity = 0;
    var happiness = 0;
    var alertness = 0;

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
        "lsd": {
            "addiction": 0,
            "factors": {
                "addiction": 10,
                "health": 5,
                "creativity": 20,
                "happiness": 3,
                "alertness": 20
            }
        },
        "alcohol": {
            "addiction": 0,
            "factors": {
                "addiction": 10,
                "health": 5,
                "creativity": 20,
                "happiness": 0,
                "alertness": 20
            }
        },
        "marijuanna": {
            "addiction": 0,
            "factors": {
                "addiction": 10,
                "health": 5,
                "creativity": 20,
                "happiness": 0,
                "alertness": 20
            }
        },
        "herion": {
            "addiction": 0,
            "factors": {
                "addiction": 10,
                "health": 5,
                "creativity": 20,
                "happiness": 0,
                "alertness": 20
            }
        }
    };


    var singles = []; // Line items in 
    var tours = [];

    // ---------------------- Some private methods ----------------------------------
    // This function returns 'true' if the case was not solvable 
    function addSingle(name) {
        var retval = {
            'id': masterid++,
            'name': name,
            'lpop': 0,
            'npop': 0,
            'gpop': 0
        };
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
        setName: function(str) {
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
            switch (drugname) {
                case "lsd":
                    if (taken) {
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
                    console.log("Unknown drug,taken : " + drugname + " , " + taken);
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

},{"./rot13.js":6}],2:[function(require,module,exports){
module.exports = function() {
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
            first = false;
            $("#title").click(function() {
                Band.incDate();
            });
            $("#about").click(function() {
                Band.drugoffer("lsd", true);
            });
            $("#new_game").click(function() {
                restart();
            });
            $("#tours").click(function() {
                Grapevine.otherSong();
                Grapevine.refresh();
            });
            $("#charts").click(function() {
                Grapevine.addItem("You are on the charts");
                Grapevine.refresh();
            });
            $("#how_to_play").click(function() {
                impaired = !impaired;
                impairl(impaired);
            });
            $("#releases").click(function() {
                WGO.addItem("Releases selected");
                WGO.refresh();
            });
            $("#drugs").click(function() {
                Band.drugoffer("lsd", false);
            });
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
module.exports = function() {

    // Private vars
    var impaired = false;
    var maxitems = 12;
    var mastercount = 0;
    var items = []; // Line items in 
    var random = require('./random.js');
    var rot13 = require('./rot13.js');

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
            switch (random(4)) {
                case 0:
                    retval = "<p class=\"" + obj.classtype + " lead\">" + rot13(obj.str) + "</p>";
                    break;
                case 1:
                    retval = "<p class=\"" + obj.classtype + "\"><mark>" + rot13(obj.str) + "</mark></p>";
                    break;
                case 2:
                    retval = "<p class=\"" + obj.classtype + "\"><del>" + rot13(obj.str) + "</del></p>";
                    break;
                case 3:
                    retval = "<p class=\"" + obj.classtype + "\"><s>" + rot13(obj.str) + "</s></p>";
                    break;
                default:
                    retval = "<p class=\"" + obj.classtype + "\">" + rot13(obj.str) + "</p>";
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
        var retval = {
            'classtype': ct,
            'str': str
        };
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
            var release_notice = "New single released by '" + artists[artist_index] + "' called '" + songtitles[song_index] + "'";
            return this.addItem(release_notice);
        },
        addItem: function(str) {
            items.push(createItem(str));
            if (items.length > maxitems) {
                items.shift();
            }
            return true;
        },
        refresh: function() {
            var htmlstr = "";
            var i = 0;
            for (; i < items.length; i++) {
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

},{"./random.js":5,"./rot13.js":6}],4:[function(require,module,exports){
module.exports = function() {

    // Private vars
    var impaired = false;
    var maxitems = 12;
    var mastercount = 0;
    var items = []; // Line items in 
    var random = require('./random.js');
    var rot13 = require('./rot13.js');

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
            switch (random(4)) {
                case 0:
                    retval = "<p class=\"" + obj.classtype + " lead\">" + rot13(obj.str) + "</p>";
                    break;
                case 1:
                    retval = "<p class=\"" + obj.classtype + "\"><mark>" + rot13(obj.str) + "</mark></p>";
                    break;
                case 2:
                    retval = "<p class=\"" + obj.classtype + "\"><del>" + rot13(obj.str) + "</del></p>";
                    break;
                case 3:
                    retval = "<p class=\"" + obj.classtype + "\"><s>" + rot13(obj.str) + "</s></p>";
                    break;
                default:
                    retval = "<p class=\"" + obj.classtype + "\">" + rot13(obj.str) + "</p>";
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
        var retval = {
            'classtype': ct,
            'str': str
        };
        return retval;
    }

    // Return public interface
    return {
        impair: function(b) {
            impaired = !!b;
        },
        addItem: function(str) {
            items.push(createItem(str));
            if (items.length > maxitems) {
                items.shift();
            }
            return true;
        },
        refresh: function() {
            var htmlstr = "";
            var i = 0;
            for (; i < items.length; i++) {
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

},{"./random.js":5,"./rot13.js":6}],5:[function(require,module,exports){
module.exports = function(target) {
    return Math.floor(Math.random() * target);
};

},{}],6:[function(require,module,exports){
module.exports = function(s) {
    return s.replace(/[A-Za-z]/g, function(c) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)
        );
    });
};

},{}],7:[function(require,module,exports){
// stonesun.js
var GameManager = require('./GameManager.js')();

$(window).load(GameManager.init);

},{"./GameManager.js":2}]},{},[7])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9HYW1lTWFuYWdlci5qcyIsImFwcC9HcmFwZXZpbmUuanMiLCJhcHAvV0dPLmpzIiwiYXBwL3JhbmRvbS5qcyIsImFwcC9yb3QxMy5qcyIsImFwcC9zdG9uZXN1bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgdmFyIGJhbmRuYW1lID0gXCJBYmp1cmVyIE5vd2hlcmVcIjtcbiAgICB2YXIgbWFzdGVyaWQgPSAwOyAvLyBKdXN0IGEgdW5pcXVlIGtleVxuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIC8vIHBlcnNvbmFsXG4gICAgdmFyIGhlYWx0aCA9IDA7XG4gICAgdmFyIGNyZWF0aXZpdHkgPSAwO1xuICAgIHZhciBoYXBwaW5lc3MgPSAwO1xuICAgIHZhciBhbGVydG5lc3MgPSAwO1xuXG4gICAgLy8gdGltZVxuICAgIHZhciBkYXljb3VudCA9IDE7XG4gICAgdmFyIGRvdyA9IFtcbiAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgXCJTYXR1cmRheVwiXG4gICAgXTtcblxuICAgIC8vIHBvcHVsYXJpdHlcbiAgICB2YXIgbG9jYWxwID0gMDtcbiAgICB2YXIgbmF0aW9uYWxwID0gMDtcbiAgICB2YXIgZ2xvYmFscCA9IDA7XG5cbiAgICB2YXIgZHJ1Z3MgPSB7XG4gICAgICAgIFwibHNkXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDMsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJhbGNvaG9sXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYXJpanVhbm5hXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJoZXJpb25cIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogNSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMjAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMCxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAyMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdmFyIHNpbmdsZXMgPSBbXTsgLy8gTGluZSBpdGVtcyBpbiBcbiAgICB2YXIgdG91cnMgPSBbXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBhZGRTaW5nbGUobmFtZSkge1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2lkJzogbWFzdGVyaWQrKyxcbiAgICAgICAgICAgICduYW1lJzogbmFtZSxcbiAgICAgICAgICAgICdscG9wJzogMCxcbiAgICAgICAgICAgICducG9wJzogMCxcbiAgICAgICAgICAgICdncG9wJzogMFxuICAgICAgICB9O1xuICAgICAgICBzaW5nbGVzLnB1c2gocmV0dmFsKTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBsb2NhbHAgPSBuYXRpb25hbHAgPSBnbG9iYWxwID0gMDtcbiAgICAgICAgaGFwcGluZXNzID0gYWxlcnRuZXNzID0gY3JlYXRpdml0eSA9IDUwO1xuICAgICAgICBoZWFsdGggPSA4MDtcbiAgICAgICAgZGF5Y291bnQgPSAxO1xuICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQZXJzb25hbCgpIHtcbiAgICAgICAgJChcIiNwbGF5ZXJfaGVhbHRoXCIpLmh0bWwoaGVhbHRoKTtcbiAgICAgICAgJChcIiNwbGF5ZXJfY3JlYXRpdml0eVwiKS5odG1sKGNyZWF0aXZpdHkpO1xuICAgICAgICAkKFwiI3BsYXllcl9oYXBwaW5lc3NcIikuaHRtbChoYXBwaW5lc3MpO1xuICAgICAgICAkKFwiI3BsYXllcl9hbGVydG5lc3NcIikuaHRtbChhbGVydG5lc3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQb3B1bGFyaXR5KCkge1xuICAgICAgICAkKFwiI2xvY2FsX3BvcFwiKS5odG1sKGxvY2FscCk7XG4gICAgICAgICQoXCIjbmF0aW9uYWxfcG9wXCIpLmh0bWwobmF0aW9uYWxwKTtcbiAgICAgICAgJChcIiNnbG9iYWxfcG9wXCIpLmh0bWwoZ2xvYmFscCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaE5hbWUoKSB7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKHJvdDEzKGJhbmRuYW1lKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldE5hbWU6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgYmFuZG5hbWUgPSBzdHI7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9LFxuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgcmVmcmVzaFBvcHVsYXJpdHkoKTtcbiAgICAgICAgICAgIHJlZnJlc2hOYW1lKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRydWdvZmZlcjogZnVuY3Rpb24oZHJ1Z25hbWUsIHRha2VuKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGRydWduYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxzZFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5sc2QuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWxjb2hvbFwiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFyaWp1YW5uYVwiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaGVyaW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBkcnVnLHRha2VuIDogXCIgKyBkcnVnbmFtZSArIFwiICwgXCIgKyB0YWtlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICB9LFxuICAgICAgICBpbmNEYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRheWNvdW50Kys7XG4gICAgICAgICAgICB2YXIgd2sgPSBNYXRoLmZsb29yKChkYXljb3VudCAvIDcpICsgMSkgJSA1MjtcbiAgICAgICAgICAgIHZhciB5ciA9IE1hdGguZmxvb3IoKGRheWNvdW50IC8gMzY1KSArIDEpO1xuICAgICAgICAgICAgJChcIiN0aW1lX2Rvd1wiKS5odG1sKGRvd1tkYXljb3VudCAlIDddKTtcbiAgICAgICAgICAgICQoXCIjdGltZV95ZWFyXCIpLmh0bWwoeXIpO1xuICAgICAgICAgICAgJChcIiN0aW1lX3dlZWtcIikuaHRtbCh3ayk7XG4gICAgICAgICAgICByZXR1cm4gZGF5Y291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0KCk7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgQmFuZCA9IHJlcXVpcmUoJy4vQmFuZC5qcycpKCk7XG4gICAgdmFyIFdHTyA9IHJlcXVpcmUoJy4vV0dPLmpzJykoKTtcbiAgICB2YXIgR3JhcGV2aW5lID0gcmVxdWlyZSgnLi9HcmFwZXZpbmUuanMnKSgpO1xuXG4gICAgdmFyIGltcGFpcmwgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIFdHTy5pbXBhaXIoISFiKTtcbiAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICAgICAgR3JhcGV2aW5lLmltcGFpcighIWIpO1xuICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICBCYW5kLmltcGFpcighIWIpO1xuICAgICAgICBCYW5kLnJlZnJlc2goKTtcbiAgICAgICAgcmV0dXJuIGltcGFpcmVkO1xuICAgIH07XG5cbiAgICB2YXIgcmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBCYW5kLmNsZWFyKCk7XG4gICAgICAgIFdHTy5jbGVhcigpO1xuICAgICAgICBHcmFwZXZpbmUuY2xlYXIoKTtcblxuICAgICAgICAvKiBPbmx5IGJpbmQgdGhlc2UgZXZlbnRzIG9uIGZpcnN0IHBhc3MgKi9cbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgJChcIiN0aXRsZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kLmluY0RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNhYm91dFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kLmRydWdvZmZlcihcImxzZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNuZXdfZ2FtZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXN0YXJ0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjdG91cnNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLm90aGVyU29uZygpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjY2hhcnRzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5hZGRJdGVtKFwiWW91IGFyZSBvbiB0aGUgY2hhcnRzXCIpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjaG93X3RvX3BsYXlcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1wYWlyZWQgPSAhaW1wYWlyZWQ7XG4gICAgICAgICAgICAgICAgaW1wYWlybChpbXBhaXJlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjcmVsZWFzZXNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgV0dPLmFkZEl0ZW0oXCJSZWxlYXNlcyBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2RydWdzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmQuZHJ1Z29mZmVyKFwibHNkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2hhdGV2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3RhcnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wYWlybChiKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG5cblxuICAgIHZhciBhcnRpc3RzID0gW1xuICAgICAgICBcIlRoZSBCaW5nIEJhbmdzXCIsXG4gICAgICAgIFwiTW9kZXJuIFNob2VcIixcbiAgICAgICAgXCJUZWFtIEdvcmRvblwiLFxuICAgICAgICBcIkNvcmV5IERvY3Rvcm93XCIsXG4gICAgICAgIFwiS3VydCAobm90IHRoYXQgb25lLCB0aGUgb3RoZXIgb25lKVwiLFxuICAgICAgICBcIk15IFVuZGVyd2VhclwiLFxuICAgICAgICBcIkludGVybmFsIElzc3Vlc1wiLFxuICAgICAgICBcIkNhdCBWaWRlbyBDbHViXCIsXG4gICAgICAgIFwiTmF2aSBpcyBteSBTcGlyaXQgR3VpZGVcIixcbiAgICAgICAgXCJCbHVlIENoaWNrZW4gTnVnZ2V0XCIsXG4gICAgICAgIFwiWWFybiBQb3Jub2dyYXBoeVwiLFxuICAgICAgICBcIjYgY3lsaW5kZXIgTWFrZXVwXCIsXG4gICAgICAgIFwiVGhlIEJ1cmxhcCBQZWFudXRcIixcbiAgICAgICAgXCJUZXF1aWxsYSBNb2NraW5nYmlyZFwiLFxuICAgICAgICBcIkFuYXJrZXkgaW4gdGhlIExpYnJhcnlcIixcbiAgICAgICAgXCJCcm90aGVyIFRzaG9iZXJcIlxuICAgIF07XG5cbiAgICB2YXIgc29uZ3RpdGxlcyA9IFtcbiAgICAgICAgXCJUaGlzIGlzIGEgVHVuZVwiLFxuICAgICAgICBcIllvZGVscyBtYWtlIG1lIGhhcHB5XCIsXG4gICAgICAgIFwiSXQncyBhIHdpbGwgcm9sbCBkYW1taXRcIixcbiAgICAgICAgXCJJIGxpa2UgcG9wY29yblwiLFxuICAgICAgICBcIk15IEVsZWN0cmljaWFuIE1hZGUgbWUgU2FkXCIsXG4gICAgICAgIFwiUk5HIGluIEhlYXJ0aHN0b25lLCBGVFdcIixcbiAgICAgICAgXCJNeSB0aGlyZCBiZWxseSBidXR0b25cIixcbiAgICAgICAgXCJXYXRjaGluZyBZb3VUdWJlIGF0IFdvcmtcIixcbiAgICAgICAgXCJUaGUgVHJpZm9yY2UgaXMgcG9pbnR5XCIsXG4gICAgICAgIFwiVGhleSBncm93IGZyb20gc3BlbGxzXCIsXG4gICAgICAgIFwiSSBwbGF5ZWQgYSBtYWdlIGFuZCBJIGxpa2VkIGl0XCIsXG4gICAgICAgIFwiSSBzdGlsbCBwbGF5IG9sZCBnYW1lc1wiLFxuICAgICAgICBcIkphdmEgYWludCBqYXZhc2NyaXB0XCIsXG4gICAgICAgIFwiNTAgcmVhc29ucyB3aHkgSmF2YSBpcyBhIGZhZFwiLFxuICAgICAgICBcIlRoZSBiZXN0IHBhcnQgb2YgbWUgaXMgbGVmdCBoYW5kZWRcIixcbiAgICAgICAgXCJJdCB0YWtlcyBhIGZldyB5ZWFycyB0byBsaXN0ZW4gdG8gbXkgcGxheWxpc3RcIixcbiAgICAgICAgXCJUYW5nZW50aWFsIENvbGRcIixcbiAgICAgICAgXCJUaHJvd2luZyBhIHF1YXJ0ZXIgYW5kIHdpc2hpbmcgeW91IHdlbGxcIixcbiAgICAgICAgXCJNeSBnb29nbGUgY2FsZW5kYXIgaXMgcmlkaWN1bG91c1wiLFxuICAgICAgICBcIlJlbWVtYmVyIHdoZW4gcGVvcGxlIGxpbmVkIHVwIHRvIGJ1eSBXaW5kb3dzIDk1PyAgQ3JhenkhXCIsXG4gICAgICAgIFwiUmljaGFyZCBTdGFsbG1hbiB3YXMgbXkgYmFieSBzaXR0ZXJcIixcbiAgICAgICAgXCJMb29raW5nIHRvIFRyYWluP1wiLFxuICAgICAgICBcIllvdSBkbyBub3QgaGF2ZSB0aGUgcHJvcGVyIHN0b25lXCIsXG4gICAgICAgIFwiSSBhbSBub3QgcmVhZHlcIixcbiAgICAgICAgXCJCdWdneSB2aWRlbyBnYW1lcy4gIFdoYXQncyB1cCB3aXRoIHRoYXQ/XCIsXG4gICAgICAgIFwiSXMgQ2FsbCBvZiBEdXR5IHN0aWxsIGEgdGhpbmc/XCIsXG4gICAgICAgIFwiSSBoYXZlIGEgbWlsbGlvbiBiYWxscyBhbmQgSSBhbSB0aGUgc2l6ZSBvZiBhIHBlYW51dFwiLFxuICAgICAgICBcIkJlY2F1c2UsIHlvdSBrbm93LCB0aGUgYmFieVwiXG4gICAgXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tKDQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcbiAgICAgICAgbWFzdGVyY291bnQrKztcbiAgICAgICAgdmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdjbGFzc3R5cGUnOiBjdCxcbiAgICAgICAgICAgICdzdHInOiBzdHJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJTb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcnRpc3RfaW5kZXggPSBtYXN0ZXJjb3VudCAlIGFydGlzdHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNvbmdfaW5kZXggPSBtYXN0ZXJjb3VudCAlIHNvbmd0aXRsZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbGVhc2Vfbm90aWNlID0gXCJOZXcgc2luZ2xlIHJlbGVhc2VkIGJ5ICdcIiArIGFydGlzdHNbYXJ0aXN0X2luZGV4XSArIFwiJyBjYWxsZWQgJ1wiICsgc29uZ3RpdGxlc1tzb25nX2luZGV4XSArIFwiJ1wiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkSXRlbShyZWxlYXNlX25vdGljZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBodG1sc3RyID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNzc2dsb2JhbFwiKS5odG1sKGh0bWxzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW1zID0gW107XG4gICAgICAgICAgICBhcnRpc3RzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHNvbmd0aXRsZXMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUob2JqKSB7XG4gICAgICAgIHZhciByZXR2YWw7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgc3dpdGNoIChyYW5kb20oNCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0cikge1xuICAgICAgICBtYXN0ZXJjb3VudCsrO1xuICAgICAgICB2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2NsYXNzdHlwZSc6IGN0LFxuICAgICAgICAgICAgJ3N0cic6IHN0clxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0oc3RyKSk7XG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGh0bWxzdHIgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWxzdHIgPSBodG1sc3RyLmNvbmNhdChmb3JtYXRMaW5lKGl0ZW1zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI3NzbG9jYWxcIikuaHRtbChodG1sc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sc3RyO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRhcmdldCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvW0EtWmEtel0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIuY2hhckF0KFxuICAgICAgICAgICAgXCJOT1BRUlNUVVZXWFlaQUJDREVGR0hJSktMTW5vcHFyc3R1dnd4eXphYmNkZWZnaGlqa2xtXCIuaW5kZXhPZihjKVxuICAgICAgICApO1xuICAgIH0pO1xufTtcbiIsIi8vIHN0b25lc3VuLmpzXG52YXIgR2FtZU1hbmFnZXIgPSByZXF1aXJlKCcuL0dhbWVNYW5hZ2VyLmpzJykoKTtcblxuJCh3aW5kb3cpLmxvYWQoR2FtZU1hbmFnZXIuaW5pdCk7XG4iXX0=
