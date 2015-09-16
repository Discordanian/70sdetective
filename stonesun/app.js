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
                "addiction": 1,
                "health": 3,
                "creativity": 10,
                "happiness": 3,
                "alertness": 5
            }
        },
        "alcohol": {
            "addiction": 0,
            "factors": {
                "addiction": 5,
                "health": 5,
                "creativity": 2,
                "happiness": 5,
                "alertness": 10
            }
        },
        "marijuanna": {
            "addiction": 0,
            "factors": {
                "addiction": 3,
                "health": 3,
                "creativity": 3,
                "happiness": 7,
                "alertness": 11
            }
        },
        "herion": {
            "addiction": 0,
            "factors": {
                "addiction": 10,
                "health": 9,
                "creativity": 10,
                "happiness": 0,
                "alertness": 12
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

    function flavorPop(pop, loc) {
        var retval = "";
        if (pop > 85) {
            retval = "worshipped as the rock diety that you are!";
        }
        if (pop < 86) {
            retval = "known to even casual fans";
        }
        if (pop < 65) {
            retval = "getting your music pirated by scores of youth";
        }
        if (pop < 45) {
            retval = "getting some air-play on radio stations.";
        }
        if (pop < 25) {
            retval = "known to a few die-hard fans.";
        }
        if (pop < 16) {
            retval = "virtually unknown.";
        }
        retval = "At the " + loc + " level you are " + retval;
        return retval;

    }


    // Return public interface
    return {
        setName: function(str) {
            if (str.trim() !== "") {
                bandname = str;
            }
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
                        drugs.lsd.addiction += drugs.lsd.factors.addiction;
                    } else {
                        happiness -= drugs.lsd.factors.happiness;
                        alertness -= drugs.lsd.factors.alertness;
                        creativity -= drugs.lsd.factors.creativity;
                        health -= drugs.lsd.factors.health;
                        drugs.lsd.addiction -= (drugs.lsd.factors.addiction / 2);
                    }
                    refreshPersonal();
                    break;
                case "alcohol":
                    if (taken) {
                        happiness += drugs.alcohol.factors.happiness;
                        alertness += drugs.alcohol.factors.alertness;
                        creativity += drugs.alcohol.factors.creativity;
                        health += drugs.alcohol.factors.health;
                        drugs.alcohol.addiction += drugs.alcohol.factors.addiction;
                    } else {
                        happiness -= drugs.alcohol.factors.happiness;
                        alertness -= drugs.alcohol.factors.alertness;
                        creativity -= drugs.alcohol.factors.creativity;
                        health -= drugs.alcohol.factors.health;
                        drugs.alcohol.addiction -= (drugs.alcohol.factors.addiction / 2);
                    }
                    refreshPersonal();
                    break;
                case "marijuanna":
                    if (taken) {
                        happiness += drugs.marijuanna.factors.happiness;
                        alertness += drugs.marijuanna.factors.alertness;
                        creativity += drugs.marijuanna.factors.creativity;
                        health += drugs.marijuanna.factors.health;
                        drugs.marijuanna.addiction += drugs.marijuanna.factors.addiction;
                    } else {
                        happiness -= drugs.marijuanna.factors.happiness;
                        alertness -= drugs.marijuanna.factors.alertness;
                        creativity -= drugs.marijuanna.factors.creativity;
                        health -= drugs.marijuanna.factors.health;
                        drugs.marijuanna.addiction -= (drugs.marijuanna.factors.addiction / 2);
                    }
                    refreshPersonal();
                    break;
                case "herion":
                    if (taken) {
                        happiness += drugs.herion.factors.happiness;
                        alertness += drugs.herion.factors.alertness;
                        creativity += drugs.herion.factors.creativity;
                        health += drugs.herion.factors.health;
                        drugs.herion.addiction += drugs.herion.factors.addiction;
                    } else {
                        happiness -= drugs.herion.factors.happiness;
                        alertness -= drugs.herion.factors.alertness;
                        creativity -= drugs.herion.factors.creativity;
                        health -= drugs.herion.factors.health;
                        drugs.herion.addiction -= (drugs.herion.factors.addiction / 2);
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
        getDrugs: function() {
            return drugs;
        },
        getPop: function(popType) {
            var retval = 'No one cares about you.';
            if (popType === "local") {
                retval = flavorPop(localp, popType);
            }
            if (popType === "national") {
                retval = flavorPop(nationalp, popType);
            }
            if (popType === "global") {
                retval = flavorPop(globalp, popType);
            }
            return retval;
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

},{"./rot13.js":8}],2:[function(require,module,exports){
module.exports = function() {
    // Requires Bootbox.js
    bootbox.addLocale("rock", {
        OK: 'Rock',
        CANCEL: 'Bugger Off',
        CONFIRM: 'Alrighty Then'
    });
    bootbox.setLocale("rock");

    // Private vars

    function getName(nameFn) {
        var msg = "Name your band : ";


        bootbox.prompt({
            message: msg,
            title: "Rock n Roll Fame Await!",
            closeButton: false,
            size: 'medium',
            callback: nameFn
        });
    }

    function drugRange(n) {
        var retStr = '';
        if (n > 85) {
            retStr = '<p class="text-danger">You will gladly shiv your own mother for some ';
        }
        if (n < 85) {
            retStr = '<p class="text-warning">You are at one with ';
        }
        if (n < 75) {
            retStr = '<p class="text-info">Friends assume you\'ll gladly take more ';
        }
        if (n < 55) {
            retStr = '<p class="text-info">You have a reputation on indulging on ';
        }
        if (n < 35) {
            retStr = '<p class="text-success">You are very keen on ';
        }
        if (n < 25) {
            retStr = '<p class="text-success">You kind of like ';
        }
        if (n < 15) {
            retStr = '<p class="text-muted">You do not have much of an opinion on ';
        }
        return retStr;
    }

    function displayDrugPreferences(d) {
        var msg = '';
        msg += drugRange(d.alcohol.addiction) + "<u><b>alcohol</b></u>.</p>";
        msg += drugRange(d.marijuanna.addiction) + "<u><b>marijuanna</b></u>.</p>";
        msg += drugRange(d.lsd.addiction) + "<u><b>lsd</b></u>.</p>";
        msg += drugRange(d.herion.addiction) + "<u><b>herion</b></u>.</p>";

        bootbox.alert({
            size: 'large',
            message: msg
        });
    }


    // Return public interface
    return {
        name: function(fn) {
            getName(fn);
        },
        tour: function() {},
        drugPreferences: function(d) {
            displayDrugPreferences(d);
        },
        clear: function() {
            return true;
        }
    }; // end return of public object

};

},{}],3:[function(require,module,exports){
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
    var locations = [
        'the supermarket',
        'the rave',
        'the romance section at the local library',
        'the alley behind that taco bell you tell everyone you\'d never eat at',
        'the bowling alley you go to ironically',
        'the train station',
        'the rest area where they caught that one dude doing that one thing',
        'the bar',
        'the party',
        'the Bar Mitzvah for that one kid of your cousin\'s that you only see',
        'the wedding of your Ex'
    ];



    function makeOffer(drug, impInd, drugFn) {
        var msg = "Your " + pushers[drugid++ % pushers.length] + " offers you some " + drug + " at " + locations[drugid % locations.length] + ".";
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
            locations.shuffle();
            return true;
        }
    }; // end return of public object

};

},{"./rot13.js":8}],4:[function(require,module,exports){
module.exports = function() {
    var first = true;
    var impaired = false;
    var Band = require('./Band.js')();
    var WGO = require('./WGO.js')();
    var Grapevine = require('./Grapevine.js')();
    var DrugPrompt = require('./DrugPrompt.js')();
    var BandPrompt = require('./BandPrompt.js')();

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
                Band.drugoffer("herion", true);
            });
            $("#new_game").click(function() {
                restart();
                BandPrompt.name(Band.setName);
                // restart();
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
                BandPrompt.drugPreferences(Band.getDrugs());
            });
        }

        return true;
    };

    function showPopularity() {
        Grapevine.addItem(Band.getPop("local"));
        Grapevine.addItem(Band.getPop("national"));
        Grapevine.addItem(Band.getPop("global"));
        Grapevine.refresh();
    }

    // Return public interface
    return {
        incDate: function() {
            var x = Band.incDate() % 30;
            if (x == 0) {
                showPopularity();
            }
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

},{"./Band.js":1,"./BandPrompt.js":2,"./DrugPrompt.js":3,"./Grapevine.js":5,"./WGO.js":6}],5:[function(require,module,exports){
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

},{"./random.js":7,"./rot13.js":8}],6:[function(require,module,exports){
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

},{"./random.js":7,"./rot13.js":8}],7:[function(require,module,exports){
module.exports = function(target) {
    return Math.floor(Math.random() * target);
};

},{}],8:[function(require,module,exports){
module.exports = function(s) {
    return s.replace(/[A-Za-z]/g, function(c) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)
        );
    });
};

},{}],9:[function(require,module,exports){
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

},{"./GameManager.js":4}]},{},[9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9CYW5kUHJvbXB0LmpzIiwiYXBwL0RydWdQcm9tcHQuanMiLCJhcHAvR2FtZU1hbmFnZXIuanMiLCJhcHAvR3JhcGV2aW5lLmpzIiwiYXBwL1dHTy5qcyIsImFwcC9yYW5kb20uanMiLCJhcHAvcm90MTMuanMiLCJhcHAvc3RvbmVzdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgYmFuZG5hbWUgPSBcIkFianVyZXIgTm93aGVyZVwiO1xuICAgIHZhciBtYXN0ZXJpZCA9IDA7IC8vIEp1c3QgYSB1bmlxdWUga2V5XG4gICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgLy8gcGVyc29uYWxcbiAgICB2YXIgaGVhbHRoID0gMDtcbiAgICB2YXIgY3JlYXRpdml0eSA9IDA7XG4gICAgdmFyIGhhcHBpbmVzcyA9IDA7XG4gICAgdmFyIGFsZXJ0bmVzcyA9IDA7XG5cbiAgICAvLyB0aW1lXG4gICAgdmFyIGRheWNvdW50ID0gMTtcbiAgICB2YXIgZG93ID0gW1xuICAgICAgICBcIlN1bmRheVwiLFxuICAgICAgICBcIk1vbmRheVwiLFxuICAgICAgICBcIlR1ZXNkYXlcIixcbiAgICAgICAgXCJXZWRuZXNkYXlcIixcbiAgICAgICAgXCJUaHVyc2RheVwiLFxuICAgICAgICBcIkZyaWRheVwiLFxuICAgICAgICBcIlNhdHVyZGF5XCJcbiAgICBdO1xuXG4gICAgLy8gcG9wdWxhcml0eVxuICAgIHZhciBsb2NhbHAgPSAwO1xuICAgIHZhciBuYXRpb25hbHAgPSAwO1xuICAgIHZhciBnbG9iYWxwID0gMDtcblxuICAgIHZhciBkcnVncyA9IHtcbiAgICAgICAgXCJsc2RcIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMSxcbiAgICAgICAgICAgICAgICBcImhlYWx0aFwiOiAzLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAxMCxcbiAgICAgICAgICAgICAgICBcImhhcHBpbmVzc1wiOiAzLFxuICAgICAgICAgICAgICAgIFwiYWxlcnRuZXNzXCI6IDVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJhbGNvaG9sXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogNSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMixcbiAgICAgICAgICAgICAgICBcImhhcHBpbmVzc1wiOiA1LFxuICAgICAgICAgICAgICAgIFwiYWxlcnRuZXNzXCI6IDEwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibWFyaWp1YW5uYVwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiAzLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDMsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDMsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogNyxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAxMVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhlcmlvblwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiAxMCxcbiAgICAgICAgICAgICAgICBcImhlYWx0aFwiOiA5LFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAxMCxcbiAgICAgICAgICAgICAgICBcImhhcHBpbmVzc1wiOiAwLFxuICAgICAgICAgICAgICAgIFwiYWxlcnRuZXNzXCI6IDEyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB2YXIgc2luZ2xlcyA9IFtdOyAvLyBMaW5lIGl0ZW1zIGluIFxuICAgIHZhciB0b3VycyA9IFtdO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGFkZFNpbmdsZShuYW1lKSB7XG4gICAgICAgIHZhciByZXR2YWwgPSB7XG4gICAgICAgICAgICAnaWQnOiBtYXN0ZXJpZCsrLFxuICAgICAgICAgICAgJ25hbWUnOiBuYW1lLFxuICAgICAgICAgICAgJ2xwb3AnOiAwLFxuICAgICAgICAgICAgJ25wb3AnOiAwLFxuICAgICAgICAgICAgJ2dwb3AnOiAwXG4gICAgICAgIH07XG4gICAgICAgIHNpbmdsZXMucHVzaChyZXR2YWwpO1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGxvY2FscCA9IG5hdGlvbmFscCA9IGdsb2JhbHAgPSAwO1xuICAgICAgICBoYXBwaW5lc3MgPSBhbGVydG5lc3MgPSBjcmVhdGl2aXR5ID0gNTA7XG4gICAgICAgIGhlYWx0aCA9IDgwO1xuICAgICAgICBkYXljb3VudCA9IDE7XG4gICAgICAgIHNjb3JlID0gMDtcbiAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgIHJlZnJlc2hQb3B1bGFyaXR5KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBlcnNvbmFsKCkge1xuICAgICAgICAkKFwiI3BsYXllcl9oZWFsdGhcIikuaHRtbChoZWFsdGgpO1xuICAgICAgICAkKFwiI3BsYXllcl9jcmVhdGl2aXR5XCIpLmh0bWwoY3JlYXRpdml0eSk7XG4gICAgICAgICQoXCIjcGxheWVyX2hhcHBpbmVzc1wiKS5odG1sKGhhcHBpbmVzcyk7XG4gICAgICAgICQoXCIjcGxheWVyX2FsZXJ0bmVzc1wiKS5odG1sKGFsZXJ0bmVzcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBvcHVsYXJpdHkoKSB7XG4gICAgICAgICQoXCIjbG9jYWxfcG9wXCIpLmh0bWwobG9jYWxwKTtcbiAgICAgICAgJChcIiNuYXRpb25hbF9wb3BcIikuaHRtbChuYXRpb25hbHApO1xuICAgICAgICAkKFwiI2dsb2JhbF9wb3BcIikuaHRtbChnbG9iYWxwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTmFtZSgpIHtcbiAgICAgICAgaWYgKGltcGFpcmVkKSB7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwocm90MTMoYmFuZG5hbWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjYmFuZG5hbWVcIikuaHRtbChiYW5kbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmbGF2b3JQb3AocG9wLCBsb2MpIHtcbiAgICAgICAgdmFyIHJldHZhbCA9IFwiXCI7XG4gICAgICAgIGlmIChwb3AgPiA4NSkge1xuICAgICAgICAgICAgcmV0dmFsID0gXCJ3b3JzaGlwcGVkIGFzIHRoZSByb2NrIGRpZXR5IHRoYXQgeW91IGFyZSFcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgODYpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwia25vd24gdG8gZXZlbiBjYXN1YWwgZmFuc1wiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3AgPCA2NSkge1xuICAgICAgICAgICAgcmV0dmFsID0gXCJnZXR0aW5nIHlvdXIgbXVzaWMgcGlyYXRlZCBieSBzY29yZXMgb2YgeW91dGhcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgNDUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwiZ2V0dGluZyBzb21lIGFpci1wbGF5IG9uIHJhZGlvIHN0YXRpb25zLlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3AgPCAyNSkge1xuICAgICAgICAgICAgcmV0dmFsID0gXCJrbm93biB0byBhIGZldyBkaWUtaGFyZCBmYW5zLlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3AgPCAxNikge1xuICAgICAgICAgICAgcmV0dmFsID0gXCJ2aXJ0dWFsbHkgdW5rbm93bi5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR2YWwgPSBcIkF0IHRoZSBcIiArIGxvYyArIFwiIGxldmVsIHlvdSBhcmUgXCIgKyByZXR2YWw7XG4gICAgICAgIHJldHVybiByZXR2YWw7XG5cbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0TmFtZTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyLnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGJhbmRuYW1lID0gc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKGJhbmRuYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgIHJlZnJlc2hQb3B1bGFyaXR5KCk7XG4gICAgICAgICAgICByZWZyZXNoTmFtZSgpO1xuICAgICAgICB9LFxuICAgICAgICBkcnVnb2ZmZXI6IGZ1bmN0aW9uKGRydWduYW1lLCB0YWtlbikge1xuICAgICAgICAgICAgc3dpdGNoIChkcnVnbmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsc2RcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmxzZC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5sc2QuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5sc2QuYWRkaWN0aW9uICs9IGRydWdzLmxzZC5mYWN0b3JzLmFkZGljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5sc2QuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5sc2QuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLmxzZC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmxzZC5hZGRpY3Rpb24gLT0gKGRydWdzLmxzZC5mYWN0b3JzLmFkZGljdGlvbiAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWxjb2hvbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5hbGNvaG9sLmFkZGljdGlvbiArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmFsY29ob2wuYWRkaWN0aW9uIC09IChkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYXJpanVhbm5hXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLm1hcmlqdWFubmEuYWRkaWN0aW9uICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hZGRpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MubWFyaWp1YW5uYS5hZGRpY3Rpb24gLT0gKGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hZGRpY3Rpb24gLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhlcmlvblwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmhlcmlvbi5hZGRpY3Rpb24gKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MuaGVyaW9uLmFkZGljdGlvbiAtPSAoZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBkcnVnLHRha2VuIDogXCIgKyBkcnVnbmFtZSArIFwiICwgXCIgKyB0YWtlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXREcnVnczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJ1Z3M7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFBvcDogZnVuY3Rpb24ocG9wVHlwZSkge1xuICAgICAgICAgICAgdmFyIHJldHZhbCA9ICdObyBvbmUgY2FyZXMgYWJvdXQgeW91Lic7XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJsb2NhbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gZmxhdm9yUG9wKGxvY2FscCwgcG9wVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJuYXRpb25hbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gZmxhdm9yUG9wKG5hdGlvbmFscCwgcG9wVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJnbG9iYWxcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IGZsYXZvclBvcChnbG9iYWxwLCBwb3BUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGluY0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF5Y291bnQrKztcbiAgICAgICAgICAgIHZhciB3ayA9IE1hdGguZmxvb3IoKGRheWNvdW50IC8gNykgKyAxKSAlIDUyO1xuICAgICAgICAgICAgdmFyIHlyID0gTWF0aC5mbG9vcigoZGF5Y291bnQgLyAzNjUpICsgMSk7XG4gICAgICAgICAgICAkKFwiI3RpbWVfZG93XCIpLmh0bWwoZG93W2RheWNvdW50ICUgN10pO1xuICAgICAgICAgICAgJChcIiN0aW1lX3llYXJcIikuaHRtbCh5cik7XG4gICAgICAgICAgICAkKFwiI3RpbWVfd2Vla1wiKS5odG1sKHdrKTtcbiAgICAgICAgICAgIHJldHVybiBkYXljb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXF1aXJlcyBCb290Ym94LmpzXG4gICAgYm9vdGJveC5hZGRMb2NhbGUoXCJyb2NrXCIsIHtcbiAgICAgICAgT0s6ICdSb2NrJyxcbiAgICAgICAgQ0FOQ0VMOiAnQnVnZ2VyIE9mZicsXG4gICAgICAgIENPTkZJUk06ICdBbHJpZ2h0eSBUaGVuJ1xuICAgIH0pO1xuICAgIGJvb3Rib3guc2V0TG9jYWxlKFwicm9ja1wiKTtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuXG4gICAgZnVuY3Rpb24gZ2V0TmFtZShuYW1lRm4pIHtcbiAgICAgICAgdmFyIG1zZyA9IFwiTmFtZSB5b3VyIGJhbmQgOiBcIjtcblxuXG4gICAgICAgIGJvb3Rib3gucHJvbXB0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgIHRpdGxlOiBcIlJvY2sgbiBSb2xsIEZhbWUgQXdhaXQhXCIsXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICBzaXplOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBuYW1lRm5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJ1Z1JhbmdlKG4pIHtcbiAgICAgICAgdmFyIHJldFN0ciA9ICcnO1xuICAgICAgICBpZiAobiA+IDg1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPllvdSB3aWxsIGdsYWRseSBzaGl2IHlvdXIgb3duIG1vdGhlciBmb3Igc29tZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgODUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtd2FybmluZ1wiPllvdSBhcmUgYXQgb25lIHdpdGggJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDc1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LWluZm9cIj5GcmllbmRzIGFzc3VtZSB5b3VcXCdsbCBnbGFkbHkgdGFrZSBtb3JlICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCA1NSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1pbmZvXCI+WW91IGhhdmUgYSByZXB1dGF0aW9uIG9uIGluZHVsZ2luZyBvbiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgMzUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtc3VjY2Vzc1wiPllvdSBhcmUgdmVyeSBrZWVuIG9uICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCAyNSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1zdWNjZXNzXCI+WW91IGtpbmQgb2YgbGlrZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgMTUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtbXV0ZWRcIj5Zb3UgZG8gbm90IGhhdmUgbXVjaCBvZiBhbiBvcGluaW9uIG9uICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFN0cjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5RHJ1Z1ByZWZlcmVuY2VzKGQpIHtcbiAgICAgICAgdmFyIG1zZyA9ICcnO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQuYWxjb2hvbC5hZGRpY3Rpb24pICsgXCI8dT48Yj5hbGNvaG9sPC9iPjwvdT4uPC9wPlwiO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQubWFyaWp1YW5uYS5hZGRpY3Rpb24pICsgXCI8dT48Yj5tYXJpanVhbm5hPC9iPjwvdT4uPC9wPlwiO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQubHNkLmFkZGljdGlvbikgKyBcIjx1PjxiPmxzZDwvYj48L3U+LjwvcD5cIjtcbiAgICAgICAgbXNnICs9IGRydWdSYW5nZShkLmhlcmlvbi5hZGRpY3Rpb24pICsgXCI8dT48Yj5oZXJpb248L2I+PC91Pi48L3A+XCI7XG5cbiAgICAgICAgYm9vdGJveC5hbGVydCh7XG4gICAgICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgZ2V0TmFtZShmbik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRydWdQcmVmZXJlbmNlczogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgZGlzcGxheURydWdQcmVmZXJlbmNlcyhkKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gUmVxdWlyZXMgQm9vdGJveC5qc1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBkcnVnaWQgPSAwO1xuICAgIHZhciBwdXNoZXJzID0gW1xuICAgICAgICAnYmFzc2lzdCcsXG4gICAgICAgICdkcnVtbWVyJyxcbiAgICAgICAgJ2d1aXRhcmlzdCcsXG4gICAgICAgICdmbGF0IG1hdGUnLFxuICAgICAgICAnbW90aGVyJyxcbiAgICAgICAgJ2xhbmRsb3JkJyxcbiAgICAgICAgJ2hhaXIgZHJlc3NlcicsXG4gICAgICAgICdwaXp6YSBkZWxpdmVyeSBkcml2ZXInLFxuICAgICAgICAnYmFydGVuZGVyJyxcbiAgICAgICAgJ2ZyaWVuZCB0aGUgYXNwaXJpbmcgXFxcImFjdG9yXFxcIidcbiAgICBdO1xuICAgIHZhciBsb2NhdGlvbnMgPSBbXG4gICAgICAgICd0aGUgc3VwZXJtYXJrZXQnLFxuICAgICAgICAndGhlIHJhdmUnLFxuICAgICAgICAndGhlIHJvbWFuY2Ugc2VjdGlvbiBhdCB0aGUgbG9jYWwgbGlicmFyeScsXG4gICAgICAgICd0aGUgYWxsZXkgYmVoaW5kIHRoYXQgdGFjbyBiZWxsIHlvdSB0ZWxsIGV2ZXJ5b25lIHlvdVxcJ2QgbmV2ZXIgZWF0IGF0JyxcbiAgICAgICAgJ3RoZSBib3dsaW5nIGFsbGV5IHlvdSBnbyB0byBpcm9uaWNhbGx5JyxcbiAgICAgICAgJ3RoZSB0cmFpbiBzdGF0aW9uJyxcbiAgICAgICAgJ3RoZSByZXN0IGFyZWEgd2hlcmUgdGhleSBjYXVnaHQgdGhhdCBvbmUgZHVkZSBkb2luZyB0aGF0IG9uZSB0aGluZycsXG4gICAgICAgICd0aGUgYmFyJyxcbiAgICAgICAgJ3RoZSBwYXJ0eScsXG4gICAgICAgICd0aGUgQmFyIE1pdHp2YWggZm9yIHRoYXQgb25lIGtpZCBvZiB5b3VyIGNvdXNpblxcJ3MgdGhhdCB5b3Ugb25seSBzZWUnLFxuICAgICAgICAndGhlIHdlZGRpbmcgb2YgeW91ciBFeCdcbiAgICBdO1xuXG5cblxuICAgIGZ1bmN0aW9uIG1ha2VPZmZlcihkcnVnLCBpbXBJbmQsIGRydWdGbikge1xuICAgICAgICB2YXIgbXNnID0gXCJZb3VyIFwiICsgcHVzaGVyc1tkcnVnaWQrKyAlIHB1c2hlcnMubGVuZ3RoXSArIFwiIG9mZmVycyB5b3Ugc29tZSBcIiArIGRydWcgKyBcIiBhdCBcIiArIGxvY2F0aW9uc1tkcnVnaWQgJSBsb2NhdGlvbnMubGVuZ3RoXSArIFwiLlwiO1xuICAgICAgICBpZiAoaW1wSW5kKSB7XG4gICAgICAgICAgICBtc2cgPSByb3QxMyhtc2cpO1xuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgdGFrZWl0ID0ge1xuICAgICAgICAgICAgbGFiZWw6IFwiWWVzIFBsZWFzZVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0bi1zdWNjZXNzXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZHJ1Z0ZuKGRydWcsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgZGVueWl0ID0ge1xuICAgICAgICAgICAgbGFiZWw6IFwiR2V0IEJlbnRcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4tZGFuZ2VyXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZHJ1Z0ZuKGRydWcsIGltcEluZCk7IC8vIElmIGltcGFpcmVkLCB0aGlzIGlzIHRydWUgdG9vLiAgIG9vcHMhIDopXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYm9vdGJveC5kaWFsb2coe1xuICAgICAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICAgICAgdGl0bGU6IFwiRHJ1Z3MhXCIsXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICBzaXplOiAnc21hbGwnLFxuICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgIHBvc2l0aXZlOiB0YWtlaXQsXG4gICAgICAgICAgICAgICAgbmVnYXRpdmU6IGRlbnlpdFxuICAgICAgICAgICAgfSAvLyBidXR0b25zXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICB9LFxuICAgICAgICBvZmZlcjogZnVuY3Rpb24oZHJ1ZywgaW1wLCBkcnVnRm4pIHtcbiAgICAgICAgICAgIG1ha2VPZmZlcihkcnVnLCBpbXAsIGRydWdGbik7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1c2hlcnMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgbG9jYXRpb25zLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG4gICAgdmFyIEJhbmQgPSByZXF1aXJlKCcuL0JhbmQuanMnKSgpO1xuICAgIHZhciBXR08gPSByZXF1aXJlKCcuL1dHTy5qcycpKCk7XG4gICAgdmFyIEdyYXBldmluZSA9IHJlcXVpcmUoJy4vR3JhcGV2aW5lLmpzJykoKTtcbiAgICB2YXIgRHJ1Z1Byb21wdCA9IHJlcXVpcmUoJy4vRHJ1Z1Byb21wdC5qcycpKCk7XG4gICAgdmFyIEJhbmRQcm9tcHQgPSByZXF1aXJlKCcuL0JhbmRQcm9tcHQuanMnKSgpO1xuXG4gICAgdmFyIGltcGFpcmwgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIFdHTy5pbXBhaXIoISFiKTtcbiAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICAgICAgR3JhcGV2aW5lLmltcGFpcighIWIpO1xuICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICBCYW5kLmltcGFpcighIWIpO1xuICAgICAgICBCYW5kLnJlZnJlc2goKTtcbiAgICAgICAgcmV0dXJuIGltcGFpcmVkO1xuICAgIH07XG5cbiAgICB2YXIgcmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBCYW5kLmNsZWFyKCk7XG4gICAgICAgIFdHTy5jbGVhcigpO1xuICAgICAgICBHcmFwZXZpbmUuY2xlYXIoKTtcblxuICAgICAgICAvKiBPbmx5IGJpbmQgdGhlc2UgZXZlbnRzIG9uIGZpcnN0IHBhc3MgKi9cbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgJChcIiN0aXRsZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kLmluY0RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNhYm91dFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kLmRydWdvZmZlcihcImhlcmlvblwiLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNuZXdfZ2FtZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgQmFuZFByb21wdC5uYW1lKEJhbmQuc2V0TmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gcmVzdGFydCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI3RvdXJzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5vdGhlclNvbmcoKTtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2NoYXJ0c1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUuYWRkSXRlbShcIllvdSBhcmUgb24gdGhlIGNoYXJ0c1wiKTtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2hvd190b19wbGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGltcGFpcmVkID0gIWltcGFpcmVkO1xuICAgICAgICAgICAgICAgIGltcGFpcmwoaW1wYWlyZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI3JlbGVhc2VzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIFdHTy5hZGRJdGVtKFwiUmVsZWFzZXMgc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNkcnVnc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kUHJvbXB0LmRydWdQcmVmZXJlbmNlcyhCYW5kLmdldERydWdzKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2hvd1BvcHVsYXJpdHkoKSB7XG4gICAgICAgIEdyYXBldmluZS5hZGRJdGVtKEJhbmQuZ2V0UG9wKFwibG9jYWxcIikpO1xuICAgICAgICBHcmFwZXZpbmUuYWRkSXRlbShCYW5kLmdldFBvcChcIm5hdGlvbmFsXCIpKTtcbiAgICAgICAgR3JhcGV2aW5lLmFkZEl0ZW0oQmFuZC5nZXRQb3AoXCJnbG9iYWxcIikpO1xuICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5jRGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgeCA9IEJhbmQuaW5jRGF0ZSgpICUgMzA7XG4gICAgICAgICAgICBpZiAoeCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgc2hvd1BvcHVsYXJpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2hhdGV2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3RhcnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wYWlybChiKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG5cblxuICAgIHZhciBhcnRpc3RzID0gW1xuICAgICAgICBcIlRoZSBCaW5nIEJhbmdzXCIsXG4gICAgICAgIFwiTW9kZXJuIFNob2VcIixcbiAgICAgICAgXCJUZWFtIEdvcmRvblwiLFxuICAgICAgICBcIkNvcmV5IERvY3Rvcm93XCIsXG4gICAgICAgIFwiS3VydCAobm90IHRoYXQgb25lLCB0aGUgb3RoZXIgb25lKVwiLFxuICAgICAgICBcIk15IFVuZGVyd2VhclwiLFxuICAgICAgICBcIkludGVybmFsIElzc3Vlc1wiLFxuICAgICAgICBcIkNhdCBWaWRlbyBDbHViXCIsXG4gICAgICAgIFwiTmF2aSBpcyBteSBTcGlyaXQgR3VpZGVcIixcbiAgICAgICAgXCJCbHVlIENoaWNrZW4gTnVnZ2V0XCIsXG4gICAgICAgIFwiWWFybiBQb3Jub2dyYXBoeVwiLFxuICAgICAgICBcIjYgY3lsaW5kZXIgTWFrZXVwXCIsXG4gICAgICAgIFwiVGhlIEJ1cmxhcCBQZWFudXRcIixcbiAgICAgICAgXCJUZXF1aWxsYSBNb2NraW5nYmlyZFwiLFxuICAgICAgICBcIkFuYXJrZXkgaW4gdGhlIExpYnJhcnlcIixcbiAgICAgICAgXCJCcm90aGVyIFRzaG9iZXJcIlxuICAgIF07XG5cbiAgICB2YXIgc29uZ3RpdGxlcyA9IFtcbiAgICAgICAgXCJUaGlzIGlzIGEgVHVuZVwiLFxuICAgICAgICBcIllvZGVscyBtYWtlIG1lIGhhcHB5XCIsXG4gICAgICAgIFwiSXQncyBhIHdpbGwgcm9sbCBkYW1taXRcIixcbiAgICAgICAgXCJJIGxpa2UgcG9wY29yblwiLFxuICAgICAgICBcIk15IEVsZWN0cmljaWFuIE1hZGUgbWUgU2FkXCIsXG4gICAgICAgIFwiUk5HIGluIEhlYXJ0aHN0b25lLCBGVFdcIixcbiAgICAgICAgXCJNeSB0aGlyZCBiZWxseSBidXR0b25cIixcbiAgICAgICAgXCJXYXRjaGluZyBZb3VUdWJlIGF0IFdvcmtcIixcbiAgICAgICAgXCJUaGUgVHJpZm9yY2UgaXMgcG9pbnR5XCIsXG4gICAgICAgIFwiVGhleSBncm93IGZyb20gc3BlbGxzXCIsXG4gICAgICAgIFwiSSBwbGF5ZWQgYSBtYWdlIGFuZCBJIGxpa2VkIGl0XCIsXG4gICAgICAgIFwiSSBzdGlsbCBwbGF5IG9sZCBnYW1lc1wiLFxuICAgICAgICBcIkphdmEgYWludCBqYXZhc2NyaXB0XCIsXG4gICAgICAgIFwiNTAgcmVhc29ucyB3aHkgSmF2YSBpcyBhIGZhZFwiLFxuICAgICAgICBcIlRoZSBiZXN0IHBhcnQgb2YgbWUgaXMgbGVmdCBoYW5kZWRcIixcbiAgICAgICAgXCJJdCB0YWtlcyBhIGZldyB5ZWFycyB0byBsaXN0ZW4gdG8gbXkgcGxheWxpc3RcIixcbiAgICAgICAgXCJUYW5nZW50aWFsIENvbGRcIixcbiAgICAgICAgXCJUaHJvd2luZyBhIHF1YXJ0ZXIgYW5kIHdpc2hpbmcgeW91IHdlbGxcIixcbiAgICAgICAgXCJNeSBnb29nbGUgY2FsZW5kYXIgaXMgcmlkaWN1bG91c1wiLFxuICAgICAgICBcIlJlbWVtYmVyIHdoZW4gcGVvcGxlIGxpbmVkIHVwIHRvIGJ1eSBXaW5kb3dzIDk1PyAgQ3JhenkhXCIsXG4gICAgICAgIFwiUmljaGFyZCBTdGFsbG1hbiB3YXMgbXkgYmFieSBzaXR0ZXJcIixcbiAgICAgICAgXCJMb29raW5nIHRvIFRyYWluP1wiLFxuICAgICAgICBcIllvdSBkbyBub3QgaGF2ZSB0aGUgcHJvcGVyIHN0b25lXCIsXG4gICAgICAgIFwiSSBhbSBub3QgcmVhZHlcIixcbiAgICAgICAgXCJCdWdneSB2aWRlbyBnYW1lcy4gIFdoYXQncyB1cCB3aXRoIHRoYXQ/XCIsXG4gICAgICAgIFwiSXMgQ2FsbCBvZiBEdXR5IHN0aWxsIGEgdGhpbmc/XCIsXG4gICAgICAgIFwiSSBoYXZlIGEgbWlsbGlvbiBiYWxscyBhbmQgSSBhbSB0aGUgc2l6ZSBvZiBhIHBlYW51dFwiLFxuICAgICAgICBcIkJlY2F1c2UsIHlvdSBrbm93LCB0aGUgYmFieVwiXG4gICAgXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tKDQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcbiAgICAgICAgbWFzdGVyY291bnQrKztcbiAgICAgICAgdmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdjbGFzc3R5cGUnOiBjdCxcbiAgICAgICAgICAgICdzdHInOiBzdHJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJTb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcnRpc3RfaW5kZXggPSBtYXN0ZXJjb3VudCAlIGFydGlzdHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNvbmdfaW5kZXggPSBtYXN0ZXJjb3VudCAlIHNvbmd0aXRsZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbGVhc2Vfbm90aWNlID0gXCJOZXcgc2luZ2xlIHJlbGVhc2VkIGJ5ICdcIiArIGFydGlzdHNbYXJ0aXN0X2luZGV4XSArIFwiJyBjYWxsZWQgJ1wiICsgc29uZ3RpdGxlc1tzb25nX2luZGV4XSArIFwiJ1wiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkSXRlbShyZWxlYXNlX25vdGljZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBodG1sc3RyID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNzc2dsb2JhbFwiKS5odG1sKGh0bWxzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW1zID0gW107XG4gICAgICAgICAgICBhcnRpc3RzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHNvbmd0aXRsZXMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUob2JqKSB7XG4gICAgICAgIHZhciByZXR2YWw7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgc3dpdGNoIChyYW5kb20oNCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0cikge1xuICAgICAgICBtYXN0ZXJjb3VudCsrO1xuICAgICAgICB2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2NsYXNzdHlwZSc6IGN0LFxuICAgICAgICAgICAgJ3N0cic6IHN0clxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0oc3RyKSk7XG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGh0bWxzdHIgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWxzdHIgPSBodG1sc3RyLmNvbmNhdChmb3JtYXRMaW5lKGl0ZW1zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI3NzbG9jYWxcIikuaHRtbChodG1sc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sc3RyO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRhcmdldCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvW0EtWmEtel0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIuY2hhckF0KFxuICAgICAgICAgICAgXCJOT1BRUlNUVVZXWFlaQUJDREVGR0hJSktMTW5vcHFyc3R1dnd4eXphYmNkZWZnaGlqa2xtXCIuaW5kZXhPZihjKVxuICAgICAgICApO1xuICAgIH0pO1xufTtcbiIsIi8vIHN0b25lc3VuLmpzXG52YXIgR2FtZU1hbmFnZXIgPSByZXF1aXJlKCcuL0dhbWVNYW5hZ2VyLmpzJykoKTtcblxudmFyIHBhc3N0aW1lID0gZnVuY3Rpb24oKSB7XG4gICAgR2FtZU1hbmFnZXIuaW5jRGF0ZSgpO1xuICAgIHNldFRpbWVvdXQocGFzc3RpbWUsIDMwMDApO1xufVxuXG4vLyBBZGQgc2h1ZmZsZSBmdW5jdGlvbiB0byBhbGwgYXJyYXkgb2JqZWN0c1xuQXJyYXkucHJvdG90eXBlLnNodWZmbGUgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBybmQsIHRtcCwgaSA9IHRoaXMubGVuZ3RoOyBpOyBybmQgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogaSksIHRtcCA9IHRoaXNbLS1pXSwgdGhpc1tpXSA9IHRoaXNbcm5kXSwgdGhpc1tybmRdID0gdG1wKTtcbn07XG5cblxuLyogRGVmaW5lIGEgJ2NvbnNvbGUnIG9iamVjdCBmb3IgSUUgKi9cbmlmICh0eXBlb2YgY29uc29sZSAhPT0gJ29iamVjdCcpIHtcbiAgICBjb25zb2xlID0ge1xuICAgICAgICBsb2c6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRlYnVnOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBpbmZvOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB3YXJuOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgYXNzZXJ0OiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZGlyOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkaXJ4bWw6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHRyYWNlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBncm91cDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZ3JvdXBDb2xsYXBzZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdyb3VwRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjb3VudDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZXhjZXB0aW9uOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0YWJsZTogZnVuY3Rpb24oKSB7fVxuICAgIH07XG59XG5cbiQod2luZG93KS5sb2FkKEdhbWVNYW5hZ2VyLmluaXQpO1xuc2V0VGltZW91dChwYXNzdGltZSwgMzAwMCk7XG4iXX0=
