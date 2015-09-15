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
