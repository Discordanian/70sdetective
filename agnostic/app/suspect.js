var Suspect = function() {
    var suspects = [
                    { 
                        id         : 0,
                        name       : 'Kurt Schwind',
                        questions  : [],
                        occupation : 'Software Engineer',
                        bio        : 'Works as a software engineer for a large soulless corporation.<br/>When not dutifully obeying his corporate overlords, he writes online adaptations of games he played as a child. ',
                        image      : 'resources/images/kurt_schwind.png',
                        handness   : 'right'
                    },
                    { 
                        id         : 1,
                        name       : 'Lenny Little',
                        questions  : [1,2,9,13,14],
                        occupation : 'Bartender',
                        bio        : 'Married to Ivy Little (11)',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 2,
                        name       : 'Al Farook',
                        questions  : [2,3,9,13,14],
                        occupation : 'Web Developer',
                        bio        : 'Determinedly Single',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 3,
                        name       : 'Pepe Perez',
                        questions  : [3,4,5,13,14],
                        occupation : 'Flamenco Dancer',
                        bio        : 'Married to Piper Perez (13)',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 4,
                        name       : 'Tony Racheti',
                        questions  : [4,5,9,13,14],
                        occupation : 'Promoter',
                        bio        : 'Married to Dina Racheti (14)',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 5,
                        name       : 'Mickey O\'Malley',
                        questions  : [1,4,9,13,14],
                        occupation : 'Retired Cop',
                        bio        : 'Single',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 6,
                        name       : 'Max Fineflugle',
                        questions  : [5,6,12,13,14],
                        occupation : 'Producer',
                        bio        : 'Married to Joan Fineflugle (16)',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 7,
                        name       : 'Ripp Rapp',
                        questions  : [2,5,12,13,14],
                        occupation : 'Baker',
                        bio        : 'Engaged',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 8,
                        name       : 'Buster Bailey',
                        questions  : [3,5,12,13,14],
                        occupation : 'Basketball Player',
                        bio        : 'Single',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 9,
                        name       : 'Rocky Roll',
                        questions  : [1,5,12,13,14],
                        occupation : 'Musician',
                        bio        : 'Married to Candy Roll (19)',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 10,
                        name       : 'Frank Ling',
                        questions  : [7,8,12,13,14],
                        occupation : 'Executive Chef',
                        bio        : 'Married to Samantha Ling (20)',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 11,
                        name       : 'Ivy Little',
                        questions  : [6,7,11,13,14],
                        occupation : 'Landlady',
                        bio        : 'Married to Lenny Little (1)',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 12,
                        name       : 'Lucy Tumble',
                        questions  : [2,6,11,13,14],
                        occupation : 'Engineer',
                        bio        : 'Single',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 13,
                        name       : 'Piper Perez',
                        questions  : [3,7,11,13,14],
                        occupation : 'Latin Singer',
                        bio        : 'Married to Pepe Perez (3)',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 14,
                        name       : 'Dina Racheti',
                        questions  : [1,6,11,13,14],
                        occupation : 'Doctor',
                        bio        : 'Married to Tony Racheti (4)',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 15,
                        name       : 'Eileen Stellar',
                        questions  : [4,7,11,13,14],
                        occupation : 'Actress',
                        bio        : 'Single',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 16,
                        name       : 'Joan Fineflugle',
                        questions  : [6,8,10,13,14],
                        occupation : 'Accountant',
                        bio        : 'Married to Max Fineflugle (6)',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 17,
                        name       : 'Rose Field',
                        questions  : [2,7,10,13,14],
                        occupation : 'Sportscaster',
                        bio        : 'Unattached',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 18,
                        name       : 'Doris Dill',
                        questions  : [1,8,10,13,14],
                        occupation : 'Delivery Driver',
                        bio        : 'Not Looking',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 19,
                        name       : 'Candy Roll',
                        questions  : [3,8,10,13,14],
                        occupation : 'Musician',
                        bio        : 'Married to Rocky Roll (9)',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Right'
                    },
                    { 
                        id         : 20,
                        name       : 'Samantha Ling',
                        questions  : [4,8,10,13,14],
                        occupation : 'Restaurant Owner',
                        bio        : 'Married to Frank Ling (10)',
                        image      : 'resources/images/female_silhouette_x.png',
                        handness   : 'Left'
                    },
                    { 
                        id         : 21,
                        name       : 'Kurt Schwind',
                        questions  : [0],
                        occupation : 'Software Engineer',
                        bio        : 'When not dutifully obeying his corporate overlords, he writes online adaptations of games he played as a child. ',
                        image      : 'resources/images/kurt_schwind.png',
                        handness   : 'right'
                    },
                    { 
                        id         : 24,
                        name       : 'David Atchley',
                        questions  : [0],
                        occupation : 'Graphic Artist',
                        bio        : 'I art graphics',
                        image      : 'resources/images/male_silhouette_x.png',
                        handness   : 'right'
                    }
                    ];

    // ---------------------- Some private methods ----------------------------------
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
        getName: function(id) {
            return suspects[safeID(id)].name;
        },
        getQuestionIds: function (id) {
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
        }
    }; // end return of public object

};
