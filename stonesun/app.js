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
                        alertness += drugs.lsd.factors.alertness;
                        creativity += drugs.lsd.factors.creativity;
                        health += drugs.lsd.factors.health;
                    } else {
                        happiness -= drugs.lsd.factors.happiness;
                        alertness -= drugs.lsd.factors.alertness;
                        creativity -= drugs.lsd.factors.creativity;
                        health -= drugs.lsd.factors.health;
                    }
                    refreshPersonal();
                    break;
                case "alcohol":
                    if (taken) {
                        happiness += drugs.alcohol.factors.happiness;
                        alertness += drugs.alcohol.factors.alertness;
                        creativity += drugs.alcohol.factors.creativity;
                        health += drugs.alcohol.factors.health;
                    } else {
                        happiness -= drugs.alcohol.factors.happiness;
                        alertness -= drugs.alcohol.factors.alertness;
                        creativity -= drugs.alcohol.factors.creativity;
                        health -= drugs.alcohol.factors.health;
                    }
                    refreshPersonal();
                    break;
                case "marijuanna":
                    if (taken) {
                        happiness += drugs.marijuanna.factors.happiness;
                        alertness += drugs.marijuanna.factors.alertness;
                        creativity += drugs.marijuanna.factors.creativity;
                        health += drugs.marijuanna.factors.health;
                    } else {
                        happiness -= drugs.marijuanna.factors.happiness;
                        alertness -= drugs.marijuanna.factors.alertness;
                        creativity -= drugs.marijuanna.factors.creativity;
                        health -= drugs.marijuanna.factors.health;
                    }
                    refreshPersonal();
                    break;
                case "herion":
                    if (taken) {
                        happiness += drugs.herion.factors.happiness;
                        alertness += drugs.herion.factors.alertness;
                        creativity += drugs.herion.factors.creativity;
                        health += drugs.herion.factors.health;
                    } else {
                        happiness -= drugs.herion.factors.happiness;
                        alertness -= drugs.herion.factors.alertness;
                        creativity -= drugs.herion.factors.creativity;
                        health -= drugs.herion.factors.health;
                    }
                    refreshPersonal();
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

},{"./rot13.js":7}],2:[function(require,module,exports){
module.exports = function() {
    // Requires Bootbox.js

    // Private vars
    var impaired = false;
    var drugid = 0;
    var pushers = [
        'bassist',
        'drummer',
        'guitarist',
        'flat mate',
        'mother',
        'landlord',
        'hair dresser',
        'pizza delivery driver',
        'bartender',
        'friend the aspiring \"actor\"'
    ];


    function makeOffer(drug, drugFn) {
        var msg = "Your " + pushers[drugid++ % pushers.length] + " offers you " + drug + ".";
        var takeit = {
            label: "Yes Please",
            className: "btn-success",
            callback: function() {
                drugFn(drug, true);
            }
        };
        var denyit = {
            label: "Get Bent",
            className: "btn-danger",
            callback: function() {
                drugFn(drug, false);
            }
        };

        bootbox.dialog({
            message: msg,
            title: "Drugs!",
            closeButton: false,
            size: 'small',
            buttons: {
                positive: takeit,
                negative: denyit
            } // buttons
        });
    }


    // Return public interface
    return {
        impair: function(b) {
            impaired = !!b;
        },
        offer: function(drug, drugFn) {
            makeOffer(drug, drugFn);
        },
        clear: function() {
            pushers.shuffle();
            return true;
        }
    }; // end return of public object

};

},{}],3:[function(require,module,exports){
module.exports = function() {
    var first = true;
    var impaired = false;
    var Band = require('./Band.js')();
    var WGO = require('./WGO.js')();
    var Grapevine = require('./Grapevine.js')();
    var DrugPrompt = require('./DrugPrompt.js')();

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
                // restart();
                DrugPrompt.offer("lsd", Band.drugoffer);
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
        incDate: function() {
            Band.incDate();
        },
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

},{"./Band.js":1,"./DrugPrompt.js":2,"./Grapevine.js":4,"./WGO.js":5}],4:[function(require,module,exports){
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

},{"./random.js":6,"./rot13.js":7}],5:[function(require,module,exports){
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

},{"./random.js":6,"./rot13.js":7}],6:[function(require,module,exports){
module.exports = function(target) {
    return Math.floor(Math.random() * target);
};

},{}],7:[function(require,module,exports){
module.exports = function(s) {
    return s.replace(/[A-Za-z]/g, function(c) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)
        );
    });
};

},{}],8:[function(require,module,exports){
// stonesun.js
var GameManager = require('./GameManager.js')();

var passtime = function() {
    GameManager.incDate();
    setTimeout(passtime, 3000);
}

// Add shuffle function to all array objects
Array.prototype.shuffle = function() {
    for (var rnd, tmp, i = this.length; i; rnd = parseInt(Math.random() * i), tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp);
};


/* Define a 'console' object for IE */
if (typeof console !== 'object') {
    console = {
        log: function() {},
        debug: function() {},
        info: function() {},
        warn: function() {},
        error: function() {},
        assert: function() {},
        clear: function() {},
        dir: function() {},
        dirxml: function() {},
        trace: function() {},
        group: function() {},
        groupCollapsed: function() {},
        groupEnd: function() {},
        time: function() {},
        timeEnd: function() {},
        profile: function() {},
        profileEnd: function() {},
        count: function() {},
        exception: function() {},
        table: function() {}
    };
}

$(window).load(GameManager.init);
setTimeout(passtime, 3000);

},{"./GameManager.js":3}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9EcnVnUHJvbXB0LmpzIiwiYXBwL0dhbWVNYW5hZ2VyLmpzIiwiYXBwL0dyYXBldmluZS5qcyIsImFwcC9XR08uanMiLCJhcHAvcmFuZG9tLmpzIiwiYXBwL3JvdDEzLmpzIiwiYXBwL3N0b25lc3VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgdmFyIGJhbmRuYW1lID0gXCJBYmp1cmVyIE5vd2hlcmVcIjtcbiAgICB2YXIgbWFzdGVyaWQgPSAwOyAvLyBKdXN0IGEgdW5pcXVlIGtleVxuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIC8vIHBlcnNvbmFsXG4gICAgdmFyIGhlYWx0aCA9IDA7XG4gICAgdmFyIGNyZWF0aXZpdHkgPSAwO1xuICAgIHZhciBoYXBwaW5lc3MgPSAwO1xuICAgIHZhciBhbGVydG5lc3MgPSAwO1xuXG4gICAgLy8gdGltZVxuICAgIHZhciBkYXljb3VudCA9IDE7XG4gICAgdmFyIGRvdyA9IFtcbiAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgXCJTYXR1cmRheVwiXG4gICAgXTtcblxuICAgIC8vIHBvcHVsYXJpdHlcbiAgICB2YXIgbG9jYWxwID0gMDtcbiAgICB2YXIgbmF0aW9uYWxwID0gMDtcbiAgICB2YXIgZ2xvYmFscCA9IDA7XG5cbiAgICB2YXIgZHJ1Z3MgPSB7XG4gICAgICAgIFwibHNkXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDMsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJhbGNvaG9sXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYXJpanVhbm5hXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJoZXJpb25cIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogNSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMjAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMCxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAyMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdmFyIHNpbmdsZXMgPSBbXTsgLy8gTGluZSBpdGVtcyBpbiBcbiAgICB2YXIgdG91cnMgPSBbXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBhZGRTaW5nbGUobmFtZSkge1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2lkJzogbWFzdGVyaWQrKyxcbiAgICAgICAgICAgICduYW1lJzogbmFtZSxcbiAgICAgICAgICAgICdscG9wJzogMCxcbiAgICAgICAgICAgICducG9wJzogMCxcbiAgICAgICAgICAgICdncG9wJzogMFxuICAgICAgICB9O1xuICAgICAgICBzaW5nbGVzLnB1c2gocmV0dmFsKTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBsb2NhbHAgPSBuYXRpb25hbHAgPSBnbG9iYWxwID0gMDtcbiAgICAgICAgaGFwcGluZXNzID0gYWxlcnRuZXNzID0gY3JlYXRpdml0eSA9IDUwO1xuICAgICAgICBoZWFsdGggPSA4MDtcbiAgICAgICAgZGF5Y291bnQgPSAxO1xuICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQZXJzb25hbCgpIHtcbiAgICAgICAgJChcIiNwbGF5ZXJfaGVhbHRoXCIpLmh0bWwoaGVhbHRoKTtcbiAgICAgICAgJChcIiNwbGF5ZXJfY3JlYXRpdml0eVwiKS5odG1sKGNyZWF0aXZpdHkpO1xuICAgICAgICAkKFwiI3BsYXllcl9oYXBwaW5lc3NcIikuaHRtbChoYXBwaW5lc3MpO1xuICAgICAgICAkKFwiI3BsYXllcl9hbGVydG5lc3NcIikuaHRtbChhbGVydG5lc3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQb3B1bGFyaXR5KCkge1xuICAgICAgICAkKFwiI2xvY2FsX3BvcFwiKS5odG1sKGxvY2FscCk7XG4gICAgICAgICQoXCIjbmF0aW9uYWxfcG9wXCIpLmh0bWwobmF0aW9uYWxwKTtcbiAgICAgICAgJChcIiNnbG9iYWxfcG9wXCIpLmh0bWwoZ2xvYmFscCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaE5hbWUoKSB7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKHJvdDEzKGJhbmRuYW1lKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldE5hbWU6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgYmFuZG5hbWUgPSBzdHI7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9LFxuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgcmVmcmVzaFBvcHVsYXJpdHkoKTtcbiAgICAgICAgICAgIHJlZnJlc2hOYW1lKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRydWdvZmZlcjogZnVuY3Rpb24oZHJ1Z25hbWUsIHRha2VuKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGRydWduYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxzZFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5sc2QuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5sc2QuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmxzZC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5sc2QuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5sc2QuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLmxzZC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFsY29ob2xcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hcmlqdWFubmFcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhlcmlvblwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIGRydWcsdGFrZW4gOiBcIiArIGRydWduYW1lICsgXCIgLCBcIiArIHRha2VuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICByZXN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGluY0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF5Y291bnQrKztcbiAgICAgICAgICAgIHZhciB3ayA9IE1hdGguZmxvb3IoKGRheWNvdW50IC8gNykgKyAxKSAlIDUyO1xuICAgICAgICAgICAgdmFyIHlyID0gTWF0aC5mbG9vcigoZGF5Y291bnQgLyAzNjUpICsgMSk7XG4gICAgICAgICAgICAkKFwiI3RpbWVfZG93XCIpLmh0bWwoZG93W2RheWNvdW50ICUgN10pO1xuICAgICAgICAgICAgJChcIiN0aW1lX3llYXJcIikuaHRtbCh5cik7XG4gICAgICAgICAgICAkKFwiI3RpbWVfd2Vla1wiKS5odG1sKHdrKTtcbiAgICAgICAgICAgIHJldHVybiBkYXljb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXF1aXJlcyBCb290Ym94LmpzXG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgZHJ1Z2lkID0gMDtcbiAgICB2YXIgcHVzaGVycyA9IFtcbiAgICAgICAgJ2Jhc3Npc3QnLFxuICAgICAgICAnZHJ1bW1lcicsXG4gICAgICAgICdndWl0YXJpc3QnLFxuICAgICAgICAnZmxhdCBtYXRlJyxcbiAgICAgICAgJ21vdGhlcicsXG4gICAgICAgICdsYW5kbG9yZCcsXG4gICAgICAgICdoYWlyIGRyZXNzZXInLFxuICAgICAgICAncGl6emEgZGVsaXZlcnkgZHJpdmVyJyxcbiAgICAgICAgJ2JhcnRlbmRlcicsXG4gICAgICAgICdmcmllbmQgdGhlIGFzcGlyaW5nIFxcXCJhY3RvclxcXCInXG4gICAgXTtcblxuXG4gICAgZnVuY3Rpb24gbWFrZU9mZmVyKGRydWcsIGRydWdGbikge1xuICAgICAgICB2YXIgbXNnID0gXCJZb3VyIFwiICsgcHVzaGVyc1tkcnVnaWQrKyAlIHB1c2hlcnMubGVuZ3RoXSArIFwiIG9mZmVycyB5b3UgXCIgKyBkcnVnICsgXCIuXCI7XG4gICAgICAgIHZhciB0YWtlaXQgPSB7XG4gICAgICAgICAgICBsYWJlbDogXCJZZXMgUGxlYXNlXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuLXN1Y2Nlc3NcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkcnVnRm4oZHJ1ZywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBkZW55aXQgPSB7XG4gICAgICAgICAgICBsYWJlbDogXCJHZXQgQmVudFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0bi1kYW5nZXJcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkcnVnRm4oZHJ1ZywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGJvb3Rib3guZGlhbG9nKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgIHRpdGxlOiBcIkRydWdzIVwiLFxuICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgc2l6ZTogJ3NtYWxsJyxcbiAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGl2ZTogdGFrZWl0LFxuICAgICAgICAgICAgICAgIG5lZ2F0aXZlOiBkZW55aXRcbiAgICAgICAgICAgIH0gLy8gYnV0dG9uc1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmZXI6IGZ1bmN0aW9uKGRydWcsIGRydWdGbikge1xuICAgICAgICAgICAgbWFrZU9mZmVyKGRydWcsIGRydWdGbik7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1c2hlcnMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgQmFuZCA9IHJlcXVpcmUoJy4vQmFuZC5qcycpKCk7XG4gICAgdmFyIFdHTyA9IHJlcXVpcmUoJy4vV0dPLmpzJykoKTtcbiAgICB2YXIgR3JhcGV2aW5lID0gcmVxdWlyZSgnLi9HcmFwZXZpbmUuanMnKSgpO1xuICAgIHZhciBEcnVnUHJvbXB0ID0gcmVxdWlyZSgnLi9EcnVnUHJvbXB0LmpzJykoKTtcblxuICAgIHZhciBpbXBhaXJsID0gZnVuY3Rpb24oYikge1xuICAgICAgICBXR08uaW1wYWlyKCEhYik7XG4gICAgICAgIFdHTy5yZWZyZXNoKCk7XG4gICAgICAgIEdyYXBldmluZS5pbXBhaXIoISFiKTtcbiAgICAgICAgR3JhcGV2aW5lLnJlZnJlc2goKTtcbiAgICAgICAgQmFuZC5pbXBhaXIoISFiKTtcbiAgICAgICAgQmFuZC5yZWZyZXNoKCk7XG4gICAgICAgIHJldHVybiBpbXBhaXJlZDtcbiAgICB9O1xuXG4gICAgdmFyIHJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgQmFuZC5jbGVhcigpO1xuICAgICAgICBXR08uY2xlYXIoKTtcbiAgICAgICAgR3JhcGV2aW5lLmNsZWFyKCk7XG5cbiAgICAgICAgLyogT25seSBiaW5kIHRoZXNlIGV2ZW50cyBvbiBmaXJzdCBwYXNzICovXG4gICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICQoXCIjdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgQmFuZC5pbmNEYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjYWJvdXRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgQmFuZC5kcnVnb2ZmZXIoXCJsc2RcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjbmV3X2dhbWVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVzdGFydCgpO1xuICAgICAgICAgICAgICAgIERydWdQcm9tcHQub2ZmZXIoXCJsc2RcIiwgQmFuZC5kcnVnb2ZmZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI3RvdXJzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5vdGhlclNvbmcoKTtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2NoYXJ0c1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUuYWRkSXRlbShcIllvdSBhcmUgb24gdGhlIGNoYXJ0c1wiKTtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2hvd190b19wbGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGltcGFpcmVkID0gIWltcGFpcmVkO1xuICAgICAgICAgICAgICAgIGltcGFpcmwoaW1wYWlyZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI3JlbGVhc2VzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIFdHTy5hZGRJdGVtKFwiUmVsZWFzZXMgc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNkcnVnc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kLmRydWdvZmZlcihcImxzZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGluY0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgQmFuZC5pbmNEYXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdoYXRldmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN0YXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgcmV0dXJuIGltcGFpcmwoYik7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgbWF4aXRlbXMgPSAxMjtcbiAgICB2YXIgbWFzdGVyY291bnQgPSAwO1xuICAgIHZhciBpdGVtcyA9IFtdOyAvLyBMaW5lIGl0ZW1zIGluIFxuICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS5qcycpO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIHZhciBjbGFzc3R5cGVzID0gW1xuICAgICAgICBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LWRhbmdlclwiLFxuICAgICAgICBcInRleHQtc3VjY2Vzc1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCJcbiAgICBdO1xuXG5cbiAgICB2YXIgYXJ0aXN0cyA9IFtcbiAgICAgICAgXCJUaGUgQmluZyBCYW5nc1wiLFxuICAgICAgICBcIk1vZGVybiBTaG9lXCIsXG4gICAgICAgIFwiVGVhbSBHb3Jkb25cIixcbiAgICAgICAgXCJDb3JleSBEb2N0b3Jvd1wiLFxuICAgICAgICBcIkt1cnQgKG5vdCB0aGF0IG9uZSwgdGhlIG90aGVyIG9uZSlcIixcbiAgICAgICAgXCJNeSBVbmRlcndlYXJcIixcbiAgICAgICAgXCJJbnRlcm5hbCBJc3N1ZXNcIixcbiAgICAgICAgXCJDYXQgVmlkZW8gQ2x1YlwiLFxuICAgICAgICBcIk5hdmkgaXMgbXkgU3Bpcml0IEd1aWRlXCIsXG4gICAgICAgIFwiQmx1ZSBDaGlja2VuIE51Z2dldFwiLFxuICAgICAgICBcIllhcm4gUG9ybm9ncmFwaHlcIixcbiAgICAgICAgXCI2IGN5bGluZGVyIE1ha2V1cFwiLFxuICAgICAgICBcIlRoZSBCdXJsYXAgUGVhbnV0XCIsXG4gICAgICAgIFwiVGVxdWlsbGEgTW9ja2luZ2JpcmRcIixcbiAgICAgICAgXCJBbmFya2V5IGluIHRoZSBMaWJyYXJ5XCIsXG4gICAgICAgIFwiQnJvdGhlciBUc2hvYmVyXCJcbiAgICBdO1xuXG4gICAgdmFyIHNvbmd0aXRsZXMgPSBbXG4gICAgICAgIFwiVGhpcyBpcyBhIFR1bmVcIixcbiAgICAgICAgXCJZb2RlbHMgbWFrZSBtZSBoYXBweVwiLFxuICAgICAgICBcIkl0J3MgYSB3aWxsIHJvbGwgZGFtbWl0XCIsXG4gICAgICAgIFwiSSBsaWtlIHBvcGNvcm5cIixcbiAgICAgICAgXCJNeSBFbGVjdHJpY2lhbiBNYWRlIG1lIFNhZFwiLFxuICAgICAgICBcIlJORyBpbiBIZWFydGhzdG9uZSwgRlRXXCIsXG4gICAgICAgIFwiTXkgdGhpcmQgYmVsbHkgYnV0dG9uXCIsXG4gICAgICAgIFwiV2F0Y2hpbmcgWW91VHViZSBhdCBXb3JrXCIsXG4gICAgICAgIFwiVGhlIFRyaWZvcmNlIGlzIHBvaW50eVwiLFxuICAgICAgICBcIlRoZXkgZ3JvdyBmcm9tIHNwZWxsc1wiLFxuICAgICAgICBcIkkgcGxheWVkIGEgbWFnZSBhbmQgSSBsaWtlZCBpdFwiLFxuICAgICAgICBcIkkgc3RpbGwgcGxheSBvbGQgZ2FtZXNcIixcbiAgICAgICAgXCJKYXZhIGFpbnQgamF2YXNjcmlwdFwiLFxuICAgICAgICBcIjUwIHJlYXNvbnMgd2h5IEphdmEgaXMgYSBmYWRcIixcbiAgICAgICAgXCJUaGUgYmVzdCBwYXJ0IG9mIG1lIGlzIGxlZnQgaGFuZGVkXCIsXG4gICAgICAgIFwiSXQgdGFrZXMgYSBmZXcgeWVhcnMgdG8gbGlzdGVuIHRvIG15IHBsYXlsaXN0XCIsXG4gICAgICAgIFwiVGFuZ2VudGlhbCBDb2xkXCIsXG4gICAgICAgIFwiVGhyb3dpbmcgYSBxdWFydGVyIGFuZCB3aXNoaW5nIHlvdSB3ZWxsXCIsXG4gICAgICAgIFwiTXkgZ29vZ2xlIGNhbGVuZGFyIGlzIHJpZGljdWxvdXNcIixcbiAgICAgICAgXCJSZW1lbWJlciB3aGVuIHBlb3BsZSBsaW5lZCB1cCB0byBidXkgV2luZG93cyA5NT8gIENyYXp5IVwiLFxuICAgICAgICBcIlJpY2hhcmQgU3RhbGxtYW4gd2FzIG15IGJhYnkgc2l0dGVyXCIsXG4gICAgICAgIFwiTG9va2luZyB0byBUcmFpbj9cIixcbiAgICAgICAgXCJZb3UgZG8gbm90IGhhdmUgdGhlIHByb3BlciBzdG9uZVwiLFxuICAgICAgICBcIkkgYW0gbm90IHJlYWR5XCIsXG4gICAgICAgIFwiQnVnZ3kgdmlkZW8gZ2FtZXMuICBXaGF0J3MgdXAgd2l0aCB0aGF0P1wiLFxuICAgICAgICBcIklzIENhbGwgb2YgRHV0eSBzdGlsbCBhIHRoaW5nP1wiLFxuICAgICAgICBcIkkgaGF2ZSBhIG1pbGxpb24gYmFsbHMgYW5kIEkgYW0gdGhlIHNpemUgb2YgYSBwZWFudXRcIixcbiAgICAgICAgXCJCZWNhdXNlLCB5b3Uga25vdywgdGhlIGJhYnlcIlxuICAgIF07XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFNvbWUgcHJpdmF0ZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgJ3RydWUnIGlmIHRoZSBjYXNlIHdhcyBub3Qgc29sdmFibGUgXG4gICAgZnVuY3Rpb24gZm9ybWF0TGluZShvYmopIHtcbiAgICAgICAgdmFyIHJldHZhbDtcbiAgICAgICAgaWYgKGltcGFpcmVkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHJhbmRvbSg0KSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCIgbGVhZFxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48bWFyaz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L21hcms+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48ZGVsPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvZGVsPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PHM+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9zPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIG9iai5zdHIgKyBcIjwvcD5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0oc3RyKSB7XG4gICAgICAgIG1hc3RlcmNvdW50Kys7XG4gICAgICAgIHZhciBjdCA9IGNsYXNzdHlwZXNbbWFzdGVyY291bnQgJSBjbGFzc3R5cGVzLmxlbmd0aF07XG4gICAgICAgIHZhciByZXR2YWwgPSB7XG4gICAgICAgICAgICAnY2xhc3N0eXBlJzogY3QsXG4gICAgICAgICAgICAnc3RyJzogc3RyXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIG90aGVyU29uZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYXJ0aXN0X2luZGV4ID0gbWFzdGVyY291bnQgJSBhcnRpc3RzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBzb25nX2luZGV4ID0gbWFzdGVyY291bnQgJSBzb25ndGl0bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciByZWxlYXNlX25vdGljZSA9IFwiTmV3IHNpbmdsZSByZWxlYXNlZCBieSAnXCIgKyBhcnRpc3RzW2FydGlzdF9pbmRleF0gKyBcIicgY2FsbGVkICdcIiArIHNvbmd0aXRsZXNbc29uZ19pbmRleF0gKyBcIidcIjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZEl0ZW0ocmVsZWFzZV9ub3RpY2UpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goY3JlYXRlSXRlbShzdHIpKTtcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiBtYXhpdGVtcykge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaHRtbHN0ciA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaHRtbHN0ciA9IGh0bWxzdHIuY29uY2F0KGZvcm1hdExpbmUoaXRlbXNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjc3NnbG9iYWxcIikuaHRtbChodG1sc3RyKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgYXJ0aXN0cy5zaHVmZmxlKCk7XG4gICAgICAgICAgICBzb25ndGl0bGVzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgbWF4aXRlbXMgPSAxMjtcbiAgICB2YXIgbWFzdGVyY291bnQgPSAwO1xuICAgIHZhciBpdGVtcyA9IFtdOyAvLyBMaW5lIGl0ZW1zIGluIFxuICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS5qcycpO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIHZhciBjbGFzc3R5cGVzID0gW1xuICAgICAgICBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LWRhbmdlclwiLFxuICAgICAgICBcInRleHQtc3VjY2Vzc1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCJcbiAgICBdO1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tKDQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcbiAgICAgICAgbWFzdGVyY291bnQrKztcbiAgICAgICAgdmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdjbGFzc3R5cGUnOiBjdCxcbiAgICAgICAgICAgICdzdHInOiBzdHJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBodG1sc3RyID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNzc2xvY2FsXCIpLmh0bWwoaHRtbHN0cik7XG4gICAgICAgICAgICByZXR1cm4gaHRtbHN0cjtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3Rcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0YXJnZXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL1tBLVphLXpdL2csIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiLmNoYXJBdChcbiAgICAgICAgICAgIFwiTk9QUVJTVFVWV1hZWkFCQ0RFRkdISUpLTE1ub3BxcnN0dXZ3eHl6YWJjZGVmZ2hpamtsbVwiLmluZGV4T2YoYylcbiAgICAgICAgKTtcbiAgICB9KTtcbn07XG4iLCIvLyBzdG9uZXN1bi5qc1xudmFyIEdhbWVNYW5hZ2VyID0gcmVxdWlyZSgnLi9HYW1lTWFuYWdlci5qcycpKCk7XG5cbnZhciBwYXNzdGltZSA9IGZ1bmN0aW9uKCkge1xuICAgIEdhbWVNYW5hZ2VyLmluY0RhdGUoKTtcbiAgICBzZXRUaW1lb3V0KHBhc3N0aW1lLCAzMDAwKTtcbn1cblxuLy8gQWRkIHNodWZmbGUgZnVuY3Rpb24gdG8gYWxsIGFycmF5IG9iamVjdHNcbkFycmF5LnByb3RvdHlwZS5zaHVmZmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgcm5kLCB0bXAsIGkgPSB0aGlzLmxlbmd0aDsgaTsgcm5kID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIGkpLCB0bXAgPSB0aGlzWy0taV0sIHRoaXNbaV0gPSB0aGlzW3JuZF0sIHRoaXNbcm5kXSA9IHRtcCk7XG59O1xuXG5cbi8qIERlZmluZSBhICdjb25zb2xlJyBvYmplY3QgZm9yIElFICovXG5pZiAodHlwZW9mIGNvbnNvbGUgIT09ICdvYmplY3QnKSB7XG4gICAgY29uc29sZSA9IHtcbiAgICAgICAgbG9nOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkZWJ1ZzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgaW5mbzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgd2FybjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGFzc2VydDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRpcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZGlyeG1sOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0cmFjZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZ3JvdXA6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBncm91cEVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgdGltZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgdGltZUVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgcHJvZmlsZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgcHJvZmlsZUVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgY291bnQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGV4Y2VwdGlvbjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgdGFibGU6IGZ1bmN0aW9uKCkge31cbiAgICB9O1xufVxuXG4kKHdpbmRvdykubG9hZChHYW1lTWFuYWdlci5pbml0KTtcbnNldFRpbWVvdXQocGFzc3RpbWUsIDMwMDApO1xuIl19
