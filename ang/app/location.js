// Singleton 'Location'
// Image paths should be relative to index.html location
Location = function() {
    var locations = [
                    { 
                        id         : 0,
                        name       : 'Art Show',
                        image      : 'images/location.png',
                    },
                    { 
                        id         : 1,
                        name       : 'Ball Game',
                        image      : 'images/location.png',
                    },
                    { 
                        id         : 2,
                        name       : 'Card Game',
                        image      : 'images/location.png',
                    },
                    { 
                        id         : 3,
                        name       : 'Docks',
                        image      : 'images/location.png',
                    },
                    { 
                        id         : 4,
                        name       : 'Embassy',
                        image      : 'images/location.png',
                    },
                    { 
                        id         : 5,
                        name       : 'Factory',
                        image      : 'images/location.png',
                    }
                    ];

    // ---------------------- Some private methods ----------------------------------
    // safeID provides safe array bounds checking.
    function safeID(id) {
        if (typeof id === 'undefined') {
            return 0;
        } 
        if (id < 0) {
            return 0;
        }
        if (id > 5) {
            return 0;
        }
        return id;
    }



    // Return public interface
    return {
        /*  
        getSuspectArray takes a gender of "males", "females" or anything else 
        and returns the relevant slice of the suspect array.  If not male or 
        female then it returns all GAME suspects 
        */
        getLocations: function() {
            return locations;
        },
        getName: function(id) {
            return locations[safeID(id)].name;
        },
        getImage: function(id) {
            return suspects[safeID(id)].image;
        }
    } // end return of public object

}();
