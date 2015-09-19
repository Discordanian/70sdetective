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
        retval = "<em>At the " + loc + " level you are " + retval + "</em>";
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
            var x = Band.incDate();
            if ((x % 30) == 0) {
                showPopularity();
            }
            if ((x % 3) == 0) {
                Grapevine.otherSong();
                Grapevine.refresh();
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
        "Cory Doctorow",
        "Kurt (not that one the other one)",
        "My Underwear",
        "Internal Issues",
        "Cat Video Club",
        "Navi is my Spirit Guide",
        "Blue Chicken Nugget",
        "Yarn Pornography",
        "6 cylinder Makeup",
        "The Burlap Peanut",
        "Tequila Mockingbird",
        "Anarkey in the Library",
        "Brother Tshober",
        "Frumpy Breast And The Shack",
        "Chief President",
        "Twin Stranger",
        "Doubt Of Paradise",
        "Massive Logistic",
        "Republican Furry",
        "Galaxy Of The Intimate Walk",
        "Delectable Ignite",
        "Vertigo Of The Object",
        "Caution Armada",
        "Styro Absence",
        "After Bush",
        "Yukon Success",
        "Butt-ugly Paper",
        "Entitled Odds Of The Sling Lick",
        "Pink Mist",
        "Butt Seriously",
        "The Disra Misty Band",
        "Dixie & the Ninjas",
        "Yet Another Mass Extinction Event",
        "The Power Chord Hotshots",
        "Donner Dinner Party",
        "Teen Angst",
        "Aggressive Pacifism",
        "My Chemical Bromance",
        "The Nickleback Tribute Band",
        "Hamburger Evangelism"
    ];

    var songtitles = [
        "This is a Tune",
        "Yodels make me happy",
        "It's a will roll dammit",
        "I like popcorn",
        "My Electrician Made me Sad",
        "RNG in Hearthstone FTW",
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
        "Richard Stallman was my babysitter",
        "Looking to Train?",
        "You do not have the proper stone",
        "I am not ready",
        "Buggy video games.  What's up with that?",
        "Is Call of Duty still a thing?",
        "I have a million balls and I am the size of a peanut",
        "Because you know the baby",
        "Courtship Is Everything",
        "Can't Stop The Firecracker",
        "Holy Democracy",
        "Friends With Synchronisation",
        "Raw Stash",
        "Supernatural Time",
        "Don't Stop The Devil",
        "Helluva Shopping",
        "The All American Girl",
        "Classic Guitar",
        "Outrageous Axe",
        "Uncontrollable Criminal",
        "Hotshot Rainbow",
        "Vladimir Putin is a God",
        "Crying Japanese Politician"
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9CYW5kLmpzIiwiYXBwL0JhbmRQcm9tcHQuanMiLCJhcHAvRHJ1Z1Byb21wdC5qcyIsImFwcC9HYW1lTWFuYWdlci5qcyIsImFwcC9HcmFwZXZpbmUuanMiLCJhcHAvV0dPLmpzIiwiYXBwL3JhbmRvbS5qcyIsImFwcC9yb3QxMy5qcyIsImFwcC9zdG9uZXN1bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgdmFyIGJhbmRuYW1lID0gXCJBYmp1cmVyIE5vd2hlcmVcIjtcbiAgICB2YXIgbWFzdGVyaWQgPSAwOyAvLyBKdXN0IGEgdW5pcXVlIGtleVxuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIC8vIHBlcnNvbmFsXG4gICAgdmFyIGhlYWx0aCA9IDA7XG4gICAgdmFyIGNyZWF0aXZpdHkgPSAwO1xuICAgIHZhciBoYXBwaW5lc3MgPSAwO1xuICAgIHZhciBhbGVydG5lc3MgPSAwO1xuXG4gICAgLy8gdGltZVxuICAgIHZhciBkYXljb3VudCA9IDE7XG4gICAgdmFyIGRvdyA9IFtcbiAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgXCJTYXR1cmRheVwiXG4gICAgXTtcblxuICAgIC8vIHBvcHVsYXJpdHlcbiAgICB2YXIgbG9jYWxwID0gMDtcbiAgICB2YXIgbmF0aW9uYWxwID0gMDtcbiAgICB2YXIgZ2xvYmFscCA9IDA7XG5cbiAgICB2YXIgZHJ1Z3MgPSB7XG4gICAgICAgIFwibHNkXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogMyxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMyxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiA1XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYWxjb2hvbFwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiA1LFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogNSxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAxMFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hcmlqdWFubmFcIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMyxcbiAgICAgICAgICAgICAgICBcImhlYWx0aFwiOiAzLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAzLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDcsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJoZXJpb25cIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogOSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMCxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAxMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdmFyIHNpbmdsZXMgPSBbXTsgLy8gTGluZSBpdGVtcyBpbiBcbiAgICB2YXIgdG91cnMgPSBbXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBhZGRTaW5nbGUobmFtZSkge1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2lkJzogbWFzdGVyaWQrKyxcbiAgICAgICAgICAgICduYW1lJzogbmFtZSxcbiAgICAgICAgICAgICdscG9wJzogMCxcbiAgICAgICAgICAgICducG9wJzogMCxcbiAgICAgICAgICAgICdncG9wJzogMFxuICAgICAgICB9O1xuICAgICAgICBzaW5nbGVzLnB1c2gocmV0dmFsKTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBsb2NhbHAgPSBuYXRpb25hbHAgPSBnbG9iYWxwID0gMDtcbiAgICAgICAgaGFwcGluZXNzID0gYWxlcnRuZXNzID0gY3JlYXRpdml0eSA9IDUwO1xuICAgICAgICBoZWFsdGggPSA4MDtcbiAgICAgICAgZGF5Y291bnQgPSAxO1xuICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQZXJzb25hbCgpIHtcbiAgICAgICAgJChcIiNwbGF5ZXJfaGVhbHRoXCIpLmh0bWwoaGVhbHRoKTtcbiAgICAgICAgJChcIiNwbGF5ZXJfY3JlYXRpdml0eVwiKS5odG1sKGNyZWF0aXZpdHkpO1xuICAgICAgICAkKFwiI3BsYXllcl9oYXBwaW5lc3NcIikuaHRtbChoYXBwaW5lc3MpO1xuICAgICAgICAkKFwiI3BsYXllcl9hbGVydG5lc3NcIikuaHRtbChhbGVydG5lc3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQb3B1bGFyaXR5KCkge1xuICAgICAgICAkKFwiI2xvY2FsX3BvcFwiKS5odG1sKGxvY2FscCk7XG4gICAgICAgICQoXCIjbmF0aW9uYWxfcG9wXCIpLmh0bWwobmF0aW9uYWxwKTtcbiAgICAgICAgJChcIiNnbG9iYWxfcG9wXCIpLmh0bWwoZ2xvYmFscCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaE5hbWUoKSB7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKHJvdDEzKGJhbmRuYW1lKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmxhdm9yUG9wKHBvcCwgbG9jKSB7XG4gICAgICAgIHZhciByZXR2YWwgPSBcIlwiO1xuICAgICAgICBpZiAocG9wID4gODUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwid29yc2hpcHBlZCBhcyB0aGUgcm9jayBkaWV0eSB0aGF0IHlvdSBhcmUhXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDg2KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImtub3duIHRvIGV2ZW4gY2FzdWFsIGZhbnNcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgNjUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwiZ2V0dGluZyB5b3VyIG11c2ljIHBpcmF0ZWQgYnkgc2NvcmVzIG9mIHlvdXRoXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDQ1KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImdldHRpbmcgc29tZSBhaXItcGxheSBvbiByYWRpbyBzdGF0aW9ucy5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgMjUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwia25vd24gdG8gYSBmZXcgZGllLWhhcmQgZmFucy5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgMTYpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwidmlydHVhbGx5IHVua25vd24uXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dmFsID0gXCI8ZW0+QXQgdGhlIFwiICsgbG9jICsgXCIgbGV2ZWwgeW91IGFyZSBcIiArIHJldHZhbCArIFwiPC9lbT5cIjtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcblxuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXROYW1lOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGlmIChzdHIudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgYmFuZG5hbWUgPSBzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9LFxuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgcmVmcmVzaFBvcHVsYXJpdHkoKTtcbiAgICAgICAgICAgIHJlZnJlc2hOYW1lKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRydWdvZmZlcjogZnVuY3Rpb24oZHJ1Z25hbWUsIHRha2VuKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGRydWduYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxzZFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5sc2QuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5sc2QuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmxzZC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmxzZC5hZGRpY3Rpb24gKz0gZHJ1Z3MubHNkLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmxzZC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5sc2QuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLmxzZC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MubHNkLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MubHNkLmFkZGljdGlvbiAtPSAoZHJ1Z3MubHNkLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhbGNvaG9sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmFsY29ob2wuYWRkaWN0aW9uICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5hZGRpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MuYWxjb2hvbC5hZGRpY3Rpb24gLT0gKGRydWdzLmFsY29ob2wuZmFjdG9ycy5hZGRpY3Rpb24gLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hcmlqdWFubmFcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MubWFyaWp1YW5uYS5hZGRpY3Rpb24gKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmFkZGljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzIC09IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5tYXJpanVhbm5hLmFkZGljdGlvbiAtPSAoZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmFkZGljdGlvbiAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaGVyaW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MuaGVyaW9uLmFkZGljdGlvbiArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5hZGRpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzIC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5oZXJpb24uYWRkaWN0aW9uIC09IChkcnVncy5oZXJpb24uZmFjdG9ycy5hZGRpY3Rpb24gLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIGRydWcsdGFrZW4gOiBcIiArIGRydWduYW1lICsgXCIgLCBcIiArIHRha2VuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICByZXN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERydWdzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkcnVncztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UG9wOiBmdW5jdGlvbihwb3BUeXBlKSB7XG4gICAgICAgICAgICB2YXIgcmV0dmFsID0gJ05vIG9uZSBjYXJlcyBhYm91dCB5b3UuJztcbiAgICAgICAgICAgIGlmIChwb3BUeXBlID09PSBcImxvY2FsXCIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSBmbGF2b3JQb3AobG9jYWxwLCBwb3BUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwb3BUeXBlID09PSBcIm5hdGlvbmFsXCIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSBmbGF2b3JQb3AobmF0aW9uYWxwLCBwb3BUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwb3BUeXBlID09PSBcImdsb2JhbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gZmxhdm9yUG9wKGdsb2JhbHAsIHBvcFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgaW5jRGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkYXljb3VudCsrO1xuICAgICAgICAgICAgdmFyIHdrID0gTWF0aC5mbG9vcigoZGF5Y291bnQgLyA3KSArIDEpICUgNTI7XG4gICAgICAgICAgICB2YXIgeXIgPSBNYXRoLmZsb29yKChkYXljb3VudCAvIDM2NSkgKyAxKTtcbiAgICAgICAgICAgICQoXCIjdGltZV9kb3dcIikuaHRtbChkb3dbZGF5Y291bnQgJSA3XSk7XG4gICAgICAgICAgICAkKFwiI3RpbWVfeWVhclwiKS5odG1sKHlyKTtcbiAgICAgICAgICAgICQoXCIjdGltZV93ZWVrXCIpLmh0bWwod2spO1xuICAgICAgICAgICAgcmV0dXJuIGRheWNvdW50O1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlcXVpcmVzIEJvb3Rib3guanNcbiAgICBib290Ym94LmFkZExvY2FsZShcInJvY2tcIiwge1xuICAgICAgICBPSzogJ1JvY2snLFxuICAgICAgICBDQU5DRUw6ICdCdWdnZXIgT2ZmJyxcbiAgICAgICAgQ09ORklSTTogJ0FscmlnaHR5IFRoZW4nXG4gICAgfSk7XG4gICAgYm9vdGJveC5zZXRMb2NhbGUoXCJyb2NrXCIpO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG5cbiAgICBmdW5jdGlvbiBnZXROYW1lKG5hbWVGbikge1xuICAgICAgICB2YXIgbXNnID0gXCJOYW1lIHlvdXIgYmFuZCA6IFwiO1xuXG5cbiAgICAgICAgYm9vdGJveC5wcm9tcHQoe1xuICAgICAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICAgICAgdGl0bGU6IFwiUm9jayBuIFJvbGwgRmFtZSBBd2FpdCFcIixcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpemU6ICdtZWRpdW0nLFxuICAgICAgICAgICAgY2FsbGJhY2s6IG5hbWVGblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcnVnUmFuZ2Uobikge1xuICAgICAgICB2YXIgcmV0U3RyID0gJyc7XG4gICAgICAgIGlmIChuID4gODUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtZGFuZ2VyXCI+WW91IHdpbGwgZ2xhZGx5IHNoaXYgeW91ciBvd24gbW90aGVyIGZvciBzb21lICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCA4NSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC13YXJuaW5nXCI+WW91IGFyZSBhdCBvbmUgd2l0aCAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgNzUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtaW5mb1wiPkZyaWVuZHMgYXNzdW1lIHlvdVxcJ2xsIGdsYWRseSB0YWtlIG1vcmUgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDU1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LWluZm9cIj5Zb3UgaGF2ZSBhIHJlcHV0YXRpb24gb24gaW5kdWxnaW5nIG9uICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCAzNSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1zdWNjZXNzXCI+WW91IGFyZSB2ZXJ5IGtlZW4gb24gJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDI1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LXN1Y2Nlc3NcIj5Zb3Uga2luZCBvZiBsaWtlICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCAxNSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1tdXRlZFwiPllvdSBkbyBub3QgaGF2ZSBtdWNoIG9mIGFuIG9waW5pb24gb24gJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0U3RyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlEcnVnUHJlZmVyZW5jZXMoZCkge1xuICAgICAgICB2YXIgbXNnID0gJyc7XG4gICAgICAgIG1zZyArPSBkcnVnUmFuZ2UoZC5hbGNvaG9sLmFkZGljdGlvbikgKyBcIjx1PjxiPmFsY29ob2w8L2I+PC91Pi48L3A+XCI7XG4gICAgICAgIG1zZyArPSBkcnVnUmFuZ2UoZC5tYXJpanVhbm5hLmFkZGljdGlvbikgKyBcIjx1PjxiPm1hcmlqdWFubmE8L2I+PC91Pi48L3A+XCI7XG4gICAgICAgIG1zZyArPSBkcnVnUmFuZ2UoZC5sc2QuYWRkaWN0aW9uKSArIFwiPHU+PGI+bHNkPC9iPjwvdT4uPC9wPlwiO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQuaGVyaW9uLmFkZGljdGlvbikgKyBcIjx1PjxiPmhlcmlvbjwvYj48L3U+LjwvcD5cIjtcblxuICAgICAgICBib290Ym94LmFsZXJ0KHtcbiAgICAgICAgICAgIHNpemU6ICdsYXJnZScsXG4gICAgICAgICAgICBtZXNzYWdlOiBtc2dcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICBnZXROYW1lKGZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG91cjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZHJ1Z1ByZWZlcmVuY2VzOiBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBkaXNwbGF5RHJ1Z1ByZWZlcmVuY2VzKGQpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXF1aXJlcyBCb290Ym94LmpzXG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG4gICAgdmFyIGRydWdpZCA9IDA7XG4gICAgdmFyIHB1c2hlcnMgPSBbXG4gICAgICAgICdiYXNzaXN0JyxcbiAgICAgICAgJ2RydW1tZXInLFxuICAgICAgICAnZ3VpdGFyaXN0JyxcbiAgICAgICAgJ2ZsYXQgbWF0ZScsXG4gICAgICAgICdtb3RoZXInLFxuICAgICAgICAnbGFuZGxvcmQnLFxuICAgICAgICAnaGFpciBkcmVzc2VyJyxcbiAgICAgICAgJ3BpenphIGRlbGl2ZXJ5IGRyaXZlcicsXG4gICAgICAgICdiYXJ0ZW5kZXInLFxuICAgICAgICAnZnJpZW5kIHRoZSBhc3BpcmluZyBcXFwiYWN0b3JcXFwiJ1xuICAgIF07XG4gICAgdmFyIGxvY2F0aW9ucyA9IFtcbiAgICAgICAgJ3RoZSBzdXBlcm1hcmtldCcsXG4gICAgICAgICd0aGUgcmF2ZScsXG4gICAgICAgICd0aGUgcm9tYW5jZSBzZWN0aW9uIGF0IHRoZSBsb2NhbCBsaWJyYXJ5JyxcbiAgICAgICAgJ3RoZSBhbGxleSBiZWhpbmQgdGhhdCB0YWNvIGJlbGwgeW91IHRlbGwgZXZlcnlvbmUgeW91XFwnZCBuZXZlciBlYXQgYXQnLFxuICAgICAgICAndGhlIGJvd2xpbmcgYWxsZXkgeW91IGdvIHRvIGlyb25pY2FsbHknLFxuICAgICAgICAndGhlIHRyYWluIHN0YXRpb24nLFxuICAgICAgICAndGhlIHJlc3QgYXJlYSB3aGVyZSB0aGV5IGNhdWdodCB0aGF0IG9uZSBkdWRlIGRvaW5nIHRoYXQgb25lIHRoaW5nJyxcbiAgICAgICAgJ3RoZSBiYXInLFxuICAgICAgICAndGhlIHBhcnR5JyxcbiAgICAgICAgJ3RoZSBCYXIgTWl0enZhaCBmb3IgdGhhdCBvbmUga2lkIG9mIHlvdXIgY291c2luXFwncyB0aGF0IHlvdSBvbmx5IHNlZScsXG4gICAgICAgICd0aGUgd2VkZGluZyBvZiB5b3VyIEV4J1xuICAgIF07XG5cblxuXG4gICAgZnVuY3Rpb24gbWFrZU9mZmVyKGRydWcsIGltcEluZCwgZHJ1Z0ZuKSB7XG4gICAgICAgIHZhciBtc2cgPSBcIllvdXIgXCIgKyBwdXNoZXJzW2RydWdpZCsrICUgcHVzaGVycy5sZW5ndGhdICsgXCIgb2ZmZXJzIHlvdSBzb21lIFwiICsgZHJ1ZyArIFwiIGF0IFwiICsgbG9jYXRpb25zW2RydWdpZCAlIGxvY2F0aW9ucy5sZW5ndGhdICsgXCIuXCI7XG4gICAgICAgIGlmIChpbXBJbmQpIHtcbiAgICAgICAgICAgIG1zZyA9IHJvdDEzKG1zZyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciB0YWtlaXQgPSB7XG4gICAgICAgICAgICBsYWJlbDogXCJZZXMgUGxlYXNlXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuLXN1Y2Nlc3NcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkcnVnRm4oZHJ1ZywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBkZW55aXQgPSB7XG4gICAgICAgICAgICBsYWJlbDogXCJHZXQgQmVudFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0bi1kYW5nZXJcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkcnVnRm4oZHJ1ZywgaW1wSW5kKTsgLy8gSWYgaW1wYWlyZWQsIHRoaXMgaXMgdHJ1ZSB0b28uICAgb29wcyEgOilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICAgICAgICB0aXRsZTogXCJEcnVncyFcIixcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpemU6ICdzbWFsbCcsXG4gICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpdmU6IHRha2VpdCxcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZTogZGVueWl0XG4gICAgICAgICAgICB9IC8vIGJ1dHRvbnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZmVyOiBmdW5jdGlvbihkcnVnLCBpbXAsIGRydWdGbikge1xuICAgICAgICAgICAgbWFrZU9mZmVyKGRydWcsIGltcCwgZHJ1Z0ZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcHVzaGVycy5zaHVmZmxlKCk7XG4gICAgICAgICAgICBsb2NhdGlvbnMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgQmFuZCA9IHJlcXVpcmUoJy4vQmFuZC5qcycpKCk7XG4gICAgdmFyIFdHTyA9IHJlcXVpcmUoJy4vV0dPLmpzJykoKTtcbiAgICB2YXIgR3JhcGV2aW5lID0gcmVxdWlyZSgnLi9HcmFwZXZpbmUuanMnKSgpO1xuICAgIHZhciBEcnVnUHJvbXB0ID0gcmVxdWlyZSgnLi9EcnVnUHJvbXB0LmpzJykoKTtcbiAgICB2YXIgQmFuZFByb21wdCA9IHJlcXVpcmUoJy4vQmFuZFByb21wdC5qcycpKCk7XG5cbiAgICB2YXIgaW1wYWlybCA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgV0dPLmltcGFpcighIWIpO1xuICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICBHcmFwZXZpbmUuaW1wYWlyKCEhYik7XG4gICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgIEJhbmQuaW1wYWlyKCEhYik7XG4gICAgICAgIEJhbmQucmVmcmVzaCgpO1xuICAgICAgICByZXR1cm4gaW1wYWlyZWQ7XG4gICAgfTtcblxuICAgIHZhciByZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEJhbmQuY2xlYXIoKTtcbiAgICAgICAgV0dPLmNsZWFyKCk7XG4gICAgICAgIEdyYXBldmluZS5jbGVhcigpO1xuXG4gICAgICAgIC8qIE9ubHkgYmluZCB0aGVzZSBldmVudHMgb24gZmlyc3QgcGFzcyAqL1xuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAkKFwiI3RpdGxlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmQuaW5jRGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2Fib3V0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmQuZHJ1Z29mZmVyKFwiaGVyaW9uXCIsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI25ld19nYW1lXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICBCYW5kUHJvbXB0Lm5hbWUoQmFuZC5zZXROYW1lKTtcbiAgICAgICAgICAgICAgICAvLyByZXN0YXJ0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjdG91cnNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLm90aGVyU29uZygpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjY2hhcnRzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5hZGRJdGVtKFwiWW91IGFyZSBvbiB0aGUgY2hhcnRzXCIpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjaG93X3RvX3BsYXlcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1wYWlyZWQgPSAhaW1wYWlyZWQ7XG4gICAgICAgICAgICAgICAgaW1wYWlybChpbXBhaXJlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjcmVsZWFzZXNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgV0dPLmFkZEl0ZW0oXCJSZWxlYXNlcyBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2RydWdzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmRQcm9tcHQuZHJ1Z1ByZWZlcmVuY2VzKEJhbmQuZ2V0RHJ1Z3MoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzaG93UG9wdWxhcml0eSgpIHtcbiAgICAgICAgR3JhcGV2aW5lLmFkZEl0ZW0oQmFuZC5nZXRQb3AoXCJsb2NhbFwiKSk7XG4gICAgICAgIEdyYXBldmluZS5hZGRJdGVtKEJhbmQuZ2V0UG9wKFwibmF0aW9uYWxcIikpO1xuICAgICAgICBHcmFwZXZpbmUuYWRkSXRlbShCYW5kLmdldFBvcChcImdsb2JhbFwiKSk7XG4gICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBpbmNEYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB4ID0gQmFuZC5pbmNEYXRlKCk7XG4gICAgICAgICAgICBpZiAoKHggJSAzMCkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHNob3dQb3B1bGFyaXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHggJSAzKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLm90aGVyU29uZygpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdoYXRldmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN0YXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgcmV0dXJuIGltcGFpcmwoYik7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgbWF4aXRlbXMgPSAxMjtcbiAgICB2YXIgbWFzdGVyY291bnQgPSAwO1xuICAgIHZhciBpdGVtcyA9IFtdOyAvLyBMaW5lIGl0ZW1zIGluIFxuICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS5qcycpO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIHZhciBjbGFzc3R5cGVzID0gW1xuICAgICAgICBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LWRhbmdlclwiLFxuICAgICAgICBcInRleHQtc3VjY2Vzc1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCJcbiAgICBdO1xuXG5cbiAgICB2YXIgYXJ0aXN0cyA9IFtcbiAgICAgICAgXCJUaGUgQmluZyBCYW5nc1wiLFxuICAgICAgICBcIk1vZGVybiBTaG9lXCIsXG4gICAgICAgIFwiVGVhbSBHb3Jkb25cIixcbiAgICAgICAgXCJDb3J5IERvY3Rvcm93XCIsXG4gICAgICAgIFwiS3VydCAobm90IHRoYXQgb25lIHRoZSBvdGhlciBvbmUpXCIsXG4gICAgICAgIFwiTXkgVW5kZXJ3ZWFyXCIsXG4gICAgICAgIFwiSW50ZXJuYWwgSXNzdWVzXCIsXG4gICAgICAgIFwiQ2F0IFZpZGVvIENsdWJcIixcbiAgICAgICAgXCJOYXZpIGlzIG15IFNwaXJpdCBHdWlkZVwiLFxuICAgICAgICBcIkJsdWUgQ2hpY2tlbiBOdWdnZXRcIixcbiAgICAgICAgXCJZYXJuIFBvcm5vZ3JhcGh5XCIsXG4gICAgICAgIFwiNiBjeWxpbmRlciBNYWtldXBcIixcbiAgICAgICAgXCJUaGUgQnVybGFwIFBlYW51dFwiLFxuICAgICAgICBcIlRlcXVpbGEgTW9ja2luZ2JpcmRcIixcbiAgICAgICAgXCJBbmFya2V5IGluIHRoZSBMaWJyYXJ5XCIsXG4gICAgICAgIFwiQnJvdGhlciBUc2hvYmVyXCIsXG4gICAgICAgIFwiRnJ1bXB5IEJyZWFzdCBBbmQgVGhlIFNoYWNrXCIsXG4gICAgICAgIFwiQ2hpZWYgUHJlc2lkZW50XCIsXG4gICAgICAgIFwiVHdpbiBTdHJhbmdlclwiLFxuICAgICAgICBcIkRvdWJ0IE9mIFBhcmFkaXNlXCIsXG4gICAgICAgIFwiTWFzc2l2ZSBMb2dpc3RpY1wiLFxuICAgICAgICBcIlJlcHVibGljYW4gRnVycnlcIixcbiAgICAgICAgXCJHYWxheHkgT2YgVGhlIEludGltYXRlIFdhbGtcIixcbiAgICAgICAgXCJEZWxlY3RhYmxlIElnbml0ZVwiLFxuICAgICAgICBcIlZlcnRpZ28gT2YgVGhlIE9iamVjdFwiLFxuICAgICAgICBcIkNhdXRpb24gQXJtYWRhXCIsXG4gICAgICAgIFwiU3R5cm8gQWJzZW5jZVwiLFxuICAgICAgICBcIkFmdGVyIEJ1c2hcIixcbiAgICAgICAgXCJZdWtvbiBTdWNjZXNzXCIsXG4gICAgICAgIFwiQnV0dC11Z2x5IFBhcGVyXCIsXG4gICAgICAgIFwiRW50aXRsZWQgT2RkcyBPZiBUaGUgU2xpbmcgTGlja1wiLFxuICAgICAgICBcIlBpbmsgTWlzdFwiLFxuICAgICAgICBcIkJ1dHQgU2VyaW91c2x5XCIsXG4gICAgICAgIFwiVGhlIERpc3JhIE1pc3R5IEJhbmRcIixcbiAgICAgICAgXCJEaXhpZSAmIHRoZSBOaW5qYXNcIixcbiAgICAgICAgXCJZZXQgQW5vdGhlciBNYXNzIEV4dGluY3Rpb24gRXZlbnRcIixcbiAgICAgICAgXCJUaGUgUG93ZXIgQ2hvcmQgSG90c2hvdHNcIixcbiAgICAgICAgXCJEb25uZXIgRGlubmVyIFBhcnR5XCIsXG4gICAgICAgIFwiVGVlbiBBbmdzdFwiLFxuICAgICAgICBcIkFnZ3Jlc3NpdmUgUGFjaWZpc21cIixcbiAgICAgICAgXCJNeSBDaGVtaWNhbCBCcm9tYW5jZVwiLFxuICAgICAgICBcIlRoZSBOaWNrbGViYWNrIFRyaWJ1dGUgQmFuZFwiLFxuICAgICAgICBcIkhhbWJ1cmdlciBFdmFuZ2VsaXNtXCJcbiAgICBdO1xuXG4gICAgdmFyIHNvbmd0aXRsZXMgPSBbXG4gICAgICAgIFwiVGhpcyBpcyBhIFR1bmVcIixcbiAgICAgICAgXCJZb2RlbHMgbWFrZSBtZSBoYXBweVwiLFxuICAgICAgICBcIkl0J3MgYSB3aWxsIHJvbGwgZGFtbWl0XCIsXG4gICAgICAgIFwiSSBsaWtlIHBvcGNvcm5cIixcbiAgICAgICAgXCJNeSBFbGVjdHJpY2lhbiBNYWRlIG1lIFNhZFwiLFxuICAgICAgICBcIlJORyBpbiBIZWFydGhzdG9uZSBGVFdcIixcbiAgICAgICAgXCJNeSB0aGlyZCBiZWxseSBidXR0b25cIixcbiAgICAgICAgXCJXYXRjaGluZyBZb3VUdWJlIGF0IFdvcmtcIixcbiAgICAgICAgXCJUaGUgVHJpZm9yY2UgaXMgcG9pbnR5XCIsXG4gICAgICAgIFwiVGhleSBncm93IGZyb20gc3BlbGxzXCIsXG4gICAgICAgIFwiSSBwbGF5ZWQgYSBtYWdlIGFuZCBJIGxpa2VkIGl0XCIsXG4gICAgICAgIFwiSSBzdGlsbCBwbGF5IG9sZCBnYW1lc1wiLFxuICAgICAgICBcIkphdmEgYWludCBqYXZhc2NyaXB0XCIsXG4gICAgICAgIFwiNTAgcmVhc29ucyB3aHkgSmF2YSBpcyBhIGZhZFwiLFxuICAgICAgICBcIlRoZSBiZXN0IHBhcnQgb2YgbWUgaXMgbGVmdCBoYW5kZWRcIixcbiAgICAgICAgXCJJdCB0YWtlcyBhIGZldyB5ZWFycyB0byBsaXN0ZW4gdG8gbXkgcGxheWxpc3RcIixcbiAgICAgICAgXCJUYW5nZW50aWFsIENvbGRcIixcbiAgICAgICAgXCJUaHJvd2luZyBhIHF1YXJ0ZXIgYW5kIHdpc2hpbmcgeW91IHdlbGxcIixcbiAgICAgICAgXCJNeSBnb29nbGUgY2FsZW5kYXIgaXMgcmlkaWN1bG91c1wiLFxuICAgICAgICBcIlJlbWVtYmVyIHdoZW4gcGVvcGxlIGxpbmVkIHVwIHRvIGJ1eSBXaW5kb3dzIDk1PyAgQ3JhenkhXCIsXG4gICAgICAgIFwiUmljaGFyZCBTdGFsbG1hbiB3YXMgbXkgYmFieXNpdHRlclwiLFxuICAgICAgICBcIkxvb2tpbmcgdG8gVHJhaW4/XCIsXG4gICAgICAgIFwiWW91IGRvIG5vdCBoYXZlIHRoZSBwcm9wZXIgc3RvbmVcIixcbiAgICAgICAgXCJJIGFtIG5vdCByZWFkeVwiLFxuICAgICAgICBcIkJ1Z2d5IHZpZGVvIGdhbWVzLiAgV2hhdCdzIHVwIHdpdGggdGhhdD9cIixcbiAgICAgICAgXCJJcyBDYWxsIG9mIER1dHkgc3RpbGwgYSB0aGluZz9cIixcbiAgICAgICAgXCJJIGhhdmUgYSBtaWxsaW9uIGJhbGxzIGFuZCBJIGFtIHRoZSBzaXplIG9mIGEgcGVhbnV0XCIsXG4gICAgICAgIFwiQmVjYXVzZSB5b3Uga25vdyB0aGUgYmFieVwiLFxuICAgICAgICBcIkNvdXJ0c2hpcCBJcyBFdmVyeXRoaW5nXCIsXG4gICAgICAgIFwiQ2FuJ3QgU3RvcCBUaGUgRmlyZWNyYWNrZXJcIixcbiAgICAgICAgXCJIb2x5IERlbW9jcmFjeVwiLFxuICAgICAgICBcIkZyaWVuZHMgV2l0aCBTeW5jaHJvbmlzYXRpb25cIixcbiAgICAgICAgXCJSYXcgU3Rhc2hcIixcbiAgICAgICAgXCJTdXBlcm5hdHVyYWwgVGltZVwiLFxuICAgICAgICBcIkRvbid0IFN0b3AgVGhlIERldmlsXCIsXG4gICAgICAgIFwiSGVsbHV2YSBTaG9wcGluZ1wiLFxuICAgICAgICBcIlRoZSBBbGwgQW1lcmljYW4gR2lybFwiLFxuICAgICAgICBcIkNsYXNzaWMgR3VpdGFyXCIsXG4gICAgICAgIFwiT3V0cmFnZW91cyBBeGVcIixcbiAgICAgICAgXCJVbmNvbnRyb2xsYWJsZSBDcmltaW5hbFwiLFxuICAgICAgICBcIkhvdHNob3QgUmFpbmJvd1wiLFxuICAgICAgICBcIlZsYWRpbWlyIFB1dGluIGlzIGEgR29kXCIsXG4gICAgICAgIFwiQ3J5aW5nIEphcGFuZXNlIFBvbGl0aWNpYW5cIlxuICAgIF07XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFNvbWUgcHJpdmF0ZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgJ3RydWUnIGlmIHRoZSBjYXNlIHdhcyBub3Qgc29sdmFibGUgXG4gICAgZnVuY3Rpb24gZm9ybWF0TGluZShvYmopIHtcbiAgICAgICAgdmFyIHJldHZhbDtcbiAgICAgICAgaWYgKGltcGFpcmVkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHJhbmRvbSg0KSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCIgbGVhZFxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48bWFyaz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L21hcms+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48ZGVsPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvZGVsPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PHM+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9zPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIG9iai5zdHIgKyBcIjwvcD5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0oc3RyKSB7XG4gICAgICAgIG1hc3RlcmNvdW50Kys7XG4gICAgICAgIHZhciBjdCA9IGNsYXNzdHlwZXNbbWFzdGVyY291bnQgJSBjbGFzc3R5cGVzLmxlbmd0aF07XG4gICAgICAgIHZhciByZXR2YWwgPSB7XG4gICAgICAgICAgICAnY2xhc3N0eXBlJzogY3QsXG4gICAgICAgICAgICAnc3RyJzogc3RyXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIG90aGVyU29uZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYXJ0aXN0X2luZGV4ID0gbWFzdGVyY291bnQgJSBhcnRpc3RzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBzb25nX2luZGV4ID0gbWFzdGVyY291bnQgJSBzb25ndGl0bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciByZWxlYXNlX25vdGljZSA9IFwiTmV3IHNpbmdsZSByZWxlYXNlZCBieSAnXCIgKyBhcnRpc3RzW2FydGlzdF9pbmRleF0gKyBcIicgY2FsbGVkICdcIiArIHNvbmd0aXRsZXNbc29uZ19pbmRleF0gKyBcIidcIjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZEl0ZW0ocmVsZWFzZV9ub3RpY2UpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goY3JlYXRlSXRlbShzdHIpKTtcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiBtYXhpdGVtcykge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaHRtbHN0ciA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaHRtbHN0ciA9IGh0bWxzdHIuY29uY2F0KGZvcm1hdExpbmUoaXRlbXNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjc3NnbG9iYWxcIikuaHRtbChodG1sc3RyKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgYXJ0aXN0cy5zaHVmZmxlKCk7XG4gICAgICAgICAgICBzb25ndGl0bGVzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgbWF4aXRlbXMgPSAxMjtcbiAgICB2YXIgbWFzdGVyY291bnQgPSAwO1xuICAgIHZhciBpdGVtcyA9IFtdOyAvLyBMaW5lIGl0ZW1zIGluIFxuICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS5qcycpO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIHZhciBjbGFzc3R5cGVzID0gW1xuICAgICAgICBcInRleHQtbXV0ZWRcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LWRhbmdlclwiLFxuICAgICAgICBcInRleHQtc3VjY2Vzc1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCJcbiAgICBdO1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tKDQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcbiAgICAgICAgbWFzdGVyY291bnQrKztcbiAgICAgICAgdmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdjbGFzc3R5cGUnOiBjdCxcbiAgICAgICAgICAgICdzdHInOiBzdHJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBodG1sc3RyID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNzc2xvY2FsXCIpLmh0bWwoaHRtbHN0cik7XG4gICAgICAgICAgICByZXR1cm4gaHRtbHN0cjtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3Rcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0YXJnZXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL1tBLVphLXpdL2csIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiLmNoYXJBdChcbiAgICAgICAgICAgIFwiTk9QUVJTVFVWV1hZWkFCQ0RFRkdISUpLTE1ub3BxcnN0dXZ3eHl6YWJjZGVmZ2hpamtsbVwiLmluZGV4T2YoYylcbiAgICAgICAgKTtcbiAgICB9KTtcbn07XG4iLCIvLyBzdG9uZXN1bi5qc1xudmFyIEdhbWVNYW5hZ2VyID0gcmVxdWlyZSgnLi9HYW1lTWFuYWdlci5qcycpKCk7XG5cbnZhciBwYXNzdGltZSA9IGZ1bmN0aW9uKCkge1xuICAgIEdhbWVNYW5hZ2VyLmluY0RhdGUoKTtcbiAgICBzZXRUaW1lb3V0KHBhc3N0aW1lLCAzMDAwKTtcbn1cblxuLy8gQWRkIHNodWZmbGUgZnVuY3Rpb24gdG8gYWxsIGFycmF5IG9iamVjdHNcbkFycmF5LnByb3RvdHlwZS5zaHVmZmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgcm5kLCB0bXAsIGkgPSB0aGlzLmxlbmd0aDsgaTsgcm5kID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIGkpLCB0bXAgPSB0aGlzWy0taV0sIHRoaXNbaV0gPSB0aGlzW3JuZF0sIHRoaXNbcm5kXSA9IHRtcCk7XG59O1xuXG5cbi8qIERlZmluZSBhICdjb25zb2xlJyBvYmplY3QgZm9yIElFICovXG5pZiAodHlwZW9mIGNvbnNvbGUgIT09ICdvYmplY3QnKSB7XG4gICAgY29uc29sZSA9IHtcbiAgICAgICAgbG9nOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkZWJ1ZzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgaW5mbzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgd2FybjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGFzc2VydDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRpcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZGlyeG1sOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0cmFjZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZ3JvdXA6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBncm91cEVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgdGltZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgdGltZUVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgcHJvZmlsZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgcHJvZmlsZUVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgY291bnQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGV4Y2VwdGlvbjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgdGFibGU6IGZ1bmN0aW9uKCkge31cbiAgICB9O1xufVxuXG4kKHdpbmRvdykubG9hZChHYW1lTWFuYWdlci5pbml0KTtcbnNldFRpbWVvdXQocGFzc3RpbWUsIDMwMDApO1xuIl19
