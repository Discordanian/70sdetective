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
    var rot13 = require('./rot13.js');

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


    function makeOffer(drug, impInd, drugFn) {
        var msg = "Your " + pushers[drugid++ % pushers.length] + " offers you " + drug + ".";
        if (impInd) {
            msg = rot13(msg);
        }


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
                drugFn(drug, impInd); // If impaired, this is true too.   oops! :)
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
        offer: function(drug, imp, drugFn) {
            makeOffer(drug, imp, drugFn);
        },
        clear: function() {
            pushers.shuffle();
            return true;
        }
    }; // end return of public object

};

},{"./rot13.js":7}],3:[function(require,module,exports){
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
                DrugPrompt.offer("lsd", impaired, Band.drugoffer);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9CYW5kLmpzIiwiYXBwL0RydWdQcm9tcHQuanMiLCJhcHAvR2FtZU1hbmFnZXIuanMiLCJhcHAvR3JhcGV2aW5lLmpzIiwiYXBwL1dHTy5qcyIsImFwcC9yYW5kb20uanMiLCJhcHAvcm90MTMuanMiLCJhcHAvc3RvbmVzdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgYmFuZG5hbWUgPSBcIkFianVyZXIgTm93aGVyZVwiO1xuICAgIHZhciBtYXN0ZXJpZCA9IDA7IC8vIEp1c3QgYSB1bmlxdWUga2V5XG4gICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgLy8gcGVyc29uYWxcbiAgICB2YXIgaGVhbHRoID0gMDtcbiAgICB2YXIgY3JlYXRpdml0eSA9IDA7XG4gICAgdmFyIGhhcHBpbmVzcyA9IDA7XG4gICAgdmFyIGFsZXJ0bmVzcyA9IDA7XG5cbiAgICAvLyB0aW1lXG4gICAgdmFyIGRheWNvdW50ID0gMTtcbiAgICB2YXIgZG93ID0gW1xuICAgICAgICBcIlN1bmRheVwiLFxuICAgICAgICBcIk1vbmRheVwiLFxuICAgICAgICBcIlR1ZXNkYXlcIixcbiAgICAgICAgXCJXZWRuZXNkYXlcIixcbiAgICAgICAgXCJUaHVyc2RheVwiLFxuICAgICAgICBcIkZyaWRheVwiLFxuICAgICAgICBcIlNhdHVyZGF5XCJcbiAgICBdO1xuXG4gICAgLy8gcG9wdWxhcml0eVxuICAgIHZhciBsb2NhbHAgPSAwO1xuICAgIHZhciBuYXRpb25hbHAgPSAwO1xuICAgIHZhciBnbG9iYWxwID0gMDtcblxuICAgIHZhciBkcnVncyA9IHtcbiAgICAgICAgXCJsc2RcIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogNSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMjAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMyxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAyMFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImFsY29ob2xcIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogNSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMjAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMCxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAyMFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hcmlqdWFubmFcIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogNSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMjAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMCxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAyMFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhlcmlvblwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiAxMCxcbiAgICAgICAgICAgICAgICBcImhlYWx0aFwiOiA1LFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAyMCxcbiAgICAgICAgICAgICAgICBcImhhcHBpbmVzc1wiOiAwLFxuICAgICAgICAgICAgICAgIFwiYWxlcnRuZXNzXCI6IDIwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB2YXIgc2luZ2xlcyA9IFtdOyAvLyBMaW5lIGl0ZW1zIGluIFxuICAgIHZhciB0b3VycyA9IFtdO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGFkZFNpbmdsZShuYW1lKSB7XG4gICAgICAgIHZhciByZXR2YWwgPSB7XG4gICAgICAgICAgICAnaWQnOiBtYXN0ZXJpZCsrLFxuICAgICAgICAgICAgJ25hbWUnOiBuYW1lLFxuICAgICAgICAgICAgJ2xwb3AnOiAwLFxuICAgICAgICAgICAgJ25wb3AnOiAwLFxuICAgICAgICAgICAgJ2dwb3AnOiAwXG4gICAgICAgIH07XG4gICAgICAgIHNpbmdsZXMucHVzaChyZXR2YWwpO1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGxvY2FscCA9IG5hdGlvbmFscCA9IGdsb2JhbHAgPSAwO1xuICAgICAgICBoYXBwaW5lc3MgPSBhbGVydG5lc3MgPSBjcmVhdGl2aXR5ID0gNTA7XG4gICAgICAgIGhlYWx0aCA9IDgwO1xuICAgICAgICBkYXljb3VudCA9IDE7XG4gICAgICAgIHNjb3JlID0gMDtcbiAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgIHJlZnJlc2hQb3B1bGFyaXR5KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBlcnNvbmFsKCkge1xuICAgICAgICAkKFwiI3BsYXllcl9oZWFsdGhcIikuaHRtbChoZWFsdGgpO1xuICAgICAgICAkKFwiI3BsYXllcl9jcmVhdGl2aXR5XCIpLmh0bWwoY3JlYXRpdml0eSk7XG4gICAgICAgICQoXCIjcGxheWVyX2hhcHBpbmVzc1wiKS5odG1sKGhhcHBpbmVzcyk7XG4gICAgICAgICQoXCIjcGxheWVyX2FsZXJ0bmVzc1wiKS5odG1sKGFsZXJ0bmVzcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBvcHVsYXJpdHkoKSB7XG4gICAgICAgICQoXCIjbG9jYWxfcG9wXCIpLmh0bWwobG9jYWxwKTtcbiAgICAgICAgJChcIiNuYXRpb25hbF9wb3BcIikuaHRtbChuYXRpb25hbHApO1xuICAgICAgICAkKFwiI2dsb2JhbF9wb3BcIikuaHRtbChnbG9iYWxwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTmFtZSgpIHtcbiAgICAgICAgaWYgKGltcGFpcmVkKSB7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwocm90MTMoYmFuZG5hbWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjYmFuZG5hbWVcIikuaHRtbChiYW5kbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0TmFtZTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBiYW5kbmFtZSA9IHN0cjtcbiAgICAgICAgICAgICQoXCIjYmFuZG5hbWVcIikuaHRtbChiYW5kbmFtZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgICAgICAgICAgcmVmcmVzaE5hbWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJ1Z29mZmVyOiBmdW5jdGlvbihkcnVnbmFtZSwgdGFrZW4pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZHJ1Z25hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibHNkXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLmxzZC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5sc2QuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmxzZC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MubHNkLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmxzZC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5sc2QuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLmxzZC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MubHNkLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWxjb2hvbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFyaWp1YW5uYVwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaGVyaW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gZHJ1Zyx0YWtlbiA6IFwiICsgZHJ1Z25hbWUgKyBcIiAsIFwiICsgdGFrZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5jRGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkYXljb3VudCsrO1xuICAgICAgICAgICAgdmFyIHdrID0gTWF0aC5mbG9vcigoZGF5Y291bnQgLyA3KSArIDEpICUgNTI7XG4gICAgICAgICAgICB2YXIgeXIgPSBNYXRoLmZsb29yKChkYXljb3VudCAvIDM2NSkgKyAxKTtcbiAgICAgICAgICAgICQoXCIjdGltZV9kb3dcIikuaHRtbChkb3dbZGF5Y291bnQgJSA3XSk7XG4gICAgICAgICAgICAkKFwiI3RpbWVfeWVhclwiKS5odG1sKHlyKTtcbiAgICAgICAgICAgICQoXCIjdGltZV93ZWVrXCIpLmh0bWwod2spO1xuICAgICAgICAgICAgcmV0dXJuIGRheWNvdW50O1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlcXVpcmVzIEJvb3Rib3guanNcbiAgICB2YXIgcm90MTMgPSByZXF1aXJlKCcuL3JvdDEzLmpzJyk7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgZHJ1Z2lkID0gMDtcbiAgICB2YXIgcHVzaGVycyA9IFtcbiAgICAgICAgJ2Jhc3Npc3QnLFxuICAgICAgICAnZHJ1bW1lcicsXG4gICAgICAgICdndWl0YXJpc3QnLFxuICAgICAgICAnZmxhdCBtYXRlJyxcbiAgICAgICAgJ21vdGhlcicsXG4gICAgICAgICdsYW5kbG9yZCcsXG4gICAgICAgICdoYWlyIGRyZXNzZXInLFxuICAgICAgICAncGl6emEgZGVsaXZlcnkgZHJpdmVyJyxcbiAgICAgICAgJ2JhcnRlbmRlcicsXG4gICAgICAgICdmcmllbmQgdGhlIGFzcGlyaW5nIFxcXCJhY3RvclxcXCInXG4gICAgXTtcblxuXG4gICAgZnVuY3Rpb24gbWFrZU9mZmVyKGRydWcsIGltcEluZCwgZHJ1Z0ZuKSB7XG4gICAgICAgIHZhciBtc2cgPSBcIllvdXIgXCIgKyBwdXNoZXJzW2RydWdpZCsrICUgcHVzaGVycy5sZW5ndGhdICsgXCIgb2ZmZXJzIHlvdSBcIiArIGRydWcgKyBcIi5cIjtcbiAgICAgICAgaWYgKGltcEluZCkge1xuICAgICAgICAgICAgbXNnID0gcm90MTMobXNnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIHRha2VpdCA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlllcyBQbGVhc2VcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4tc3VjY2Vzc1wiLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRydWdGbihkcnVnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGRlbnlpdCA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIkdldCBCZW50XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuLWRhbmdlclwiLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRydWdGbihkcnVnLCBpbXBJbmQpOyAvLyBJZiBpbXBhaXJlZCwgdGhpcyBpcyB0cnVlIHRvby4gICBvb3BzISA6KVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGJvb3Rib3guZGlhbG9nKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgIHRpdGxlOiBcIkRydWdzIVwiLFxuICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgc2l6ZTogJ3NtYWxsJyxcbiAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGl2ZTogdGFrZWl0LFxuICAgICAgICAgICAgICAgIG5lZ2F0aXZlOiBkZW55aXRcbiAgICAgICAgICAgIH0gLy8gYnV0dG9uc1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmZXI6IGZ1bmN0aW9uKGRydWcsIGltcCwgZHJ1Z0ZuKSB7XG4gICAgICAgICAgICBtYWtlT2ZmZXIoZHJ1ZywgaW1wLCBkcnVnRm4pO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoZXJzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG4gICAgdmFyIEJhbmQgPSByZXF1aXJlKCcuL0JhbmQuanMnKSgpO1xuICAgIHZhciBXR08gPSByZXF1aXJlKCcuL1dHTy5qcycpKCk7XG4gICAgdmFyIEdyYXBldmluZSA9IHJlcXVpcmUoJy4vR3JhcGV2aW5lLmpzJykoKTtcbiAgICB2YXIgRHJ1Z1Byb21wdCA9IHJlcXVpcmUoJy4vRHJ1Z1Byb21wdC5qcycpKCk7XG5cbiAgICB2YXIgaW1wYWlybCA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgV0dPLmltcGFpcighIWIpO1xuICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICBHcmFwZXZpbmUuaW1wYWlyKCEhYik7XG4gICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgIEJhbmQuaW1wYWlyKCEhYik7XG4gICAgICAgIEJhbmQucmVmcmVzaCgpO1xuICAgICAgICByZXR1cm4gaW1wYWlyZWQ7XG4gICAgfTtcblxuICAgIHZhciByZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEJhbmQuY2xlYXIoKTtcbiAgICAgICAgV0dPLmNsZWFyKCk7XG4gICAgICAgIEdyYXBldmluZS5jbGVhcigpO1xuXG4gICAgICAgIC8qIE9ubHkgYmluZCB0aGVzZSBldmVudHMgb24gZmlyc3QgcGFzcyAqL1xuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAkKFwiI3RpdGxlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmQuaW5jRGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2Fib3V0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmQuZHJ1Z29mZmVyKFwibHNkXCIsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI25ld19nYW1lXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICBEcnVnUHJvbXB0Lm9mZmVyKFwibHNkXCIsIGltcGFpcmVkLCBCYW5kLmRydWdvZmZlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjdG91cnNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLm90aGVyU29uZygpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjY2hhcnRzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5hZGRJdGVtKFwiWW91IGFyZSBvbiB0aGUgY2hhcnRzXCIpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjaG93X3RvX3BsYXlcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1wYWlyZWQgPSAhaW1wYWlyZWQ7XG4gICAgICAgICAgICAgICAgaW1wYWlybChpbXBhaXJlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjcmVsZWFzZXNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgV0dPLmFkZEl0ZW0oXCJSZWxlYXNlcyBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2RydWdzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmQuZHJ1Z29mZmVyKFwibHNkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5jRGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBCYW5kLmluY0RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2hhdGV2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3RhcnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wYWlybChiKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG5cblxuICAgIHZhciBhcnRpc3RzID0gW1xuICAgICAgICBcIlRoZSBCaW5nIEJhbmdzXCIsXG4gICAgICAgIFwiTW9kZXJuIFNob2VcIixcbiAgICAgICAgXCJUZWFtIEdvcmRvblwiLFxuICAgICAgICBcIkNvcmV5IERvY3Rvcm93XCIsXG4gICAgICAgIFwiS3VydCAobm90IHRoYXQgb25lLCB0aGUgb3RoZXIgb25lKVwiLFxuICAgICAgICBcIk15IFVuZGVyd2VhclwiLFxuICAgICAgICBcIkludGVybmFsIElzc3Vlc1wiLFxuICAgICAgICBcIkNhdCBWaWRlbyBDbHViXCIsXG4gICAgICAgIFwiTmF2aSBpcyBteSBTcGlyaXQgR3VpZGVcIixcbiAgICAgICAgXCJCbHVlIENoaWNrZW4gTnVnZ2V0XCIsXG4gICAgICAgIFwiWWFybiBQb3Jub2dyYXBoeVwiLFxuICAgICAgICBcIjYgY3lsaW5kZXIgTWFrZXVwXCIsXG4gICAgICAgIFwiVGhlIEJ1cmxhcCBQZWFudXRcIixcbiAgICAgICAgXCJUZXF1aWxsYSBNb2NraW5nYmlyZFwiLFxuICAgICAgICBcIkFuYXJrZXkgaW4gdGhlIExpYnJhcnlcIixcbiAgICAgICAgXCJCcm90aGVyIFRzaG9iZXJcIlxuICAgIF07XG5cbiAgICB2YXIgc29uZ3RpdGxlcyA9IFtcbiAgICAgICAgXCJUaGlzIGlzIGEgVHVuZVwiLFxuICAgICAgICBcIllvZGVscyBtYWtlIG1lIGhhcHB5XCIsXG4gICAgICAgIFwiSXQncyBhIHdpbGwgcm9sbCBkYW1taXRcIixcbiAgICAgICAgXCJJIGxpa2UgcG9wY29yblwiLFxuICAgICAgICBcIk15IEVsZWN0cmljaWFuIE1hZGUgbWUgU2FkXCIsXG4gICAgICAgIFwiUk5HIGluIEhlYXJ0aHN0b25lLCBGVFdcIixcbiAgICAgICAgXCJNeSB0aGlyZCBiZWxseSBidXR0b25cIixcbiAgICAgICAgXCJXYXRjaGluZyBZb3VUdWJlIGF0IFdvcmtcIixcbiAgICAgICAgXCJUaGUgVHJpZm9yY2UgaXMgcG9pbnR5XCIsXG4gICAgICAgIFwiVGhleSBncm93IGZyb20gc3BlbGxzXCIsXG4gICAgICAgIFwiSSBwbGF5ZWQgYSBtYWdlIGFuZCBJIGxpa2VkIGl0XCIsXG4gICAgICAgIFwiSSBzdGlsbCBwbGF5IG9sZCBnYW1lc1wiLFxuICAgICAgICBcIkphdmEgYWludCBqYXZhc2NyaXB0XCIsXG4gICAgICAgIFwiNTAgcmVhc29ucyB3aHkgSmF2YSBpcyBhIGZhZFwiLFxuICAgICAgICBcIlRoZSBiZXN0IHBhcnQgb2YgbWUgaXMgbGVmdCBoYW5kZWRcIixcbiAgICAgICAgXCJJdCB0YWtlcyBhIGZldyB5ZWFycyB0byBsaXN0ZW4gdG8gbXkgcGxheWxpc3RcIixcbiAgICAgICAgXCJUYW5nZW50aWFsIENvbGRcIixcbiAgICAgICAgXCJUaHJvd2luZyBhIHF1YXJ0ZXIgYW5kIHdpc2hpbmcgeW91IHdlbGxcIixcbiAgICAgICAgXCJNeSBnb29nbGUgY2FsZW5kYXIgaXMgcmlkaWN1bG91c1wiLFxuICAgICAgICBcIlJlbWVtYmVyIHdoZW4gcGVvcGxlIGxpbmVkIHVwIHRvIGJ1eSBXaW5kb3dzIDk1PyAgQ3JhenkhXCIsXG4gICAgICAgIFwiUmljaGFyZCBTdGFsbG1hbiB3YXMgbXkgYmFieSBzaXR0ZXJcIixcbiAgICAgICAgXCJMb29raW5nIHRvIFRyYWluP1wiLFxuICAgICAgICBcIllvdSBkbyBub3QgaGF2ZSB0aGUgcHJvcGVyIHN0b25lXCIsXG4gICAgICAgIFwiSSBhbSBub3QgcmVhZHlcIixcbiAgICAgICAgXCJCdWdneSB2aWRlbyBnYW1lcy4gIFdoYXQncyB1cCB3aXRoIHRoYXQ/XCIsXG4gICAgICAgIFwiSXMgQ2FsbCBvZiBEdXR5IHN0aWxsIGEgdGhpbmc/XCIsXG4gICAgICAgIFwiSSBoYXZlIGEgbWlsbGlvbiBiYWxscyBhbmQgSSBhbSB0aGUgc2l6ZSBvZiBhIHBlYW51dFwiLFxuICAgICAgICBcIkJlY2F1c2UsIHlvdSBrbm93LCB0aGUgYmFieVwiXG4gICAgXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tKDQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcbiAgICAgICAgbWFzdGVyY291bnQrKztcbiAgICAgICAgdmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdjbGFzc3R5cGUnOiBjdCxcbiAgICAgICAgICAgICdzdHInOiBzdHJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJTb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcnRpc3RfaW5kZXggPSBtYXN0ZXJjb3VudCAlIGFydGlzdHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNvbmdfaW5kZXggPSBtYXN0ZXJjb3VudCAlIHNvbmd0aXRsZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbGVhc2Vfbm90aWNlID0gXCJOZXcgc2luZ2xlIHJlbGVhc2VkIGJ5ICdcIiArIGFydGlzdHNbYXJ0aXN0X2luZGV4XSArIFwiJyBjYWxsZWQgJ1wiICsgc29uZ3RpdGxlc1tzb25nX2luZGV4XSArIFwiJ1wiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkSXRlbShyZWxlYXNlX25vdGljZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBodG1sc3RyID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNzc2dsb2JhbFwiKS5odG1sKGh0bWxzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW1zID0gW107XG4gICAgICAgICAgICBhcnRpc3RzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHNvbmd0aXRsZXMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUob2JqKSB7XG4gICAgICAgIHZhciByZXR2YWw7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgc3dpdGNoIChyYW5kb20oNCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0cikge1xuICAgICAgICBtYXN0ZXJjb3VudCsrO1xuICAgICAgICB2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2NsYXNzdHlwZSc6IGN0LFxuICAgICAgICAgICAgJ3N0cic6IHN0clxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0oc3RyKSk7XG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGh0bWxzdHIgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWxzdHIgPSBodG1sc3RyLmNvbmNhdChmb3JtYXRMaW5lKGl0ZW1zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI3NzbG9jYWxcIikuaHRtbChodG1sc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sc3RyO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRhcmdldCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvW0EtWmEtel0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIuY2hhckF0KFxuICAgICAgICAgICAgXCJOT1BRUlNUVVZXWFlaQUJDREVGR0hJSktMTW5vcHFyc3R1dnd4eXphYmNkZWZnaGlqa2xtXCIuaW5kZXhPZihjKVxuICAgICAgICApO1xuICAgIH0pO1xufTtcbiIsIi8vIHN0b25lc3VuLmpzXG52YXIgR2FtZU1hbmFnZXIgPSByZXF1aXJlKCcuL0dhbWVNYW5hZ2VyLmpzJykoKTtcblxudmFyIHBhc3N0aW1lID0gZnVuY3Rpb24oKSB7XG4gICAgR2FtZU1hbmFnZXIuaW5jRGF0ZSgpO1xuICAgIHNldFRpbWVvdXQocGFzc3RpbWUsIDMwMDApO1xufVxuXG4vLyBBZGQgc2h1ZmZsZSBmdW5jdGlvbiB0byBhbGwgYXJyYXkgb2JqZWN0c1xuQXJyYXkucHJvdG90eXBlLnNodWZmbGUgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBybmQsIHRtcCwgaSA9IHRoaXMubGVuZ3RoOyBpOyBybmQgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogaSksIHRtcCA9IHRoaXNbLS1pXSwgdGhpc1tpXSA9IHRoaXNbcm5kXSwgdGhpc1tybmRdID0gdG1wKTtcbn07XG5cblxuLyogRGVmaW5lIGEgJ2NvbnNvbGUnIG9iamVjdCBmb3IgSUUgKi9cbmlmICh0eXBlb2YgY29uc29sZSAhPT0gJ29iamVjdCcpIHtcbiAgICBjb25zb2xlID0ge1xuICAgICAgICBsb2c6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRlYnVnOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBpbmZvOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB3YXJuOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgYXNzZXJ0OiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZGlyOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkaXJ4bWw6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHRyYWNlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBncm91cDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZ3JvdXBDb2xsYXBzZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdyb3VwRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjb3VudDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZXhjZXB0aW9uOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0YWJsZTogZnVuY3Rpb24oKSB7fVxuICAgIH07XG59XG5cbiQod2luZG93KS5sb2FkKEdhbWVNYW5hZ2VyLmluaXQpO1xuc2V0VGltZW91dChwYXNzdGltZSwgMzAwMCk7XG4iXX0=
