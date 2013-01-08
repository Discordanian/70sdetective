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
        var self = this;

        var html = "<div><img style=\"width: 75px; height: 71px; float: left;\" src=\"" + this.data.image + "\" /></div>";
        html += "<div style=\"float: right\"><h1>" + this.suspectId.zeroPad(2) + "</h1></div>";
        html += "<div><h1>" + this.data.name + "</h1></div>";
        html += "<div>" + this.data.occupation + "</div>";
        html += "<div>" + this.data.bio + "</div>";

        var suspectInfo = Ext.create('Ext.container.Container', {
            width: 600,
            height: 71,
            html: html
        });

        var questions = [];
        Ext.each(this.data.questions, function(key, value, array) {
            if ( value > 0 ) {
                questions.push(Ext.create('Ext.container.Container', {
                    layout: 'hbox',
                    width: 600,
                    items: [{
                        xtype: 'label',
                        text: Scenerio.questionText(key),
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: 'Ask',
                        flex: 0,
                        handler: function() {
                            var answer = Scenerio.getSuspectAnswer(self.suspectId, key);
                            this.hide();
                            this.up('container').add(Ext.create('Ext.form.Label', {
                                text: answer,
                                flex: 0
                            }));
                        }
                    }]
                }));
            }
        });

        var suspectQuestions = Ext.create('Ext.container.Container', {
            layout: 'vbox',
            items: questions
        });

        var suspectBox = Ext.create('Ext.container.Container', {
            layout: 'vbox',
            width: '600',
            flex: 1,
            items: [suspectInfo, suspectQuestions]
        });

        Ext.apply(this, { items: suspectBox});
    },

    askQuestion: function(questionId) {
    }
});

