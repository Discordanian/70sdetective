(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
    // Requires Bootbox.js
    bootbox.addLocale("rock", {
        OK: 'Rock',
        CANCEL: 'Bugger Off',
        CONFIRM: 'Alrighty Then'
    });
    bootbox.setLocale("rock");

    // Private vars
    function displaySplash() {
        var about = '<p>This game is based heavily on an old DOS computer game called "Rock Star".</p>';
        about += '<p>I had so much fun playing with the game in the early 90s that I decided that I didn\'t want to be without it any more.</p>';
        about += '<p>Thanks to the folks in chizat for the encouragement and the crowdsourcing of artists and track titles.</p>';
        about += '<p>My name is <a href="http://tangentialcold.com">Kurt Schwind</a> and I approve this message.</p>';


        bootbox.alert({
            size: 'large',
            title: 'About',
            message: about
        });
    }

    function displayHowToPlay() {
        var msg = 'You are a budding Rock n Roll star!  Navigate your life choices and see if fame and fortune await!';

        bootbox.alert({
            size: 'large',
            title: 'How To Play',
            message: msg
        });
    }


    // Return public interface
    return {
        showSplash: function(fn) {
            displaySplash();
        },
        howToPlay: function() {
            displayHowToPlay();
        }
    }; // end return of public object

};

},{}],2:[function(require,module,exports){
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
        drugs.lsd.addiction = 0;
        drugs.alcohol.addiction = 0;
        drugs.marijuanna.addiction = 0;
        drugs.herion.addiction = 0;
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
            if ((str == null) || (str.trim() !== "")) {
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

},{"./rot13.js":9}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = function() {
    // Requires Bootbox.js
    var rot13 = require('./rot13.js');

    // Private vars
    var impaired = false;
    var drugid = 0;
    var drugs = [
        'lsd',
        'alcohol',
        'marijuanna',
        'herion'
    ];
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



    function makeOffer(drug, impInd, drugFn, impairFn, mutexFn) {
        var msg = "Your " + pushers[drugid++ % pushers.length] + " offers you some " + drug + " at " + locations[drugid % locations.length] + ".";
        if (impInd) {
            msg = rot13(msg);
        }

        function impairmentTicks(drug) {
            var retval = 0;
            if (drug == "lsd") {
                retval = 6;
            }
            if (drug == "alcohol") {
                retval = 0;
            }
            if (drug == "marijuanna") {
                retval = 0;
            }
            if (drug == "herion") {
                retval = 16;
            }
            return retval;
        };


        var takeit = {
            label: "Yes Please",
            className: "btn-success",
            callback: function() {
                drugFn(drug, true);
                mutexFn(false);
                impairFn(impairmentTicks(drug))
            }
        };
        var denyit = {
            label: "Get Bent",
            className: "btn-danger",
            callback: function() {
                drugFn(drug, impInd); // If impaired, this is true too.   oops! :)
                mutexFn(false);
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
        drugName: function(i) {
            return drugs[(i % drugs.length)];
        },
        impair: function(b) {
            impaired = !!b;
        },
        offer: function(drug, imp, drugFn, impairFn, mutexFn) {
            makeOffer(drug, imp, drugFn, impairFn, mutexFn);
        },
        clear: function() {
            pushers.shuffle();
            locations.shuffle();
            return true;
        }
    }; // end return of public object

};

},{"./rot13.js":9}],5:[function(require,module,exports){
module.exports = function() {
    var first = true;
    var impaired = 0; //  Using a counter instead of a strict boolean.
    var eventOpen = false;
    var Band = require('./Band.js')();
    var WGO = require('./WGO.js')();
    var Grapevine = require('./Grapevine.js')();
    var DrugPrompt = require('./DrugPrompt.js')();
    var BandPrompt = require('./BandPrompt.js')();
    var About = require('./About.js')();

    var impairl = function(b) {
        WGO.impair(!!b);
        WGO.refresh();
        Grapevine.impair(!!b);
        Grapevine.refresh();
        Band.impair(!!b);
        Band.refresh();
        return impaired;
    };

    var impairAdd = function(x) {
        impaired += x;
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
                About.showSplash();
            });
            $("#new_game").click(function() {
                restart();
                BandPrompt.name(Band.setName);
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
                About.howToPlay();
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
        WGO.addItem(Band.getPop("local"));
        WGO.addItem(Band.getPop("national"));
        WGO.addItem(Band.getPop("global"));
        WGO.refresh();
    }

    function setEvent(b) {
        eventOpen = !!b;
    }

    // Return public interface
    return {
        incDate: function() {
            if (!eventOpen) {
                if (impaired > 0) {
                    impaired -= 1;
                    impairl(true);
                } else {
                    impaired = 0;
                    impairl(false);
                }
                var x = Band.incDate();
                if ((x % 30) == 0) {
                    showPopularity();
                }
                if ((x % 11) == 0) {
                    setEvent(true);
                    DrugPrompt.offer(DrugPrompt.drugName(x), impaired, Band.drugoffer, impairAdd, setEvent);
                }
                if ((x % 3) == 0) {
                    Grapevine.otherSong();
                    Grapevine.refresh();
                }
            } // if !eventOpen
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

},{"./About.js":1,"./Band.js":2,"./BandPrompt.js":3,"./DrugPrompt.js":4,"./Grapevine.js":6,"./WGO.js":7}],6:[function(require,module,exports){
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

},{"./random.js":8,"./rot13.js":9}],7:[function(require,module,exports){
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

},{"./random.js":8,"./rot13.js":9}],8:[function(require,module,exports){
module.exports = function(target) {
    return Math.floor(Math.random() * target);
};

},{}],9:[function(require,module,exports){
module.exports = function(s) {
    return s.replace(/[A-Za-z]/g, function(c) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)
        );
    });
};

},{}],10:[function(require,module,exports){
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

},{"./GameManager.js":5}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQWJvdXQuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9CYW5kUHJvbXB0LmpzIiwiYXBwL0RydWdQcm9tcHQuanMiLCJhcHAvR2FtZU1hbmFnZXIuanMiLCJhcHAvR3JhcGV2aW5lLmpzIiwiYXBwL1dHTy5qcyIsImFwcC9yYW5kb20uanMiLCJhcHAvcm90MTMuanMiLCJhcHAvc3RvbmVzdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlcXVpcmVzIEJvb3Rib3guanNcbiAgICBib290Ym94LmFkZExvY2FsZShcInJvY2tcIiwge1xuICAgICAgICBPSzogJ1JvY2snLFxuICAgICAgICBDQU5DRUw6ICdCdWdnZXIgT2ZmJyxcbiAgICAgICAgQ09ORklSTTogJ0FscmlnaHR5IFRoZW4nXG4gICAgfSk7XG4gICAgYm9vdGJveC5zZXRMb2NhbGUoXCJyb2NrXCIpO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgZnVuY3Rpb24gZGlzcGxheVNwbGFzaCgpIHtcbiAgICAgICAgdmFyIGFib3V0ID0gJzxwPlRoaXMgZ2FtZSBpcyBiYXNlZCBoZWF2aWx5IG9uIGFuIG9sZCBET1MgY29tcHV0ZXIgZ2FtZSBjYWxsZWQgXCJSb2NrIFN0YXJcIi48L3A+JztcbiAgICAgICAgYWJvdXQgKz0gJzxwPkkgaGFkIHNvIG11Y2ggZnVuIHBsYXlpbmcgd2l0aCB0aGUgZ2FtZSBpbiB0aGUgZWFybHkgOTBzIHRoYXQgSSBkZWNpZGVkIHRoYXQgSSBkaWRuXFwndCB3YW50IHRvIGJlIHdpdGhvdXQgaXQgYW55IG1vcmUuPC9wPic7XG4gICAgICAgIGFib3V0ICs9ICc8cD5UaGFua3MgdG8gdGhlIGZvbGtzIGluIGNoaXphdCBmb3IgdGhlIGVuY291cmFnZW1lbnQgYW5kIHRoZSBjcm93ZHNvdXJjaW5nIG9mIGFydGlzdHMgYW5kIHRyYWNrIHRpdGxlcy48L3A+JztcbiAgICAgICAgYWJvdXQgKz0gJzxwPk15IG5hbWUgaXMgPGEgaHJlZj1cImh0dHA6Ly90YW5nZW50aWFsY29sZC5jb21cIj5LdXJ0IFNjaHdpbmQ8L2E+IGFuZCBJIGFwcHJvdmUgdGhpcyBtZXNzYWdlLjwvcD4nO1xuXG5cbiAgICAgICAgYm9vdGJveC5hbGVydCh7XG4gICAgICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICAgICAgdGl0bGU6ICdBYm91dCcsXG4gICAgICAgICAgICBtZXNzYWdlOiBhYm91dFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5SG93VG9QbGF5KCkge1xuICAgICAgICB2YXIgbXNnID0gJ1lvdSBhcmUgYSBidWRkaW5nIFJvY2sgbiBSb2xsIHN0YXIhICBOYXZpZ2F0ZSB5b3VyIGxpZmUgY2hvaWNlcyBhbmQgc2VlIGlmIGZhbWUgYW5kIGZvcnR1bmUgYXdhaXQhJztcblxuICAgICAgICBib290Ym94LmFsZXJ0KHtcbiAgICAgICAgICAgIHNpemU6ICdsYXJnZScsXG4gICAgICAgICAgICB0aXRsZTogJ0hvdyBUbyBQbGF5JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZ1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1NwbGFzaDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIGRpc3BsYXlTcGxhc2goKTtcbiAgICAgICAgfSxcbiAgICAgICAgaG93VG9QbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRpc3BsYXlIb3dUb1BsYXkoKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBiYW5kbmFtZSA9IFwiQWJqdXJlciBOb3doZXJlXCI7XG4gICAgdmFyIG1hc3RlcmlkID0gMDsgLy8gSnVzdCBhIHVuaXF1ZSBrZXlcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgcm90MTMgPSByZXF1aXJlKCcuL3JvdDEzLmpzJyk7XG5cbiAgICAvLyBwZXJzb25hbFxuICAgIHZhciBoZWFsdGggPSAwO1xuICAgIHZhciBjcmVhdGl2aXR5ID0gMDtcbiAgICB2YXIgaGFwcGluZXNzID0gMDtcbiAgICB2YXIgYWxlcnRuZXNzID0gMDtcblxuICAgIC8vIHRpbWVcbiAgICB2YXIgZGF5Y291bnQgPSAxO1xuICAgIHZhciBkb3cgPSBbXG4gICAgICAgIFwiU3VuZGF5XCIsXG4gICAgICAgIFwiTW9uZGF5XCIsXG4gICAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgICBcIldlZG5lc2RheVwiLFxuICAgICAgICBcIlRodXJzZGF5XCIsXG4gICAgICAgIFwiRnJpZGF5XCIsXG4gICAgICAgIFwiU2F0dXJkYXlcIlxuICAgIF07XG5cbiAgICAvLyBwb3B1bGFyaXR5XG4gICAgdmFyIGxvY2FscCA9IDA7XG4gICAgdmFyIG5hdGlvbmFscCA9IDA7XG4gICAgdmFyIGdsb2JhbHAgPSAwO1xuXG4gICAgdmFyIGRydWdzID0ge1xuICAgICAgICBcImxzZFwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiAxLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDMsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDMsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogNVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImFsY29ob2xcIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogNSxcbiAgICAgICAgICAgICAgICBcImhlYWx0aFwiOiA1LFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAyLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMTBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYXJpanVhbm5hXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDMsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogMyxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMyxcbiAgICAgICAgICAgICAgICBcImhhcHBpbmVzc1wiOiA3LFxuICAgICAgICAgICAgICAgIFwiYWxlcnRuZXNzXCI6IDExXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGVyaW9uXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDksXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHZhciBzaW5nbGVzID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHRvdXJzID0gW107XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFNvbWUgcHJpdmF0ZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgJ3RydWUnIGlmIHRoZSBjYXNlIHdhcyBub3Qgc29sdmFibGUgXG4gICAgZnVuY3Rpb24gYWRkU2luZ2xlKG5hbWUpIHtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdpZCc6IG1hc3RlcmlkKyssXG4gICAgICAgICAgICAnbmFtZSc6IG5hbWUsXG4gICAgICAgICAgICAnbHBvcCc6IDAsXG4gICAgICAgICAgICAnbnBvcCc6IDAsXG4gICAgICAgICAgICAnZ3BvcCc6IDBcbiAgICAgICAgfTtcbiAgICAgICAgc2luZ2xlcy5wdXNoKHJldHZhbCk7XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgbG9jYWxwID0gbmF0aW9uYWxwID0gZ2xvYmFscCA9IDA7XG4gICAgICAgIGhhcHBpbmVzcyA9IGFsZXJ0bmVzcyA9IGNyZWF0aXZpdHkgPSA1MDtcbiAgICAgICAgaGVhbHRoID0gODA7XG4gICAgICAgIGRheWNvdW50ID0gMTtcbiAgICAgICAgc2NvcmUgPSAwO1xuICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgcmVmcmVzaFBvcHVsYXJpdHkoKTtcbiAgICAgICAgZHJ1Z3MubHNkLmFkZGljdGlvbiA9IDA7XG4gICAgICAgIGRydWdzLmFsY29ob2wuYWRkaWN0aW9uID0gMDtcbiAgICAgICAgZHJ1Z3MubWFyaWp1YW5uYS5hZGRpY3Rpb24gPSAwO1xuICAgICAgICBkcnVncy5oZXJpb24uYWRkaWN0aW9uID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoUGVyc29uYWwoKSB7XG4gICAgICAgICQoXCIjcGxheWVyX2hlYWx0aFwiKS5odG1sKGhlYWx0aCk7XG4gICAgICAgICQoXCIjcGxheWVyX2NyZWF0aXZpdHlcIikuaHRtbChjcmVhdGl2aXR5KTtcbiAgICAgICAgJChcIiNwbGF5ZXJfaGFwcGluZXNzXCIpLmh0bWwoaGFwcGluZXNzKTtcbiAgICAgICAgJChcIiNwbGF5ZXJfYWxlcnRuZXNzXCIpLmh0bWwoYWxlcnRuZXNzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoUG9wdWxhcml0eSgpIHtcbiAgICAgICAgJChcIiNsb2NhbF9wb3BcIikuaHRtbChsb2NhbHApO1xuICAgICAgICAkKFwiI25hdGlvbmFsX3BvcFwiKS5odG1sKG5hdGlvbmFscCk7XG4gICAgICAgICQoXCIjZ2xvYmFsX3BvcFwiKS5odG1sKGdsb2JhbHApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hOYW1lKCkge1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgICQoXCIjYmFuZG5hbWVcIikuaHRtbChyb3QxMyhiYW5kbmFtZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKGJhbmRuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZsYXZvclBvcChwb3AsIGxvYykge1xuICAgICAgICB2YXIgcmV0dmFsID0gXCJcIjtcbiAgICAgICAgaWYgKHBvcCA+IDg1KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcIndvcnNoaXBwZWQgYXMgdGhlIHJvY2sgZGlldHkgdGhhdCB5b3UgYXJlIVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3AgPCA4Nikge1xuICAgICAgICAgICAgcmV0dmFsID0gXCJrbm93biB0byBldmVuIGNhc3VhbCBmYW5zXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDY1KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImdldHRpbmcgeW91ciBtdXNpYyBwaXJhdGVkIGJ5IHNjb3JlcyBvZiB5b3V0aFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3AgPCA0NSkge1xuICAgICAgICAgICAgcmV0dmFsID0gXCJnZXR0aW5nIHNvbWUgYWlyLXBsYXkgb24gcmFkaW8gc3RhdGlvbnMuXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDI1KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImtub3duIHRvIGEgZmV3IGRpZS1oYXJkIGZhbnMuXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDE2KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcInZpcnR1YWxseSB1bmtub3duLlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHZhbCA9IFwiPGVtPkF0IHRoZSBcIiArIGxvYyArIFwiIGxldmVsIHlvdSBhcmUgXCIgKyByZXR2YWwgKyBcIjwvZW0+XCI7XG4gICAgICAgIHJldHVybiByZXR2YWw7XG5cbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0TmFtZTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpZiAoKHN0ciA9PSBudWxsKSB8fCAoc3RyLnRyaW0oKSAhPT0gXCJcIikpIHtcbiAgICAgICAgICAgICAgICBiYW5kbmFtZSA9IHN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjYmFuZG5hbWVcIikuaHRtbChiYW5kbmFtZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgICAgICAgICAgcmVmcmVzaE5hbWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJ1Z29mZmVyOiBmdW5jdGlvbihkcnVnbmFtZSwgdGFrZW4pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZHJ1Z25hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibHNkXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLmxzZC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5sc2QuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmxzZC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MubHNkLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MubHNkLmFkZGljdGlvbiArPSBkcnVncy5sc2QuZmFjdG9ycy5hZGRpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzIC09IGRydWdzLmxzZC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5sc2QuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5sc2QuYWRkaWN0aW9uIC09IChkcnVncy5sc2QuZmFjdG9ycy5hZGRpY3Rpb24gLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFsY29ob2xcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MuYWxjb2hvbC5hZGRpY3Rpb24gKz0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmFkZGljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzIC09IGRydWdzLmFsY29ob2wuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLmFsY29ob2wuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5hbGNvaG9sLmFkZGljdGlvbiAtPSAoZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmFkZGljdGlvbiAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFyaWp1YW5uYVwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5tYXJpanVhbm5hLmFkZGljdGlvbiArPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLm1hcmlqdWFubmEuYWRkaWN0aW9uIC09IChkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoZXJpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5oZXJpb24uYWRkaWN0aW9uICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmFkZGljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmhlcmlvbi5hZGRpY3Rpb24gLT0gKGRydWdzLmhlcmlvbi5mYWN0b3JzLmFkZGljdGlvbiAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gZHJ1Zyx0YWtlbiA6IFwiICsgZHJ1Z25hbWUgKyBcIiAsIFwiICsgdGFrZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RHJ1Z3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRydWdzO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQb3A6IGZ1bmN0aW9uKHBvcFR5cGUpIHtcbiAgICAgICAgICAgIHZhciByZXR2YWwgPSAnTm8gb25lIGNhcmVzIGFib3V0IHlvdS4nO1xuICAgICAgICAgICAgaWYgKHBvcFR5cGUgPT09IFwibG9jYWxcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IGZsYXZvclBvcChsb2NhbHAsIHBvcFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBvcFR5cGUgPT09IFwibmF0aW9uYWxcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IGZsYXZvclBvcChuYXRpb25hbHAsIHBvcFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBvcFR5cGUgPT09IFwiZ2xvYmFsXCIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSBmbGF2b3JQb3AoZ2xvYmFscCwgcG9wVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgICAgICB9LFxuICAgICAgICBpbmNEYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRheWNvdW50Kys7XG4gICAgICAgICAgICB2YXIgd2sgPSBNYXRoLmZsb29yKChkYXljb3VudCAvIDcpICsgMSkgJSA1MjtcbiAgICAgICAgICAgIHZhciB5ciA9IE1hdGguZmxvb3IoKGRheWNvdW50IC8gMzY1KSArIDEpO1xuICAgICAgICAgICAgJChcIiN0aW1lX2Rvd1wiKS5odG1sKGRvd1tkYXljb3VudCAlIDddKTtcbiAgICAgICAgICAgICQoXCIjdGltZV95ZWFyXCIpLmh0bWwoeXIpO1xuICAgICAgICAgICAgJChcIiN0aW1lX3dlZWtcIikuaHRtbCh3ayk7XG4gICAgICAgICAgICByZXR1cm4gZGF5Y291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0KCk7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gUmVxdWlyZXMgQm9vdGJveC5qc1xuICAgIGJvb3Rib3guYWRkTG9jYWxlKFwicm9ja1wiLCB7XG4gICAgICAgIE9LOiAnUm9jaycsXG4gICAgICAgIENBTkNFTDogJ0J1Z2dlciBPZmYnLFxuICAgICAgICBDT05GSVJNOiAnQWxyaWdodHkgVGhlbidcbiAgICB9KTtcbiAgICBib290Ym94LnNldExvY2FsZShcInJvY2tcIik7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcblxuICAgIGZ1bmN0aW9uIGdldE5hbWUobmFtZUZuKSB7XG4gICAgICAgIHZhciBtc2cgPSBcIk5hbWUgeW91ciBiYW5kIDogXCI7XG5cblxuICAgICAgICBib290Ym94LnByb21wdCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICAgICAgICB0aXRsZTogXCJSb2NrIG4gUm9sbCBGYW1lIEF3YWl0IVwiLFxuICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgc2l6ZTogJ21lZGl1bScsXG4gICAgICAgICAgICBjYWxsYmFjazogbmFtZUZuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRydWdSYW5nZShuKSB7XG4gICAgICAgIHZhciByZXRTdHIgPSAnJztcbiAgICAgICAgaWYgKG4gPiA4NSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1kYW5nZXJcIj5Zb3Ugd2lsbCBnbGFkbHkgc2hpdiB5b3VyIG93biBtb3RoZXIgZm9yIHNvbWUgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDg1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5Zb3UgYXJlIGF0IG9uZSB3aXRoICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCA3NSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1pbmZvXCI+RnJpZW5kcyBhc3N1bWUgeW91XFwnbGwgZ2xhZGx5IHRha2UgbW9yZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgNTUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtaW5mb1wiPllvdSBoYXZlIGEgcmVwdXRhdGlvbiBvbiBpbmR1bGdpbmcgb24gJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDM1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LXN1Y2Nlc3NcIj5Zb3UgYXJlIHZlcnkga2VlbiBvbiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgMjUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtc3VjY2Vzc1wiPllvdSBraW5kIG9mIGxpa2UgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDE1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LW11dGVkXCI+WW91IGRvIG5vdCBoYXZlIG11Y2ggb2YgYW4gb3BpbmlvbiBvbiAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRTdHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGxheURydWdQcmVmZXJlbmNlcyhkKSB7XG4gICAgICAgIHZhciBtc2cgPSAnJztcbiAgICAgICAgbXNnICs9IGRydWdSYW5nZShkLmFsY29ob2wuYWRkaWN0aW9uKSArIFwiPHU+PGI+YWxjb2hvbDwvYj48L3U+LjwvcD5cIjtcbiAgICAgICAgbXNnICs9IGRydWdSYW5nZShkLm1hcmlqdWFubmEuYWRkaWN0aW9uKSArIFwiPHU+PGI+bWFyaWp1YW5uYTwvYj48L3U+LjwvcD5cIjtcbiAgICAgICAgbXNnICs9IGRydWdSYW5nZShkLmxzZC5hZGRpY3Rpb24pICsgXCI8dT48Yj5sc2Q8L2I+PC91Pi48L3A+XCI7XG4gICAgICAgIG1zZyArPSBkcnVnUmFuZ2UoZC5oZXJpb24uYWRkaWN0aW9uKSArIFwiPHU+PGI+aGVyaW9uPC9iPjwvdT4uPC9wPlwiO1xuXG4gICAgICAgIGJvb3Rib3guYWxlcnQoe1xuICAgICAgICAgICAgc2l6ZTogJ2xhcmdlJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZ1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIGdldE5hbWUoZm4pO1xuICAgICAgICB9LFxuICAgICAgICB0b3VyOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkcnVnUHJlZmVyZW5jZXM6IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGRpc3BsYXlEcnVnUHJlZmVyZW5jZXMoZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlcXVpcmVzIEJvb3Rib3guanNcbiAgICB2YXIgcm90MTMgPSByZXF1aXJlKCcuL3JvdDEzLmpzJyk7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgZHJ1Z2lkID0gMDtcbiAgICB2YXIgZHJ1Z3MgPSBbXG4gICAgICAgICdsc2QnLFxuICAgICAgICAnYWxjb2hvbCcsXG4gICAgICAgICdtYXJpanVhbm5hJyxcbiAgICAgICAgJ2hlcmlvbidcbiAgICBdO1xuICAgIHZhciBwdXNoZXJzID0gW1xuICAgICAgICAnYmFzc2lzdCcsXG4gICAgICAgICdkcnVtbWVyJyxcbiAgICAgICAgJ2d1aXRhcmlzdCcsXG4gICAgICAgICdmbGF0IG1hdGUnLFxuICAgICAgICAnbW90aGVyJyxcbiAgICAgICAgJ2xhbmRsb3JkJyxcbiAgICAgICAgJ2hhaXIgZHJlc3NlcicsXG4gICAgICAgICdwaXp6YSBkZWxpdmVyeSBkcml2ZXInLFxuICAgICAgICAnYmFydGVuZGVyJyxcbiAgICAgICAgJ2ZyaWVuZCB0aGUgYXNwaXJpbmcgXFxcImFjdG9yXFxcIidcbiAgICBdO1xuICAgIHZhciBsb2NhdGlvbnMgPSBbXG4gICAgICAgICd0aGUgc3VwZXJtYXJrZXQnLFxuICAgICAgICAndGhlIHJhdmUnLFxuICAgICAgICAndGhlIHJvbWFuY2Ugc2VjdGlvbiBhdCB0aGUgbG9jYWwgbGlicmFyeScsXG4gICAgICAgICd0aGUgYWxsZXkgYmVoaW5kIHRoYXQgdGFjbyBiZWxsIHlvdSB0ZWxsIGV2ZXJ5b25lIHlvdVxcJ2QgbmV2ZXIgZWF0IGF0JyxcbiAgICAgICAgJ3RoZSBib3dsaW5nIGFsbGV5IHlvdSBnbyB0byBpcm9uaWNhbGx5JyxcbiAgICAgICAgJ3RoZSB0cmFpbiBzdGF0aW9uJyxcbiAgICAgICAgJ3RoZSByZXN0IGFyZWEgd2hlcmUgdGhleSBjYXVnaHQgdGhhdCBvbmUgZHVkZSBkb2luZyB0aGF0IG9uZSB0aGluZycsXG4gICAgICAgICd0aGUgYmFyJyxcbiAgICAgICAgJ3RoZSBwYXJ0eScsXG4gICAgICAgICd0aGUgQmFyIE1pdHp2YWggZm9yIHRoYXQgb25lIGtpZCBvZiB5b3VyIGNvdXNpblxcJ3MgdGhhdCB5b3Ugb25seSBzZWUnLFxuICAgICAgICAndGhlIHdlZGRpbmcgb2YgeW91ciBFeCdcbiAgICBdO1xuXG5cblxuICAgIGZ1bmN0aW9uIG1ha2VPZmZlcihkcnVnLCBpbXBJbmQsIGRydWdGbiwgaW1wYWlyRm4sIG11dGV4Rm4pIHtcbiAgICAgICAgdmFyIG1zZyA9IFwiWW91ciBcIiArIHB1c2hlcnNbZHJ1Z2lkKysgJSBwdXNoZXJzLmxlbmd0aF0gKyBcIiBvZmZlcnMgeW91IHNvbWUgXCIgKyBkcnVnICsgXCIgYXQgXCIgKyBsb2NhdGlvbnNbZHJ1Z2lkICUgbG9jYXRpb25zLmxlbmd0aF0gKyBcIi5cIjtcbiAgICAgICAgaWYgKGltcEluZCkge1xuICAgICAgICAgICAgbXNnID0gcm90MTMobXNnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGltcGFpcm1lbnRUaWNrcyhkcnVnKSB7XG4gICAgICAgICAgICB2YXIgcmV0dmFsID0gMDtcbiAgICAgICAgICAgIGlmIChkcnVnID09IFwibHNkXCIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSA2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRydWcgPT0gXCJhbGNvaG9sXCIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRydWcgPT0gXCJtYXJpanVhbm5hXCIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRydWcgPT0gXCJoZXJpb25cIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IDE2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIHZhciB0YWtlaXQgPSB7XG4gICAgICAgICAgICBsYWJlbDogXCJZZXMgUGxlYXNlXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuLXN1Y2Nlc3NcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkcnVnRm4oZHJ1ZywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbXV0ZXhGbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgaW1wYWlyRm4oaW1wYWlybWVudFRpY2tzKGRydWcpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgZGVueWl0ID0ge1xuICAgICAgICAgICAgbGFiZWw6IFwiR2V0IEJlbnRcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4tZGFuZ2VyXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZHJ1Z0ZuKGRydWcsIGltcEluZCk7IC8vIElmIGltcGFpcmVkLCB0aGlzIGlzIHRydWUgdG9vLiAgIG9vcHMhIDopXG4gICAgICAgICAgICAgICAgbXV0ZXhGbihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYm9vdGJveC5kaWFsb2coe1xuICAgICAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICAgICAgdGl0bGU6IFwiRHJ1Z3MhXCIsXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICBzaXplOiAnc21hbGwnLFxuICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgIHBvc2l0aXZlOiB0YWtlaXQsXG4gICAgICAgICAgICAgICAgbmVnYXRpdmU6IGRlbnlpdFxuICAgICAgICAgICAgfSAvLyBidXR0b25zXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBkcnVnTmFtZTogZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgcmV0dXJuIGRydWdzWyhpICUgZHJ1Z3MubGVuZ3RoKV07XG4gICAgICAgIH0sXG4gICAgICAgIGltcGFpcjogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgaW1wYWlyZWQgPSAhIWI7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZmVyOiBmdW5jdGlvbihkcnVnLCBpbXAsIGRydWdGbiwgaW1wYWlyRm4sIG11dGV4Rm4pIHtcbiAgICAgICAgICAgIG1ha2VPZmZlcihkcnVnLCBpbXAsIGRydWdGbiwgaW1wYWlyRm4sIG11dGV4Rm4pO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoZXJzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIGxvY2F0aW9ucy5zaHVmZmxlKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgIHZhciBpbXBhaXJlZCA9IDA7IC8vICBVc2luZyBhIGNvdW50ZXIgaW5zdGVhZCBvZiBhIHN0cmljdCBib29sZWFuLlxuICAgIHZhciBldmVudE9wZW4gPSBmYWxzZTtcbiAgICB2YXIgQmFuZCA9IHJlcXVpcmUoJy4vQmFuZC5qcycpKCk7XG4gICAgdmFyIFdHTyA9IHJlcXVpcmUoJy4vV0dPLmpzJykoKTtcbiAgICB2YXIgR3JhcGV2aW5lID0gcmVxdWlyZSgnLi9HcmFwZXZpbmUuanMnKSgpO1xuICAgIHZhciBEcnVnUHJvbXB0ID0gcmVxdWlyZSgnLi9EcnVnUHJvbXB0LmpzJykoKTtcbiAgICB2YXIgQmFuZFByb21wdCA9IHJlcXVpcmUoJy4vQmFuZFByb21wdC5qcycpKCk7XG4gICAgdmFyIEFib3V0ID0gcmVxdWlyZSgnLi9BYm91dC5qcycpKCk7XG5cbiAgICB2YXIgaW1wYWlybCA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgV0dPLmltcGFpcighIWIpO1xuICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICBHcmFwZXZpbmUuaW1wYWlyKCEhYik7XG4gICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgIEJhbmQuaW1wYWlyKCEhYik7XG4gICAgICAgIEJhbmQucmVmcmVzaCgpO1xuICAgICAgICByZXR1cm4gaW1wYWlyZWQ7XG4gICAgfTtcblxuICAgIHZhciBpbXBhaXJBZGQgPSBmdW5jdGlvbih4KSB7XG4gICAgICAgIGltcGFpcmVkICs9IHg7XG4gICAgICAgIHJldHVybiBpbXBhaXJlZDtcbiAgICB9O1xuXG4gICAgdmFyIHJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgQmFuZC5jbGVhcigpO1xuICAgICAgICBXR08uY2xlYXIoKTtcbiAgICAgICAgR3JhcGV2aW5lLmNsZWFyKCk7XG5cbiAgICAgICAgLyogT25seSBiaW5kIHRoZXNlIGV2ZW50cyBvbiBmaXJzdCBwYXNzICovXG4gICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICQoXCIjdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgQmFuZC5pbmNEYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjYWJvdXRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgQWJvdXQuc2hvd1NwbGFzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI25ld19nYW1lXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICBCYW5kUHJvbXB0Lm5hbWUoQmFuZC5zZXROYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiN0b3Vyc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUub3RoZXJTb25nKCk7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNjaGFydHNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLmFkZEl0ZW0oXCJZb3UgYXJlIG9uIHRoZSBjaGFydHNcIik7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNob3dfdG9fcGxheVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBBYm91dC5ob3dUb1BsYXkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNyZWxlYXNlc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBXR08uYWRkSXRlbShcIlJlbGVhc2VzIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIFdHTy5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjZHJ1Z3NcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgQmFuZFByb21wdC5kcnVnUHJlZmVyZW5jZXMoQmFuZC5nZXREcnVncygpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNob3dQb3B1bGFyaXR5KCkge1xuICAgICAgICBXR08uYWRkSXRlbShCYW5kLmdldFBvcChcImxvY2FsXCIpKTtcbiAgICAgICAgV0dPLmFkZEl0ZW0oQmFuZC5nZXRQb3AoXCJuYXRpb25hbFwiKSk7XG4gICAgICAgIFdHTy5hZGRJdGVtKEJhbmQuZ2V0UG9wKFwiZ2xvYmFsXCIpKTtcbiAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRFdmVudChiKSB7XG4gICAgICAgIGV2ZW50T3BlbiA9ICEhYjtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGluY0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFldmVudE9wZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1wYWlyZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGltcGFpcmVkIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIGltcGFpcmwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW1wYWlyZWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpbXBhaXJsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHggPSBCYW5kLmluY0RhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoKHggJSAzMCkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93UG9wdWxhcml0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHggJSAxMSkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRFdmVudCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgRHJ1Z1Byb21wdC5vZmZlcihEcnVnUHJvbXB0LmRydWdOYW1lKHgpLCBpbXBhaXJlZCwgQmFuZC5kcnVnb2ZmZXIsIGltcGFpckFkZCwgc2V0RXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHggJSAzKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIEdyYXBldmluZS5vdGhlclNvbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgR3JhcGV2aW5lLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vIGlmICFldmVudE9wZW5cbiAgICAgICAgfSxcbiAgICAgICAgd2hhdGV2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3RhcnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wYWlybChiKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG5cblxuICAgIHZhciBhcnRpc3RzID0gW1xuICAgICAgICBcIlRoZSBCaW5nIEJhbmdzXCIsXG4gICAgICAgIFwiTW9kZXJuIFNob2VcIixcbiAgICAgICAgXCJUZWFtIEdvcmRvblwiLFxuICAgICAgICBcIkNvcnkgRG9jdG9yb3dcIixcbiAgICAgICAgXCJLdXJ0IChub3QgdGhhdCBvbmUgdGhlIG90aGVyIG9uZSlcIixcbiAgICAgICAgXCJNeSBVbmRlcndlYXJcIixcbiAgICAgICAgXCJJbnRlcm5hbCBJc3N1ZXNcIixcbiAgICAgICAgXCJDYXQgVmlkZW8gQ2x1YlwiLFxuICAgICAgICBcIk5hdmkgaXMgbXkgU3Bpcml0IEd1aWRlXCIsXG4gICAgICAgIFwiQmx1ZSBDaGlja2VuIE51Z2dldFwiLFxuICAgICAgICBcIllhcm4gUG9ybm9ncmFwaHlcIixcbiAgICAgICAgXCI2IGN5bGluZGVyIE1ha2V1cFwiLFxuICAgICAgICBcIlRoZSBCdXJsYXAgUGVhbnV0XCIsXG4gICAgICAgIFwiVGVxdWlsYSBNb2NraW5nYmlyZFwiLFxuICAgICAgICBcIkFuYXJrZXkgaW4gdGhlIExpYnJhcnlcIixcbiAgICAgICAgXCJCcm90aGVyIFRzaG9iZXJcIixcbiAgICAgICAgXCJGcnVtcHkgQnJlYXN0IEFuZCBUaGUgU2hhY2tcIixcbiAgICAgICAgXCJDaGllZiBQcmVzaWRlbnRcIixcbiAgICAgICAgXCJUd2luIFN0cmFuZ2VyXCIsXG4gICAgICAgIFwiRG91YnQgT2YgUGFyYWRpc2VcIixcbiAgICAgICAgXCJNYXNzaXZlIExvZ2lzdGljXCIsXG4gICAgICAgIFwiUmVwdWJsaWNhbiBGdXJyeVwiLFxuICAgICAgICBcIkdhbGF4eSBPZiBUaGUgSW50aW1hdGUgV2Fsa1wiLFxuICAgICAgICBcIkRlbGVjdGFibGUgSWduaXRlXCIsXG4gICAgICAgIFwiVmVydGlnbyBPZiBUaGUgT2JqZWN0XCIsXG4gICAgICAgIFwiQ2F1dGlvbiBBcm1hZGFcIixcbiAgICAgICAgXCJTdHlybyBBYnNlbmNlXCIsXG4gICAgICAgIFwiQWZ0ZXIgQnVzaFwiLFxuICAgICAgICBcIll1a29uIFN1Y2Nlc3NcIixcbiAgICAgICAgXCJCdXR0LXVnbHkgUGFwZXJcIixcbiAgICAgICAgXCJFbnRpdGxlZCBPZGRzIE9mIFRoZSBTbGluZyBMaWNrXCIsXG4gICAgICAgIFwiUGluayBNaXN0XCIsXG4gICAgICAgIFwiQnV0dCBTZXJpb3VzbHlcIixcbiAgICAgICAgXCJUaGUgRGlzcmEgTWlzdHkgQmFuZFwiLFxuICAgICAgICBcIkRpeGllICYgdGhlIE5pbmphc1wiLFxuICAgICAgICBcIllldCBBbm90aGVyIE1hc3MgRXh0aW5jdGlvbiBFdmVudFwiLFxuICAgICAgICBcIlRoZSBQb3dlciBDaG9yZCBIb3RzaG90c1wiLFxuICAgICAgICBcIkRvbm5lciBEaW5uZXIgUGFydHlcIixcbiAgICAgICAgXCJUZWVuIEFuZ3N0XCIsXG4gICAgICAgIFwiQWdncmVzc2l2ZSBQYWNpZmlzbVwiLFxuICAgICAgICBcIk15IENoZW1pY2FsIEJyb21hbmNlXCIsXG4gICAgICAgIFwiVGhlIE5pY2tsZWJhY2sgVHJpYnV0ZSBCYW5kXCIsXG4gICAgICAgIFwiSGFtYnVyZ2VyIEV2YW5nZWxpc21cIlxuICAgIF07XG5cbiAgICB2YXIgc29uZ3RpdGxlcyA9IFtcbiAgICAgICAgXCJUaGlzIGlzIGEgVHVuZVwiLFxuICAgICAgICBcIllvZGVscyBtYWtlIG1lIGhhcHB5XCIsXG4gICAgICAgIFwiSXQncyBhIHdpbGwgcm9sbCBkYW1taXRcIixcbiAgICAgICAgXCJJIGxpa2UgcG9wY29yblwiLFxuICAgICAgICBcIk15IEVsZWN0cmljaWFuIE1hZGUgbWUgU2FkXCIsXG4gICAgICAgIFwiUk5HIGluIEhlYXJ0aHN0b25lIEZUV1wiLFxuICAgICAgICBcIk15IHRoaXJkIGJlbGx5IGJ1dHRvblwiLFxuICAgICAgICBcIldhdGNoaW5nIFlvdVR1YmUgYXQgV29ya1wiLFxuICAgICAgICBcIlRoZSBUcmlmb3JjZSBpcyBwb2ludHlcIixcbiAgICAgICAgXCJUaGV5IGdyb3cgZnJvbSBzcGVsbHNcIixcbiAgICAgICAgXCJJIHBsYXllZCBhIG1hZ2UgYW5kIEkgbGlrZWQgaXRcIixcbiAgICAgICAgXCJJIHN0aWxsIHBsYXkgb2xkIGdhbWVzXCIsXG4gICAgICAgIFwiSmF2YSBhaW50IGphdmFzY3JpcHRcIixcbiAgICAgICAgXCI1MCByZWFzb25zIHdoeSBKYXZhIGlzIGEgZmFkXCIsXG4gICAgICAgIFwiVGhlIGJlc3QgcGFydCBvZiBtZSBpcyBsZWZ0IGhhbmRlZFwiLFxuICAgICAgICBcIkl0IHRha2VzIGEgZmV3IHllYXJzIHRvIGxpc3RlbiB0byBteSBwbGF5bGlzdFwiLFxuICAgICAgICBcIlRhbmdlbnRpYWwgQ29sZFwiLFxuICAgICAgICBcIlRocm93aW5nIGEgcXVhcnRlciBhbmQgd2lzaGluZyB5b3Ugd2VsbFwiLFxuICAgICAgICBcIk15IGdvb2dsZSBjYWxlbmRhciBpcyByaWRpY3Vsb3VzXCIsXG4gICAgICAgIFwiUmVtZW1iZXIgd2hlbiBwZW9wbGUgbGluZWQgdXAgdG8gYnV5IFdpbmRvd3MgOTU/ICBDcmF6eSFcIixcbiAgICAgICAgXCJSaWNoYXJkIFN0YWxsbWFuIHdhcyBteSBiYWJ5c2l0dGVyXCIsXG4gICAgICAgIFwiTG9va2luZyB0byBUcmFpbj9cIixcbiAgICAgICAgXCJZb3UgZG8gbm90IGhhdmUgdGhlIHByb3BlciBzdG9uZVwiLFxuICAgICAgICBcIkkgYW0gbm90IHJlYWR5XCIsXG4gICAgICAgIFwiQnVnZ3kgdmlkZW8gZ2FtZXMuICBXaGF0J3MgdXAgd2l0aCB0aGF0P1wiLFxuICAgICAgICBcIklzIENhbGwgb2YgRHV0eSBzdGlsbCBhIHRoaW5nP1wiLFxuICAgICAgICBcIkkgaGF2ZSBhIG1pbGxpb24gYmFsbHMgYW5kIEkgYW0gdGhlIHNpemUgb2YgYSBwZWFudXRcIixcbiAgICAgICAgXCJCZWNhdXNlIHlvdSBrbm93IHRoZSBiYWJ5XCIsXG4gICAgICAgIFwiQ291cnRzaGlwIElzIEV2ZXJ5dGhpbmdcIixcbiAgICAgICAgXCJDYW4ndCBTdG9wIFRoZSBGaXJlY3JhY2tlclwiLFxuICAgICAgICBcIkhvbHkgRGVtb2NyYWN5XCIsXG4gICAgICAgIFwiRnJpZW5kcyBXaXRoIFN5bmNocm9uaXNhdGlvblwiLFxuICAgICAgICBcIlJhdyBTdGFzaFwiLFxuICAgICAgICBcIlN1cGVybmF0dXJhbCBUaW1lXCIsXG4gICAgICAgIFwiRG9uJ3QgU3RvcCBUaGUgRGV2aWxcIixcbiAgICAgICAgXCJIZWxsdXZhIFNob3BwaW5nXCIsXG4gICAgICAgIFwiVGhlIEFsbCBBbWVyaWNhbiBHaXJsXCIsXG4gICAgICAgIFwiQ2xhc3NpYyBHdWl0YXJcIixcbiAgICAgICAgXCJPdXRyYWdlb3VzIEF4ZVwiLFxuICAgICAgICBcIlVuY29udHJvbGxhYmxlIENyaW1pbmFsXCIsXG4gICAgICAgIFwiSG90c2hvdCBSYWluYm93XCIsXG4gICAgICAgIFwiVmxhZGltaXIgUHV0aW4gaXMgYSBHb2RcIixcbiAgICAgICAgXCJDcnlpbmcgSmFwYW5lc2UgUG9saXRpY2lhblwiXG4gICAgXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tKDQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcbiAgICAgICAgbWFzdGVyY291bnQrKztcbiAgICAgICAgdmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdjbGFzc3R5cGUnOiBjdCxcbiAgICAgICAgICAgICdzdHInOiBzdHJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJTb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcnRpc3RfaW5kZXggPSBtYXN0ZXJjb3VudCAlIGFydGlzdHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNvbmdfaW5kZXggPSBtYXN0ZXJjb3VudCAlIHNvbmd0aXRsZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbGVhc2Vfbm90aWNlID0gXCJOZXcgc2luZ2xlIHJlbGVhc2VkIGJ5ICdcIiArIGFydGlzdHNbYXJ0aXN0X2luZGV4XSArIFwiJyBjYWxsZWQgJ1wiICsgc29uZ3RpdGxlc1tzb25nX2luZGV4XSArIFwiJ1wiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkSXRlbShyZWxlYXNlX25vdGljZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBodG1sc3RyID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNzc2dsb2JhbFwiKS5odG1sKGh0bWxzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW1zID0gW107XG4gICAgICAgICAgICBhcnRpc3RzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHNvbmd0aXRsZXMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUob2JqKSB7XG4gICAgICAgIHZhciByZXR2YWw7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgc3dpdGNoIChyYW5kb20oNCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0cikge1xuICAgICAgICBtYXN0ZXJjb3VudCsrO1xuICAgICAgICB2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2NsYXNzdHlwZSc6IGN0LFxuICAgICAgICAgICAgJ3N0cic6IHN0clxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0oc3RyKSk7XG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGh0bWxzdHIgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWxzdHIgPSBodG1sc3RyLmNvbmNhdChmb3JtYXRMaW5lKGl0ZW1zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI3NzbG9jYWxcIikuaHRtbChodG1sc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sc3RyO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRhcmdldCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvW0EtWmEtel0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIuY2hhckF0KFxuICAgICAgICAgICAgXCJOT1BRUlNUVVZXWFlaQUJDREVGR0hJSktMTW5vcHFyc3R1dnd4eXphYmNkZWZnaGlqa2xtXCIuaW5kZXhPZihjKVxuICAgICAgICApO1xuICAgIH0pO1xufTtcbiIsIi8vIHN0b25lc3VuLmpzXG52YXIgR2FtZU1hbmFnZXIgPSByZXF1aXJlKCcuL0dhbWVNYW5hZ2VyLmpzJykoKTtcblxudmFyIHBhc3N0aW1lID0gZnVuY3Rpb24oKSB7XG4gICAgR2FtZU1hbmFnZXIuaW5jRGF0ZSgpO1xuICAgIHNldFRpbWVvdXQocGFzc3RpbWUsIDMwMDApO1xufVxuXG4vLyBBZGQgc2h1ZmZsZSBmdW5jdGlvbiB0byBhbGwgYXJyYXkgb2JqZWN0c1xuQXJyYXkucHJvdG90eXBlLnNodWZmbGUgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBybmQsIHRtcCwgaSA9IHRoaXMubGVuZ3RoOyBpOyBybmQgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogaSksIHRtcCA9IHRoaXNbLS1pXSwgdGhpc1tpXSA9IHRoaXNbcm5kXSwgdGhpc1tybmRdID0gdG1wKTtcbn07XG5cblxuLyogRGVmaW5lIGEgJ2NvbnNvbGUnIG9iamVjdCBmb3IgSUUgKi9cbmlmICh0eXBlb2YgY29uc29sZSAhPT0gJ29iamVjdCcpIHtcbiAgICBjb25zb2xlID0ge1xuICAgICAgICBsb2c6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRlYnVnOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBpbmZvOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB3YXJuOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgYXNzZXJ0OiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZGlyOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkaXJ4bWw6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHRyYWNlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBncm91cDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZ3JvdXBDb2xsYXBzZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdyb3VwRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjb3VudDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZXhjZXB0aW9uOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0YWJsZTogZnVuY3Rpb24oKSB7fVxuICAgIH07XG59XG5cbiQod2luZG93KS5sb2FkKEdhbWVNYW5hZ2VyLmluaXQpO1xuc2V0VGltZW91dChwYXNzdGltZSwgMzAwMCk7XG4iXX0=
