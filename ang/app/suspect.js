// Singleton 'Suspect'
// Image paths should be relative to index.html location
Suspect = function() {
    var suspects = [
                    { 
                        id         : 0,
                        name       : 'Kurt Schwind',
                        alibi      : 'I was with David Atchley, Jon Bishop, Dan Salmo and Jim Relling',
                        questions  : [],
                        occupation : 'Software Engineer',
                        bio        : 'Works as a software engineer for a large soulless corporation.<br/>When not dutifully obeying his corporate overlords, he writes online adaptations of games he played as a child. ',
                        image      : 'images/kurt_schwind.png',
                        handness   : 'right'
                    },
                    { 
                        id         : 1,
                        alibi      : '',
                        name       : 'Lenny Little',
                        questions  : [1,2,9,13,14],
                        occupation : 'Bartender',
                        bio        : 'Married to Ivy Little (11)',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 2,
                        alibi      : '',
                        name       : 'Al Farook',
                        questions  : [2,3,9,13,14],
                        occupation : 'Web Developer',
                        bio        : 'Determinedly Single',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 3,
                        alibi      : '',
                        name       : 'Pepe Perez',
                        questions  : [3,4,5,13,14],
                        occupation : 'Flamenco Dancer',
                        bio        : 'Married to Piper Perez (13)',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 4,
                        alibi      : '',
                        name       : 'Tony Racheti',
                        questions  : [4,5,9,13,14],
                        occupation : 'Promoter',
                        bio        : 'Married to Dina Racheti (14)',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 5,
                        alibi      : '',
                        name       : 'Mickey O\'Malley',
                        questions  : [1,4,9,13,14],
                        occupation : 'Retired Cop',
                        bio        : 'Single',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 6,
                        alibi      : '',
                        name       : 'Max Fineflugle',
                        questions  : [5,6,12,13,14],
                        occupation : 'Producer',
                        bio        : 'Married to Joan Fineflugle (16)',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 7,
                        alibi      : '',
                        name       : 'Ripp Rapp',
                        questions  : [2,5,12,13,14],
                        occupation : 'Baker',
                        bio        : 'Engaged',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 8,
                        alibi      : '',
                        name       : 'Buster Bailey',
                        questions  : [3,5,12,13,14],
                        occupation : 'Basketball Player',
                        bio        : 'Single',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 9,
                        alibi      : '',
                        name       : 'Rocky Roll',
                        questions  : [1,5,12,13,14],
                        occupation : 'Musician',
                        bio        : 'Married to Candy Roll (19)',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 10,
                        alibi      : '',
                        name       : 'Frank Ling',
                        questions  : [7,8,12,13,14],
                        occupation : 'Executive Chef',
                        bio        : 'Married to Samantha Ling (20)',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 11,
                        alibi      : '',
                        name       : 'Ivy Little',
                        questions  : [6,7,11,13,14],
                        occupation : 'Landlady',
                        bio        : 'Married to Lenny Little (1)',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 12,
                        alibi      : '',
                        name       : 'Lucy Tumble',
                        questions  : [2,6,11,13,14],
                        occupation : 'Engineer',
                        bio        : 'Single',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 13,
                        alibi      : '',
                        name       : 'Piper Perez',
                        questions  : [3,7,11,13,14],
                        occupation : 'Latin Singer',
                        bio        : 'Married to Pepe Perez (3)',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 14,
                        alibi      : '',
                        name       : 'Dina Racheti',
                        questions  : [1,6,11,13,14],
                        occupation : 'Doctor',
                        bio        : 'Married to Tony Racheti (4)',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 15,
                        alibi      : '',
                        name       : 'Eileen Stellar',
                        questions  : [4,7,11,13,14],
                        occupation : 'Actress',
                        bio        : 'Single',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 16,
                        alibi      : '',
                        name       : 'Joan Fineflugle',
                        questions  : [6,8,10,13,14],
                        occupation : 'Accountant',
                        bio        : 'Married to Max Fineflugle (6)',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 17,
                        alibi      : '',
                        name       : 'Rose Field',
                        questions  : [2,7,10,13,14],
                        occupation : 'Sportscaster',
                        bio        : 'Unattached',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 18,
                        alibi      : '',
                        name       : 'Doris Dill',
                        questions  : [1,8,10,13,14],
                        occupation : 'Delivery Driver',
                        bio        : 'Not Looking',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 19,
                        alibi      : '',
                        name       : 'Candy Roll',
                        questions  : [3,8,10,13,14],
                        occupation : 'Musician',
                        bio        : 'Married to Rocky Roll (9)',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 20,
                        alibi      : '',
                        name       : 'Samantha Ling',
                        questions  : [4,8,10,13,14],
                        occupation : 'Restaurant Owner',
                        bio        : 'Married to Frank Ling (10)',
                        image      : 'images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 21,
                        alibi      : '',
                        name       : 'Kurt Schwind',
                        questions  : [0],
                        occupation : 'Software Engineer',
                        bio        : 'When not dutifully obeying his corporate overlords, he writes online adaptations of games he played as a child. ',
                        image      : 'images/kurt_schwind.png',
                        handness   : 'right'
                    },
                    { 
                        id         : 22,
                        alibi      : '',
                        name       : 'Jon Bishop',
                        questions  : [0],
                        occupation : 'Software Engineer',
                        bio        : 'Jon Bishop Bio',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'right'
                    },
                    { 
                        id         : 23,
                        alibi      : '',
                        name       : 'Dan Salmo',
                        questions  : [0],
                        occupation : 'Bass Player',
                        bio        : 'Dan Salmo Bio ',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'right'
                    },
                    { 
                        id         : 24,
                        alibi      : '',
                        name       : 'David Atchley',
                        questions  : [0],
                        occupation : 'Graphic Artist',
                        bio        : 'I art graphics',
                        image      : 'images/male_silhouette_x.png',
                        handness   : 'right'
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
        if (id > 24) {
            return 0;
        }
        return id;
    }

    function initialize() {
        for (index=1;index<21;index++) {
            suspect[index].alibi = '';
        }
    }



    // Return public interface
    return {
        /*  
        getSuspectArray takes a gender of "males", "females" or anything else 
        and returns the relevant slice of the suspect array.  If not male or 
        female then it returns all GAME suspects 
        */
        getSuspectArray: function(gender) {
            /* List of male game suspects   */
            var males       = males       ||  suspects.slice(1,11);  
            /* List of female game suspects */
            var females     = females     || suspects.slice(11,21); 
            /* List of all game suspects    */
            var allsuspects = allsuspects || suspects.slice(1,20);  
            var retval;
            if (gender === "males") {
                return males;
            } else if (gender === "females") {
                return females;
            } else {
                return allsuspects;
            }
            return retval;
        },
        getName: function(id) {
            return suspects[safeID(id)].name;
        },
        getQuestions: function (id) {
            return suspects[safeID(id)].questions;
        },
        getOccupation: function(id) {
            return suspects[safeID(id)].occupation;
        },
        getBio: function(id) {
            return suspects[safeID(id)].bio;
        },
        getHandness: function(id) {
            return suspects[safeID(id)].handness;
        },
        getImage: function(id) {
            return suspects[safeID(id)].image;
        },
        reset: function() {
            initialize();
        },
        getAlibi: function(id) {
            return suspects[safeID(id)].alibi;
        },
        setAlibi: function(id,a) {
            suspects[safeID(id)].alibi = a;
            return suspects[safeID(id)].alibi;
        }
    } // end return of public object

}();
