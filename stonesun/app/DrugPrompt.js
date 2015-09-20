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
        drugName: function(i) {
            return drugs[(i % drugs.length)];
        },
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
