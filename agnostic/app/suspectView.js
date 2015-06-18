// SuspectView
var SuspectView = function(num) {

    function safeID(id) {
        if (typeof id === 'undefined') {
            return 0;
        }
        if (id > 0 && id < suspects.length) {
            return id;
        }
        return 0;
    }


    // Return public interface
    return {
        interrogate: function(id) {
	    // Make suspect card visible
            return true;
        },
        kill: function(id) {
            return true;
        },
        reset: function() {
            return true;
        }
    }; // end return of public object

};
