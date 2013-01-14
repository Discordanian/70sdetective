Ext.define('SeventiesDetective.store.Suspect', {
    extend: 'Ext.data.Store',
    requires: 'SeventiesDetective.model.Suspect',
    config: {
        model: 'SeventiesDetective.model.Suspect',
        data: [{
            id: 0,
            name: 'Kurt Schwind',
            occupation: 'Software Engineer',
            bio: 'Works as a software engineer for a large soulless corporation.<br/>When not dutifully obeying his corporate overlords, he writes online adaptations of games he played as a child. ',
            image: 'resources/images/kurt_schwind.png',
            handness: 'right',
            questions: ''
        }, {
            id: 1,
            name: 'Lenny Little',
            occupation: 'Bartender',
            bio: 'Married to Ivy Little (11)',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Right',
            questions: '1,2,9,13,14'
        }, {
            id: 2,
            name: 'Al Farook',
            occupation: 'Web Developer',
            bio: 'Determinedly Single',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Left',
            questions: '2,3,9,13,14'
        }, {
            id: 3,
            name: 'Pepe Perez',
            occupation: 'Flamenco Dancer',
            bio: 'Married to Piper Perez (13)',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Right',
            questions: '3,4,5,13,14'
        }, {
            id: 4,
            name: 'Tony Racheti',
            occupation: 'Promoter',
            bio: 'Married to Dina Racheti (14)',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Left',
            questions: '4,5,9,13,14'
        }, {
            id: 5,
            name: 'Mickey O\'Malley',
            occupation: 'Retired Cop',
            bio: 'Single',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Right',
            questions: '1,4,9,13,14'
        }, {
            id: 6,
            name: 'Max Fineflugle',
            occupation: 'Producer',
            bio: 'Married to Joan Fineflugle (16)',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Left',
            questions: '5,6,12,13,14'
        }, {
            id: 7,
            name: 'Ripp Rapp',
            occupation: 'Baker',
            bio: 'Engaged',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Right',
            questions: '2,5,12,13,14'
        }, {
            id: 8,
            name: 'Buster Bailey',
            occupation: 'Basketball Player',
            bio: 'Single',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Left',
            questions: '3,5,12,13,14'
        }, {
            id: 9,
            name: 'Rocky Roll',
            occupation: 'Musician',
            bio: 'Married to Candy Roll (19)',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Right',
            questions: '1,5,12,13,14'
        }, {
            id: 10,
            name: 'Frank Ling',
            occupation: 'Executive Chef',
            bio: 'Married to Samantha Ling (20)',
            image: 'resources/images/male_silhouette_x.png',
            handness: 'Left',
            questions: '7,8,12,13,14'
        }, {
            id: 11,
            name: 'Ivy Little',
            occupation: 'Landlady',
            bio: 'Married to Lenny Little (1)',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Right',
            questions: '6,7,11,13,14'
        }, {
            id: 12,
            name: 'Lucy Tumble',
            occupation: 'Engineer',
            bio: 'Single',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Left',
            questions: '2,6,11,13,14'
        }, {
            id: 13,
            name: 'Piper Perez',
            occupation: 'Latin Singer',
            bio: 'Married to Pepe Perez (3)',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Right',
            questions: '3,7,11,13,14'
        }, {
            id: 14,
            name: 'Dina Racheti',
            occupation: 'Doctor',
            bio: 'Married to Tony Racheti (4)',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Left',
            questions: '1,6,11,13,14'
        }, {
            id: 15,
            name: 'Eileen Stellar',
            occupation: 'Actress',
            bio: 'Single',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Right',
            questions: '4,7,11,13,14'
        }, {
            id: 16,
            name: 'Joan Fineflugle',
            occupation: 'Accountant',
            bio: 'Married to Max Fineflugle (6)',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Left',
            questions: '6,8,10,13,14'
        }, {
            id: 17,
            name: 'Rose Field',
            occupation: 'Sportscaster',
            bio: 'Unattached',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Right',
            questions: '2,7,10,13,14'
        }, {
            id: 18,
            name: 'Doris Dill',
            occupation: 'Delivery Driver',
            bio: 'Not Looking',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Left',
            questions: '1,8,10,13,14'
        }, {
            id: 19,
            name: 'Candy Roll',
            occupation: 'Musician',
            bio: 'Married to Rocky Roll (9)',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Right',
            questions: '3,8,10,13,14'
        }, {
            id: 20,
            name: 'Samantha Ling',
            occupation: 'Restaurant Owner',
            bio: 'Married to Frank Ling (10)',
            image: 'resources/images/female_silhouette_x.png',
            handness: 'Left',
            questions: '4,8,10,13,14'
        }]
    }
});