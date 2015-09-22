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
        WGO.addItem("Drugs can alter your sense of perception.")
        WGO.refresh();
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
                    WGO.addItem("You have been offered drugs.")
                    WGO.refresh();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQWJvdXQuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9CYW5kUHJvbXB0LmpzIiwiYXBwL0RydWdQcm9tcHQuanMiLCJhcHAvR2FtZU1hbmFnZXIuanMiLCJhcHAvR3JhcGV2aW5lLmpzIiwiYXBwL1dHTy5qcyIsImFwcC9yYW5kb20uanMiLCJhcHAvcm90MTMuanMiLCJhcHAvc3RvbmVzdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gUmVxdWlyZXMgQm9vdGJveC5qc1xuICAgIGJvb3Rib3guYWRkTG9jYWxlKFwicm9ja1wiLCB7XG4gICAgICAgIE9LOiAnUm9jaycsXG4gICAgICAgIENBTkNFTDogJ0J1Z2dlciBPZmYnLFxuICAgICAgICBDT05GSVJNOiAnQWxyaWdodHkgVGhlbidcbiAgICB9KTtcbiAgICBib290Ym94LnNldExvY2FsZShcInJvY2tcIik7XG5cbiAgICAvLyBQcml2YXRlIHZhcnNcbiAgICBmdW5jdGlvbiBkaXNwbGF5U3BsYXNoKCkge1xuICAgICAgICB2YXIgYWJvdXQgPSAnPHA+VGhpcyBnYW1lIGlzIGJhc2VkIGhlYXZpbHkgb24gYW4gb2xkIERPUyBjb21wdXRlciBnYW1lIGNhbGxlZCBcIlJvY2sgU3RhclwiLjwvcD4nO1xuICAgICAgICBhYm91dCArPSAnPHA+SSBoYWQgc28gbXVjaCBmdW4gcGxheWluZyB3aXRoIHRoZSBnYW1lIGluIHRoZSBlYXJseSA5MHMgdGhhdCBJIGRlY2lkZWQgdGhhdCBJIGRpZG5cXCd0IHdhbnQgdG8gYmUgd2l0aG91dCBpdCBhbnkgbW9yZS48L3A+JztcbiAgICAgICAgYWJvdXQgKz0gJzxwPlRoYW5rcyB0byB0aGUgZm9sa3MgaW4gY2hpemF0IGZvciB0aGUgZW5jb3VyYWdlbWVudCBhbmQgdGhlIGNyb3dkc291cmNpbmcgb2YgYXJ0aXN0cyBhbmQgdHJhY2sgdGl0bGVzLjwvcD4nO1xuICAgICAgICBhYm91dCArPSAnPHA+TXkgbmFtZSBpcyA8YSBocmVmPVwiaHR0cDovL3RhbmdlbnRpYWxjb2xkLmNvbVwiPkt1cnQgU2Nod2luZDwvYT4gYW5kIEkgYXBwcm92ZSB0aGlzIG1lc3NhZ2UuPC9wPic7XG5cblxuICAgICAgICBib290Ym94LmFsZXJ0KHtcbiAgICAgICAgICAgIHNpemU6ICdsYXJnZScsXG4gICAgICAgICAgICB0aXRsZTogJ0Fib3V0JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGFib3V0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlIb3dUb1BsYXkoKSB7XG4gICAgICAgIHZhciBtc2cgPSAnWW91IGFyZSBhIGJ1ZGRpbmcgUm9jayBuIFJvbGwgc3RhciEgIE5hdmlnYXRlIHlvdXIgbGlmZSBjaG9pY2VzIGFuZCBzZWUgaWYgZmFtZSBhbmQgZm9ydHVuZSBhd2FpdCEnO1xuXG4gICAgICAgIGJvb3Rib3guYWxlcnQoe1xuICAgICAgICAgICAgc2l6ZTogJ2xhcmdlJyxcbiAgICAgICAgICAgIHRpdGxlOiAnSG93IFRvIFBsYXknLFxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93U3BsYXNoOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgZGlzcGxheVNwbGFzaCgpO1xuICAgICAgICB9LFxuICAgICAgICBob3dUb1BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGlzcGxheUhvd1RvUGxheSgpO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgdmFyIGJhbmRuYW1lID0gXCJBYmp1cmVyIE5vd2hlcmVcIjtcbiAgICB2YXIgbWFzdGVyaWQgPSAwOyAvLyBKdXN0IGEgdW5pcXVlIGtleVxuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIC8vIHBlcnNvbmFsXG4gICAgdmFyIGhlYWx0aCA9IDA7XG4gICAgdmFyIGNyZWF0aXZpdHkgPSAwO1xuICAgIHZhciBoYXBwaW5lc3MgPSAwO1xuICAgIHZhciBhbGVydG5lc3MgPSAwO1xuXG4gICAgLy8gdGltZVxuICAgIHZhciBkYXljb3VudCA9IDE7XG4gICAgdmFyIGRvdyA9IFtcbiAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgXCJTYXR1cmRheVwiXG4gICAgXTtcblxuICAgIC8vIHBvcHVsYXJpdHlcbiAgICB2YXIgbG9jYWxwID0gMDtcbiAgICB2YXIgbmF0aW9uYWxwID0gMDtcbiAgICB2YXIgZ2xvYmFscCA9IDA7XG5cbiAgICB2YXIgZHJ1Z3MgPSB7XG4gICAgICAgIFwibHNkXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogMyxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMyxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiA1XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYWxjb2hvbFwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiA1LFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGl2aXR5XCI6IDIsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogNSxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAxMFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hcmlqdWFubmFcIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMyxcbiAgICAgICAgICAgICAgICBcImhlYWx0aFwiOiAzLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAzLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDcsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogMTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJoZXJpb25cIjoge1xuICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMCxcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhZGRpY3Rpb25cIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoZWFsdGhcIjogOSxcbiAgICAgICAgICAgICAgICBcImNyZWF0aXZpdHlcIjogMTAsXG4gICAgICAgICAgICAgICAgXCJoYXBwaW5lc3NcIjogMCxcbiAgICAgICAgICAgICAgICBcImFsZXJ0bmVzc1wiOiAxMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdmFyIHNpbmdsZXMgPSBbXTsgLy8gTGluZSBpdGVtcyBpbiBcbiAgICB2YXIgdG91cnMgPSBbXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBhZGRTaW5nbGUobmFtZSkge1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2lkJzogbWFzdGVyaWQrKyxcbiAgICAgICAgICAgICduYW1lJzogbmFtZSxcbiAgICAgICAgICAgICdscG9wJzogMCxcbiAgICAgICAgICAgICducG9wJzogMCxcbiAgICAgICAgICAgICdncG9wJzogMFxuICAgICAgICB9O1xuICAgICAgICBzaW5nbGVzLnB1c2gocmV0dmFsKTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBsb2NhbHAgPSBuYXRpb25hbHAgPSBnbG9iYWxwID0gMDtcbiAgICAgICAgaGFwcGluZXNzID0gYWxlcnRuZXNzID0gY3JlYXRpdml0eSA9IDUwO1xuICAgICAgICBoZWFsdGggPSA4MDtcbiAgICAgICAgZGF5Y291bnQgPSAxO1xuICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgICAgICBkcnVncy5sc2QuYWRkaWN0aW9uID0gMDtcbiAgICAgICAgZHJ1Z3MuYWxjb2hvbC5hZGRpY3Rpb24gPSAwO1xuICAgICAgICBkcnVncy5tYXJpanVhbm5hLmFkZGljdGlvbiA9IDA7XG4gICAgICAgIGRydWdzLmhlcmlvbi5hZGRpY3Rpb24gPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQZXJzb25hbCgpIHtcbiAgICAgICAgJChcIiNwbGF5ZXJfaGVhbHRoXCIpLmh0bWwoaGVhbHRoKTtcbiAgICAgICAgJChcIiNwbGF5ZXJfY3JlYXRpdml0eVwiKS5odG1sKGNyZWF0aXZpdHkpO1xuICAgICAgICAkKFwiI3BsYXllcl9oYXBwaW5lc3NcIikuaHRtbChoYXBwaW5lc3MpO1xuICAgICAgICAkKFwiI3BsYXllcl9hbGVydG5lc3NcIikuaHRtbChhbGVydG5lc3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQb3B1bGFyaXR5KCkge1xuICAgICAgICAkKFwiI2xvY2FsX3BvcFwiKS5odG1sKGxvY2FscCk7XG4gICAgICAgICQoXCIjbmF0aW9uYWxfcG9wXCIpLmh0bWwobmF0aW9uYWxwKTtcbiAgICAgICAgJChcIiNnbG9iYWxfcG9wXCIpLmh0bWwoZ2xvYmFscCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaE5hbWUoKSB7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKHJvdDEzKGJhbmRuYW1lKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmxhdm9yUG9wKHBvcCwgbG9jKSB7XG4gICAgICAgIHZhciByZXR2YWwgPSBcIlwiO1xuICAgICAgICBpZiAocG9wID4gODUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwid29yc2hpcHBlZCBhcyB0aGUgcm9jayBkaWV0eSB0aGF0IHlvdSBhcmUhXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDg2KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImtub3duIHRvIGV2ZW4gY2FzdWFsIGZhbnNcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgNjUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwiZ2V0dGluZyB5b3VyIG11c2ljIHBpcmF0ZWQgYnkgc2NvcmVzIG9mIHlvdXRoXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDQ1KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImdldHRpbmcgc29tZSBhaXItcGxheSBvbiByYWRpbyBzdGF0aW9ucy5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgMjUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwia25vd24gdG8gYSBmZXcgZGllLWhhcmQgZmFucy5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgMTYpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwidmlydHVhbGx5IHVua25vd24uXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dmFsID0gXCI8ZW0+QXQgdGhlIFwiICsgbG9jICsgXCIgbGV2ZWwgeW91IGFyZSBcIiArIHJldHZhbCArIFwiPC9lbT5cIjtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcblxuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXROYW1lOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGlmICgoc3RyID09IG51bGwpIHx8IChzdHIudHJpbSgpICE9PSBcIlwiKSkge1xuICAgICAgICAgICAgICAgIGJhbmRuYW1lID0gc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKGJhbmRuYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgIHJlZnJlc2hQb3B1bGFyaXR5KCk7XG4gICAgICAgICAgICByZWZyZXNoTmFtZSgpO1xuICAgICAgICB9LFxuICAgICAgICBkcnVnb2ZmZXI6IGZ1bmN0aW9uKGRydWduYW1lLCB0YWtlbikge1xuICAgICAgICAgICAgc3dpdGNoIChkcnVnbmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsc2RcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmxzZC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5sc2QuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5sc2QuYWRkaWN0aW9uICs9IGRydWdzLmxzZC5mYWN0b3JzLmFkZGljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5sc2QuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5sc2QuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLmxzZC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmxzZC5hZGRpY3Rpb24gLT0gKGRydWdzLmxzZC5mYWN0b3JzLmFkZGljdGlvbiAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWxjb2hvbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5hbGNvaG9sLmFkZGljdGlvbiArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmFsY29ob2wuYWRkaWN0aW9uIC09IChkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYXJpanVhbm5hXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLm1hcmlqdWFubmEuYWRkaWN0aW9uICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hZGRpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MubWFyaWp1YW5uYS5hZGRpY3Rpb24gLT0gKGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hZGRpY3Rpb24gLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhlcmlvblwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmhlcmlvbi5hZGRpY3Rpb24gKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MuaGVyaW9uLmFkZGljdGlvbiAtPSAoZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBkcnVnLHRha2VuIDogXCIgKyBkcnVnbmFtZSArIFwiICwgXCIgKyB0YWtlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXREcnVnczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJ1Z3M7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFBvcDogZnVuY3Rpb24ocG9wVHlwZSkge1xuICAgICAgICAgICAgdmFyIHJldHZhbCA9ICdObyBvbmUgY2FyZXMgYWJvdXQgeW91Lic7XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJsb2NhbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gZmxhdm9yUG9wKGxvY2FscCwgcG9wVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJuYXRpb25hbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gZmxhdm9yUG9wKG5hdGlvbmFscCwgcG9wVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJnbG9iYWxcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IGZsYXZvclBvcChnbG9iYWxwLCBwb3BUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGluY0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF5Y291bnQrKztcbiAgICAgICAgICAgIHZhciB3ayA9IE1hdGguZmxvb3IoKGRheWNvdW50IC8gNykgKyAxKSAlIDUyO1xuICAgICAgICAgICAgdmFyIHlyID0gTWF0aC5mbG9vcigoZGF5Y291bnQgLyAzNjUpICsgMSk7XG4gICAgICAgICAgICAkKFwiI3RpbWVfZG93XCIpLmh0bWwoZG93W2RheWNvdW50ICUgN10pO1xuICAgICAgICAgICAgJChcIiN0aW1lX3llYXJcIikuaHRtbCh5cik7XG4gICAgICAgICAgICAkKFwiI3RpbWVfd2Vla1wiKS5odG1sKHdrKTtcbiAgICAgICAgICAgIHJldHVybiBkYXljb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXF1aXJlcyBCb290Ym94LmpzXG4gICAgYm9vdGJveC5hZGRMb2NhbGUoXCJyb2NrXCIsIHtcbiAgICAgICAgT0s6ICdSb2NrJyxcbiAgICAgICAgQ0FOQ0VMOiAnQnVnZ2VyIE9mZicsXG4gICAgICAgIENPTkZJUk06ICdBbHJpZ2h0eSBUaGVuJ1xuICAgIH0pO1xuICAgIGJvb3Rib3guc2V0TG9jYWxlKFwicm9ja1wiKTtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuXG4gICAgZnVuY3Rpb24gZ2V0TmFtZShuYW1lRm4pIHtcbiAgICAgICAgdmFyIG1zZyA9IFwiTmFtZSB5b3VyIGJhbmQgOiBcIjtcblxuXG4gICAgICAgIGJvb3Rib3gucHJvbXB0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgIHRpdGxlOiBcIlJvY2sgbiBSb2xsIEZhbWUgQXdhaXQhXCIsXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICBzaXplOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBuYW1lRm5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJ1Z1JhbmdlKG4pIHtcbiAgICAgICAgdmFyIHJldFN0ciA9ICcnO1xuICAgICAgICBpZiAobiA+IDg1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPllvdSB3aWxsIGdsYWRseSBzaGl2IHlvdXIgb3duIG1vdGhlciBmb3Igc29tZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgODUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtd2FybmluZ1wiPllvdSBhcmUgYXQgb25lIHdpdGggJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDc1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LWluZm9cIj5GcmllbmRzIGFzc3VtZSB5b3VcXCdsbCBnbGFkbHkgdGFrZSBtb3JlICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCA1NSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1pbmZvXCI+WW91IGhhdmUgYSByZXB1dGF0aW9uIG9uIGluZHVsZ2luZyBvbiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgMzUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtc3VjY2Vzc1wiPllvdSBhcmUgdmVyeSBrZWVuIG9uICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCAyNSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1zdWNjZXNzXCI+WW91IGtpbmQgb2YgbGlrZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgMTUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtbXV0ZWRcIj5Zb3UgZG8gbm90IGhhdmUgbXVjaCBvZiBhbiBvcGluaW9uIG9uICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFN0cjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5RHJ1Z1ByZWZlcmVuY2VzKGQpIHtcbiAgICAgICAgdmFyIG1zZyA9ICcnO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQuYWxjb2hvbC5hZGRpY3Rpb24pICsgXCI8dT48Yj5hbGNvaG9sPC9iPjwvdT4uPC9wPlwiO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQubWFyaWp1YW5uYS5hZGRpY3Rpb24pICsgXCI8dT48Yj5tYXJpanVhbm5hPC9iPjwvdT4uPC9wPlwiO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQubHNkLmFkZGljdGlvbikgKyBcIjx1PjxiPmxzZDwvYj48L3U+LjwvcD5cIjtcbiAgICAgICAgbXNnICs9IGRydWdSYW5nZShkLmhlcmlvbi5hZGRpY3Rpb24pICsgXCI8dT48Yj5oZXJpb248L2I+PC91Pi48L3A+XCI7XG5cbiAgICAgICAgYm9vdGJveC5hbGVydCh7XG4gICAgICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgZ2V0TmFtZShmbik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRydWdQcmVmZXJlbmNlczogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgZGlzcGxheURydWdQcmVmZXJlbmNlcyhkKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gUmVxdWlyZXMgQm9vdGJveC5qc1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBkcnVnaWQgPSAwO1xuICAgIHZhciBkcnVncyA9IFtcbiAgICAgICAgJ2xzZCcsXG4gICAgICAgICdhbGNvaG9sJyxcbiAgICAgICAgJ21hcmlqdWFubmEnLFxuICAgICAgICAnaGVyaW9uJ1xuICAgIF07XG4gICAgdmFyIHB1c2hlcnMgPSBbXG4gICAgICAgICdiYXNzaXN0JyxcbiAgICAgICAgJ2RydW1tZXInLFxuICAgICAgICAnZ3VpdGFyaXN0JyxcbiAgICAgICAgJ2ZsYXQgbWF0ZScsXG4gICAgICAgICdtb3RoZXInLFxuICAgICAgICAnbGFuZGxvcmQnLFxuICAgICAgICAnaGFpciBkcmVzc2VyJyxcbiAgICAgICAgJ3BpenphIGRlbGl2ZXJ5IGRyaXZlcicsXG4gICAgICAgICdiYXJ0ZW5kZXInLFxuICAgICAgICAnZnJpZW5kIHRoZSBhc3BpcmluZyBcXFwiYWN0b3JcXFwiJ1xuICAgIF07XG4gICAgdmFyIGxvY2F0aW9ucyA9IFtcbiAgICAgICAgJ3RoZSBzdXBlcm1hcmtldCcsXG4gICAgICAgICd0aGUgcmF2ZScsXG4gICAgICAgICd0aGUgcm9tYW5jZSBzZWN0aW9uIGF0IHRoZSBsb2NhbCBsaWJyYXJ5JyxcbiAgICAgICAgJ3RoZSBhbGxleSBiZWhpbmQgdGhhdCB0YWNvIGJlbGwgeW91IHRlbGwgZXZlcnlvbmUgeW91XFwnZCBuZXZlciBlYXQgYXQnLFxuICAgICAgICAndGhlIGJvd2xpbmcgYWxsZXkgeW91IGdvIHRvIGlyb25pY2FsbHknLFxuICAgICAgICAndGhlIHRyYWluIHN0YXRpb24nLFxuICAgICAgICAndGhlIHJlc3QgYXJlYSB3aGVyZSB0aGV5IGNhdWdodCB0aGF0IG9uZSBkdWRlIGRvaW5nIHRoYXQgb25lIHRoaW5nJyxcbiAgICAgICAgJ3RoZSBiYXInLFxuICAgICAgICAndGhlIHBhcnR5JyxcbiAgICAgICAgJ3RoZSBCYXIgTWl0enZhaCBmb3IgdGhhdCBvbmUga2lkIG9mIHlvdXIgY291c2luXFwncyB0aGF0IHlvdSBvbmx5IHNlZScsXG4gICAgICAgICd0aGUgd2VkZGluZyBvZiB5b3VyIEV4J1xuICAgIF07XG5cblxuXG4gICAgZnVuY3Rpb24gbWFrZU9mZmVyKGRydWcsIGltcEluZCwgZHJ1Z0ZuLCBpbXBhaXJGbiwgbXV0ZXhGbikge1xuICAgICAgICB2YXIgbXNnID0gXCJZb3VyIFwiICsgcHVzaGVyc1tkcnVnaWQrKyAlIHB1c2hlcnMubGVuZ3RoXSArIFwiIG9mZmVycyB5b3Ugc29tZSBcIiArIGRydWcgKyBcIiBhdCBcIiArIGxvY2F0aW9uc1tkcnVnaWQgJSBsb2NhdGlvbnMubGVuZ3RoXSArIFwiLlwiO1xuICAgICAgICBpZiAoaW1wSW5kKSB7XG4gICAgICAgICAgICBtc2cgPSByb3QxMyhtc2cpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW1wYWlybWVudFRpY2tzKGRydWcpIHtcbiAgICAgICAgICAgIHZhciByZXR2YWwgPSAwO1xuICAgICAgICAgICAgaWYgKGRydWcgPT0gXCJsc2RcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IDY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJ1ZyA9PSBcImFsY29ob2xcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJ1ZyA9PSBcIm1hcmlqdWFubmFcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJ1ZyA9PSBcImhlcmlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gMTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgdmFyIHRha2VpdCA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlllcyBQbGVhc2VcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4tc3VjY2Vzc1wiLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRydWdGbihkcnVnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBtdXRleEZuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpbXBhaXJGbihpbXBhaXJtZW50VGlja3MoZHJ1ZykpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBkZW55aXQgPSB7XG4gICAgICAgICAgICBsYWJlbDogXCJHZXQgQmVudFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0bi1kYW5nZXJcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkcnVnRm4oZHJ1ZywgaW1wSW5kKTsgLy8gSWYgaW1wYWlyZWQsIHRoaXMgaXMgdHJ1ZSB0b28uICAgb29wcyEgOilcbiAgICAgICAgICAgICAgICBtdXRleEZuKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICAgICAgICB0aXRsZTogXCJEcnVncyFcIixcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpemU6ICdzbWFsbCcsXG4gICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpdmU6IHRha2VpdCxcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZTogZGVueWl0XG4gICAgICAgICAgICB9IC8vIGJ1dHRvbnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLyBSZXR1cm4gcHVibGljIGludGVyZmFjZVxuICAgIHJldHVybiB7XG4gICAgICAgIGRydWdOYW1lOiBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJ1Z3NbKGkgJSBkcnVncy5sZW5ndGgpXTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmZXI6IGZ1bmN0aW9uKGRydWcsIGltcCwgZHJ1Z0ZuLCBpbXBhaXJGbiwgbXV0ZXhGbikge1xuICAgICAgICAgICAgbWFrZU9mZmVyKGRydWcsIGltcCwgZHJ1Z0ZuLCBpbXBhaXJGbiwgbXV0ZXhGbik7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1c2hlcnMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgbG9jYXRpb25zLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgdmFyIGltcGFpcmVkID0gMDsgLy8gIFVzaW5nIGEgY291bnRlciBpbnN0ZWFkIG9mIGEgc3RyaWN0IGJvb2xlYW4uXG4gICAgdmFyIGV2ZW50T3BlbiA9IGZhbHNlO1xuICAgIHZhciBCYW5kID0gcmVxdWlyZSgnLi9CYW5kLmpzJykoKTtcbiAgICB2YXIgV0dPID0gcmVxdWlyZSgnLi9XR08uanMnKSgpO1xuICAgIHZhciBHcmFwZXZpbmUgPSByZXF1aXJlKCcuL0dyYXBldmluZS5qcycpKCk7XG4gICAgdmFyIERydWdQcm9tcHQgPSByZXF1aXJlKCcuL0RydWdQcm9tcHQuanMnKSgpO1xuICAgIHZhciBCYW5kUHJvbXB0ID0gcmVxdWlyZSgnLi9CYW5kUHJvbXB0LmpzJykoKTtcbiAgICB2YXIgQWJvdXQgPSByZXF1aXJlKCcuL0Fib3V0LmpzJykoKTtcblxuICAgIHZhciBpbXBhaXJsID0gZnVuY3Rpb24oYikge1xuICAgICAgICBXR08uaW1wYWlyKCEhYik7XG4gICAgICAgIFdHTy5yZWZyZXNoKCk7XG4gICAgICAgIEdyYXBldmluZS5pbXBhaXIoISFiKTtcbiAgICAgICAgR3JhcGV2aW5lLnJlZnJlc2goKTtcbiAgICAgICAgQmFuZC5pbXBhaXIoISFiKTtcbiAgICAgICAgQmFuZC5yZWZyZXNoKCk7XG4gICAgICAgIHJldHVybiBpbXBhaXJlZDtcbiAgICB9O1xuXG4gICAgdmFyIGltcGFpckFkZCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgaW1wYWlyZWQgKz0geDtcbiAgICAgICAgV0dPLmFkZEl0ZW0oXCJEcnVncyBjYW4gYWx0ZXIgeW91ciBzZW5zZSBvZiBwZXJjZXB0aW9uLlwiKVxuICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICByZXR1cm4gaW1wYWlyZWQ7XG4gICAgfTtcblxuICAgIHZhciByZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEJhbmQuY2xlYXIoKTtcbiAgICAgICAgV0dPLmNsZWFyKCk7XG4gICAgICAgIEdyYXBldmluZS5jbGVhcigpO1xuXG4gICAgICAgIC8qIE9ubHkgYmluZCB0aGVzZSBldmVudHMgb24gZmlyc3QgcGFzcyAqL1xuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAkKFwiI3RpdGxlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmQuaW5jRGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2Fib3V0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEFib3V0LnNob3dTcGxhc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNuZXdfZ2FtZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgQmFuZFByb21wdC5uYW1lKEJhbmQuc2V0TmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjdG91cnNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgR3JhcGV2aW5lLm90aGVyU29uZygpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjY2hhcnRzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5hZGRJdGVtKFwiWW91IGFyZSBvbiB0aGUgY2hhcnRzXCIpO1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjaG93X3RvX3BsYXlcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgQWJvdXQuaG93VG9QbGF5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjcmVsZWFzZXNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgV0dPLmFkZEl0ZW0oXCJSZWxlYXNlcyBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2RydWdzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEJhbmRQcm9tcHQuZHJ1Z1ByZWZlcmVuY2VzKEJhbmQuZ2V0RHJ1Z3MoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzaG93UG9wdWxhcml0eSgpIHtcbiAgICAgICAgV0dPLmFkZEl0ZW0oQmFuZC5nZXRQb3AoXCJsb2NhbFwiKSk7XG4gICAgICAgIFdHTy5hZGRJdGVtKEJhbmQuZ2V0UG9wKFwibmF0aW9uYWxcIikpO1xuICAgICAgICBXR08uYWRkSXRlbShCYW5kLmdldFBvcChcImdsb2JhbFwiKSk7XG4gICAgICAgIFdHTy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RXZlbnQoYikge1xuICAgICAgICBldmVudE9wZW4gPSAhIWI7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBpbmNEYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZXZlbnRPcGVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKGltcGFpcmVkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpbXBhaXJlZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBpbXBhaXJsKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGltcGFpcmVkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaW1wYWlybChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB4ID0gQmFuZC5pbmNEYXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCh4ICUgMzApID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1BvcHVsYXJpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh4ICUgMTEpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXZlbnQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIFdHTy5hZGRJdGVtKFwiWW91IGhhdmUgYmVlbiBvZmZlcmVkIGRydWdzLlwiKVxuICAgICAgICAgICAgICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICBEcnVnUHJvbXB0Lm9mZmVyKERydWdQcm9tcHQuZHJ1Z05hbWUoeCksIGltcGFpcmVkLCBCYW5kLmRydWdvZmZlciwgaW1wYWlyQWRkLCBzZXRFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoeCAlIDMpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgR3JhcGV2aW5lLm90aGVyU29uZygpO1xuICAgICAgICAgICAgICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8gaWYgIWV2ZW50T3BlblxuICAgICAgICB9LFxuICAgICAgICB3aGF0ZXZlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdGFydCgpO1xuICAgICAgICB9LFxuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBhaXJsKGIpO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG4gICAgdmFyIG1heGl0ZW1zID0gMTI7XG4gICAgdmFyIG1hc3RlcmNvdW50ID0gMDtcbiAgICB2YXIgaXRlbXMgPSBbXTsgLy8gTGluZSBpdGVtcyBpbiBcbiAgICB2YXIgcmFuZG9tID0gcmVxdWlyZSgnLi9yYW5kb20uanMnKTtcbiAgICB2YXIgcm90MTMgPSByZXF1aXJlKCcuL3JvdDEzLmpzJyk7XG5cbiAgICB2YXIgY2xhc3N0eXBlcyA9IFtcbiAgICAgICAgXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIixcbiAgICAgICAgXCJ0ZXh0LWRhbmdlclwiLFxuICAgICAgICBcInRleHQtc3VjY2Vzc1wiLFxuICAgICAgICBcInRleHQtaW5mb1wiXG4gICAgXTtcblxuXG4gICAgdmFyIGFydGlzdHMgPSBbXG4gICAgICAgIFwiVGhlIEJpbmcgQmFuZ3NcIixcbiAgICAgICAgXCJNb2Rlcm4gU2hvZVwiLFxuICAgICAgICBcIlRlYW0gR29yZG9uXCIsXG4gICAgICAgIFwiQ29yeSBEb2N0b3Jvd1wiLFxuICAgICAgICBcIkt1cnQgKG5vdCB0aGF0IG9uZSB0aGUgb3RoZXIgb25lKVwiLFxuICAgICAgICBcIk15IFVuZGVyd2VhclwiLFxuICAgICAgICBcIkludGVybmFsIElzc3Vlc1wiLFxuICAgICAgICBcIkNhdCBWaWRlbyBDbHViXCIsXG4gICAgICAgIFwiTmF2aSBpcyBteSBTcGlyaXQgR3VpZGVcIixcbiAgICAgICAgXCJCbHVlIENoaWNrZW4gTnVnZ2V0XCIsXG4gICAgICAgIFwiWWFybiBQb3Jub2dyYXBoeVwiLFxuICAgICAgICBcIjYgY3lsaW5kZXIgTWFrZXVwXCIsXG4gICAgICAgIFwiVGhlIEJ1cmxhcCBQZWFudXRcIixcbiAgICAgICAgXCJUZXF1aWxhIE1vY2tpbmdiaXJkXCIsXG4gICAgICAgIFwiQW5hcmtleSBpbiB0aGUgTGlicmFyeVwiLFxuICAgICAgICBcIkJyb3RoZXIgVHNob2JlclwiLFxuICAgICAgICBcIkZydW1weSBCcmVhc3QgQW5kIFRoZSBTaGFja1wiLFxuICAgICAgICBcIkNoaWVmIFByZXNpZGVudFwiLFxuICAgICAgICBcIlR3aW4gU3RyYW5nZXJcIixcbiAgICAgICAgXCJEb3VidCBPZiBQYXJhZGlzZVwiLFxuICAgICAgICBcIk1hc3NpdmUgTG9naXN0aWNcIixcbiAgICAgICAgXCJSZXB1YmxpY2FuIEZ1cnJ5XCIsXG4gICAgICAgIFwiR2FsYXh5IE9mIFRoZSBJbnRpbWF0ZSBXYWxrXCIsXG4gICAgICAgIFwiRGVsZWN0YWJsZSBJZ25pdGVcIixcbiAgICAgICAgXCJWZXJ0aWdvIE9mIFRoZSBPYmplY3RcIixcbiAgICAgICAgXCJDYXV0aW9uIEFybWFkYVwiLFxuICAgICAgICBcIlN0eXJvIEFic2VuY2VcIixcbiAgICAgICAgXCJBZnRlciBCdXNoXCIsXG4gICAgICAgIFwiWXVrb24gU3VjY2Vzc1wiLFxuICAgICAgICBcIkJ1dHQtdWdseSBQYXBlclwiLFxuICAgICAgICBcIkVudGl0bGVkIE9kZHMgT2YgVGhlIFNsaW5nIExpY2tcIixcbiAgICAgICAgXCJQaW5rIE1pc3RcIixcbiAgICAgICAgXCJCdXR0IFNlcmlvdXNseVwiLFxuICAgICAgICBcIlRoZSBEaXNyYSBNaXN0eSBCYW5kXCIsXG4gICAgICAgIFwiRGl4aWUgJiB0aGUgTmluamFzXCIsXG4gICAgICAgIFwiWWV0IEFub3RoZXIgTWFzcyBFeHRpbmN0aW9uIEV2ZW50XCIsXG4gICAgICAgIFwiVGhlIFBvd2VyIENob3JkIEhvdHNob3RzXCIsXG4gICAgICAgIFwiRG9ubmVyIERpbm5lciBQYXJ0eVwiLFxuICAgICAgICBcIlRlZW4gQW5nc3RcIixcbiAgICAgICAgXCJBZ2dyZXNzaXZlIFBhY2lmaXNtXCIsXG4gICAgICAgIFwiTXkgQ2hlbWljYWwgQnJvbWFuY2VcIixcbiAgICAgICAgXCJUaGUgTmlja2xlYmFjayBUcmlidXRlIEJhbmRcIixcbiAgICAgICAgXCJIYW1idXJnZXIgRXZhbmdlbGlzbVwiXG4gICAgXTtcblxuICAgIHZhciBzb25ndGl0bGVzID0gW1xuICAgICAgICBcIlRoaXMgaXMgYSBUdW5lXCIsXG4gICAgICAgIFwiWW9kZWxzIG1ha2UgbWUgaGFwcHlcIixcbiAgICAgICAgXCJJdCdzIGEgd2lsbCByb2xsIGRhbW1pdFwiLFxuICAgICAgICBcIkkgbGlrZSBwb3Bjb3JuXCIsXG4gICAgICAgIFwiTXkgRWxlY3RyaWNpYW4gTWFkZSBtZSBTYWRcIixcbiAgICAgICAgXCJSTkcgaW4gSGVhcnRoc3RvbmUgRlRXXCIsXG4gICAgICAgIFwiTXkgdGhpcmQgYmVsbHkgYnV0dG9uXCIsXG4gICAgICAgIFwiV2F0Y2hpbmcgWW91VHViZSBhdCBXb3JrXCIsXG4gICAgICAgIFwiVGhlIFRyaWZvcmNlIGlzIHBvaW50eVwiLFxuICAgICAgICBcIlRoZXkgZ3JvdyBmcm9tIHNwZWxsc1wiLFxuICAgICAgICBcIkkgcGxheWVkIGEgbWFnZSBhbmQgSSBsaWtlZCBpdFwiLFxuICAgICAgICBcIkkgc3RpbGwgcGxheSBvbGQgZ2FtZXNcIixcbiAgICAgICAgXCJKYXZhIGFpbnQgamF2YXNjcmlwdFwiLFxuICAgICAgICBcIjUwIHJlYXNvbnMgd2h5IEphdmEgaXMgYSBmYWRcIixcbiAgICAgICAgXCJUaGUgYmVzdCBwYXJ0IG9mIG1lIGlzIGxlZnQgaGFuZGVkXCIsXG4gICAgICAgIFwiSXQgdGFrZXMgYSBmZXcgeWVhcnMgdG8gbGlzdGVuIHRvIG15IHBsYXlsaXN0XCIsXG4gICAgICAgIFwiVGFuZ2VudGlhbCBDb2xkXCIsXG4gICAgICAgIFwiVGhyb3dpbmcgYSBxdWFydGVyIGFuZCB3aXNoaW5nIHlvdSB3ZWxsXCIsXG4gICAgICAgIFwiTXkgZ29vZ2xlIGNhbGVuZGFyIGlzIHJpZGljdWxvdXNcIixcbiAgICAgICAgXCJSZW1lbWJlciB3aGVuIHBlb3BsZSBsaW5lZCB1cCB0byBidXkgV2luZG93cyA5NT8gIENyYXp5IVwiLFxuICAgICAgICBcIlJpY2hhcmQgU3RhbGxtYW4gd2FzIG15IGJhYnlzaXR0ZXJcIixcbiAgICAgICAgXCJMb29raW5nIHRvIFRyYWluP1wiLFxuICAgICAgICBcIllvdSBkbyBub3QgaGF2ZSB0aGUgcHJvcGVyIHN0b25lXCIsXG4gICAgICAgIFwiSSBhbSBub3QgcmVhZHlcIixcbiAgICAgICAgXCJCdWdneSB2aWRlbyBnYW1lcy4gIFdoYXQncyB1cCB3aXRoIHRoYXQ/XCIsXG4gICAgICAgIFwiSXMgQ2FsbCBvZiBEdXR5IHN0aWxsIGEgdGhpbmc/XCIsXG4gICAgICAgIFwiSSBoYXZlIGEgbWlsbGlvbiBiYWxscyBhbmQgSSBhbSB0aGUgc2l6ZSBvZiBhIHBlYW51dFwiLFxuICAgICAgICBcIkJlY2F1c2UgeW91IGtub3cgdGhlIGJhYnlcIixcbiAgICAgICAgXCJDb3VydHNoaXAgSXMgRXZlcnl0aGluZ1wiLFxuICAgICAgICBcIkNhbid0IFN0b3AgVGhlIEZpcmVjcmFja2VyXCIsXG4gICAgICAgIFwiSG9seSBEZW1vY3JhY3lcIixcbiAgICAgICAgXCJGcmllbmRzIFdpdGggU3luY2hyb25pc2F0aW9uXCIsXG4gICAgICAgIFwiUmF3IFN0YXNoXCIsXG4gICAgICAgIFwiU3VwZXJuYXR1cmFsIFRpbWVcIixcbiAgICAgICAgXCJEb24ndCBTdG9wIFRoZSBEZXZpbFwiLFxuICAgICAgICBcIkhlbGx1dmEgU2hvcHBpbmdcIixcbiAgICAgICAgXCJUaGUgQWxsIEFtZXJpY2FuIEdpcmxcIixcbiAgICAgICAgXCJDbGFzc2ljIEd1aXRhclwiLFxuICAgICAgICBcIk91dHJhZ2VvdXMgQXhlXCIsXG4gICAgICAgIFwiVW5jb250cm9sbGFibGUgQ3JpbWluYWxcIixcbiAgICAgICAgXCJIb3RzaG90IFJhaW5ib3dcIixcbiAgICAgICAgXCJWbGFkaW1pciBQdXRpbiBpcyBhIEdvZFwiLFxuICAgICAgICBcIkNyeWluZyBKYXBhbmVzZSBQb2xpdGljaWFuXCJcbiAgICBdO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUob2JqKSB7XG4gICAgICAgIHZhciByZXR2YWw7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgc3dpdGNoIChyYW5kb20oNCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0cikge1xuICAgICAgICBtYXN0ZXJjb3VudCsrO1xuICAgICAgICB2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2NsYXNzdHlwZSc6IGN0LFxuICAgICAgICAgICAgJ3N0cic6IHN0clxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICB9LFxuICAgICAgICBvdGhlclNvbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGFydGlzdF9pbmRleCA9IG1hc3RlcmNvdW50ICUgYXJ0aXN0cy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgc29uZ19pbmRleCA9IG1hc3RlcmNvdW50ICUgc29uZ3RpdGxlcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgcmVsZWFzZV9ub3RpY2UgPSBcIk5ldyBzaW5nbGUgcmVsZWFzZWQgYnkgJ1wiICsgYXJ0aXN0c1thcnRpc3RfaW5kZXhdICsgXCInIGNhbGxlZCAnXCIgKyBzb25ndGl0bGVzW3NvbmdfaW5kZXhdICsgXCInXCI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRJdGVtKHJlbGVhc2Vfbm90aWNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0oc3RyKSk7XG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGh0bWxzdHIgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWxzdHIgPSBodG1sc3RyLmNvbmNhdChmb3JtYXRMaW5lKGl0ZW1zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI3NzZ2xvYmFsXCIpLmh0bWwoaHRtbHN0cik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGFydGlzdHMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgc29uZ3RpdGxlcy5zaHVmZmxlKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgdmFyIGltcGFpcmVkID0gZmFsc2U7XG4gICAgdmFyIG1heGl0ZW1zID0gMTI7XG4gICAgdmFyIG1hc3RlcmNvdW50ID0gMDtcbiAgICB2YXIgaXRlbXMgPSBbXTsgLy8gTGluZSBpdGVtcyBpbiBcbiAgICB2YXIgcmFuZG9tID0gcmVxdWlyZSgnLi9yYW5kb20uanMnKTtcbiAgICB2YXIgcm90MTMgPSByZXF1aXJlKCcuL3JvdDEzLmpzJyk7XG5cbiAgICB2YXIgY2xhc3N0eXBlcyA9IFtcbiAgICAgICAgXCJ0ZXh0LW11dGVkXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIixcbiAgICAgICAgXCJ0ZXh0LWRhbmdlclwiLFxuICAgICAgICBcInRleHQtc3VjY2Vzc1wiLFxuICAgICAgICBcInRleHQtaW5mb1wiXG4gICAgXTtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFNvbWUgcHJpdmF0ZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgJ3RydWUnIGlmIHRoZSBjYXNlIHdhcyBub3Qgc29sdmFibGUgXG4gICAgZnVuY3Rpb24gZm9ybWF0TGluZShvYmopIHtcbiAgICAgICAgdmFyIHJldHZhbDtcbiAgICAgICAgaWYgKGltcGFpcmVkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHJhbmRvbSg0KSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCIgbGVhZFxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48bWFyaz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L21hcms+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48ZGVsPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvZGVsPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PHM+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9zPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIG9iai5zdHIgKyBcIjwvcD5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0oc3RyKSB7XG4gICAgICAgIG1hc3RlcmNvdW50Kys7XG4gICAgICAgIHZhciBjdCA9IGNsYXNzdHlwZXNbbWFzdGVyY291bnQgJSBjbGFzc3R5cGVzLmxlbmd0aF07XG4gICAgICAgIHZhciByZXR2YWwgPSB7XG4gICAgICAgICAgICAnY2xhc3N0eXBlJzogY3QsXG4gICAgICAgICAgICAnc3RyJzogc3RyXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goY3JlYXRlSXRlbShzdHIpKTtcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiBtYXhpdGVtcykge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaHRtbHN0ciA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaHRtbHN0ciA9IGh0bWxzdHIuY29uY2F0KGZvcm1hdExpbmUoaXRlbXNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjc3Nsb2NhbFwiKS5odG1sKGh0bWxzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxzdHI7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTsgLy8gZW5kIHJldHVybiBvZiBwdWJsaWMgb2JqZWN0XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGFyZ2V0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bQS1aYS16XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIi5jaGFyQXQoXG4gICAgICAgICAgICBcIk5PUFFSU1RVVldYWVpBQkNERUZHSElKS0xNbm9wcXJzdHV2d3h5emFiY2RlZmdoaWprbG1cIi5pbmRleE9mKGMpXG4gICAgICAgICk7XG4gICAgfSk7XG59O1xuIiwiLy8gc3RvbmVzdW4uanNcbnZhciBHYW1lTWFuYWdlciA9IHJlcXVpcmUoJy4vR2FtZU1hbmFnZXIuanMnKSgpO1xuXG52YXIgcGFzc3RpbWUgPSBmdW5jdGlvbigpIHtcbiAgICBHYW1lTWFuYWdlci5pbmNEYXRlKCk7XG4gICAgc2V0VGltZW91dChwYXNzdGltZSwgMzAwMCk7XG59XG5cbi8vIEFkZCBzaHVmZmxlIGZ1bmN0aW9uIHRvIGFsbCBhcnJheSBvYmplY3RzXG5BcnJheS5wcm90b3R5cGUuc2h1ZmZsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIHJuZCwgdG1wLCBpID0gdGhpcy5sZW5ndGg7IGk7IHJuZCA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiBpKSwgdG1wID0gdGhpc1stLWldLCB0aGlzW2ldID0gdGhpc1tybmRdLCB0aGlzW3JuZF0gPSB0bXApO1xufTtcblxuXG4vKiBEZWZpbmUgYSAnY29uc29sZScgb2JqZWN0IGZvciBJRSAqL1xuaWYgKHR5cGVvZiBjb25zb2xlICE9PSAnb2JqZWN0Jykge1xuICAgIGNvbnNvbGUgPSB7XG4gICAgICAgIGxvZzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZGVidWc6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGluZm86IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHdhcm46IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBhc3NlcnQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkaXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRpcnhtbDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgdHJhY2U6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdyb3VwOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBncm91cENvbGxhcHNlZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZ3JvdXBFbmQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHRpbWU6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHRpbWVFbmQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHByb2ZpbGU6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHByb2ZpbGVFbmQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGNvdW50OiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBleGNlcHRpb246IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHRhYmxlOiBmdW5jdGlvbigpIHt9XG4gICAgfTtcbn1cblxuJCh3aW5kb3cpLmxvYWQoR2FtZU1hbmFnZXIuaW5pdCk7XG5zZXRUaW1lb3V0KHBhc3N0aW1lLCAzMDAwKTtcbiJdfQ==
