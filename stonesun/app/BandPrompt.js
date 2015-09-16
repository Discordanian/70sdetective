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

    function recordSingle() {
        return true;
    }

    function promptTour() {
        return true;
    }


    // Return public interface
    return {
        name: function(fn) {
            getName(fn);
        },
        tour: function() {
            return promptTour();
        },
        recordSingle: function() {
            return recordSingle();
        },
        clear: function() {
            return true;
        }
    }; // end return of public object

};
