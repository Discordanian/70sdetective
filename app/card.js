Ext.define('Edetect.card', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    bodyPadding: 5,
    frame: true,
    height: 300,
    width: 'auto',

    suspectId: 0,
    data: {
        name: 'Jon Bishop',
        bio: 'Sunshine, lolly pops, rainbows, and unicorns. AKA Awesome.',
        handness: 'ambidextrious',
        occupation: 'Engineer',
        questions: []
    },

    initComponent: function () {
        this.data = {
            name: Suspect.getName(this.suspectId),
            bio: Suspect.getBio(this.suspectId),
            handness: Suspect.getHandness(this.suspectId),
            occupation: Suspect.getOccupation(this.suspectId),
            questions: Suspect.getQuestions(this.suspectId),
            image: Suspect.getImage(this.suspectId)
        };

        this.renderHTML();

        this.callParent();
    },

    renderHTML: function () {
        this.html = "<div><img style=\"float: left;\" src=\"" + this.data.image + "\" /></div>";
        this.html += "<div><h1>" + this.data.name + "</h1></div>";
    },

    askQuestion: function(questionId) {
    }
});

