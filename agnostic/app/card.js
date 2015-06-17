Ext.define('Edetect.card', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    bodyPadding: 5,
    frame: true,
    height: 300,
    isInit: false,

    suspectId: 0,
    data: {
        name: 'Jon Bishop',
        bio: 'Sunshine, lolly pops, rainbows, and unicorns. AKA Awesome.',
        handness: 'ambidextrious',
        occupation: 'Engineer',
        questions: []
    },

    initComponent: function() {
        this.reset();
        this.isInit = true;
        this.callParent();
    },

    reset: function() {
        this.data = {
            name: Suspect.getName(this.suspectId),
            bio: Suspect.getBio(this.suspectId),
            handness: Suspect.getHandness(this.suspectId),
            occupation: Suspect.getOccupation(this.suspectId),
            questions: Suspect.getQuestions(this.suspectId),
            image: Suspect.getImage(this.suspectId)
        };

        this.renderHTML();
    },

    renderHTML: function() {
        var self = this;

        if (self.isInit === true) {
            self.remove('suspectBox' + self.suspectId);
        }

        var html = "<div><img style=\"width: 75px; height: 71px; float: left;\" src=\"" + this.data.image + "\" /></div>";
        html += "<div style=\"float: right\"><h1>" + this.suspectId.zeroPad(2) + "</h1></div>";
        html += "<div><h1>" + this.data.name + "</h1></div>";
        html += "<div>" + this.data.occupation + "</div>";
        html += "<div>" + this.data.bio + "</div>";
        html += "<div>" + this.data.handness + " handed</div>";

        var suspectInfo = Ext.create('Ext.container.Container', {
            width: 600,
            height: 71,
            html: html
        });

        var questions = [];
        if (Scenerio.victim() === self.suspectId) {
            questions.push(Ext.create('Ext.container.Container', {
                html: '<h1>' + self.data.name + ' is DEAD!  Click the numbers above to interrogate suspects.</h1>'
            }));
        } else {
            Ext.each(this.data.questions, function(key, value, array) {
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
            });

            questions.push(Ext.create('Ext.container.Container', {
                layout: 'hbox',
                width: 600,
                items: [{
                    xtype: 'label',
                    text: '',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'Accuse!',
                    flex: 0,
                    handler: function() {
                        Scenerio.solve(self.suspectId);
                    }
                }]
            }));
        }

        var suspectQuestions = Ext.create('Ext.container.Container', {
            layout: 'vbox',
            items: questions
        });

        var suspectBox = Ext.create('Ext.container.Container', {
            layout: 'vbox',
            id: 'suspectBox' + self.suspectId,
            width: '600',
            flex: 1,
            items: [suspectInfo, suspectQuestions]
        });

        if (self.isInit === true) {
            self.add(suspectBox);
        } else {
            Ext.apply(self, {
                items: [suspectBox]
            });
        }
    }
});
