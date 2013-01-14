Ext.define('SeventiesDetective.view.SuspectNav', {
    extend: 'Ext.panel.Panel',
    requires: ['Ext.layout.container.Card', 'SeventiesDetective.controller.Scenario', 'SeventiesDetective.store.Questions', 'SeventiesDetective.view.SuspectToolbar'],
    layout: 'card',
    xtype: 'SuspectNav',
    config: {
        bodyPadding: 5,
        frame: true,
        id: 'theSuspectNav',
        height: 300,
        suspectId: 0,
        // title: 'Choose a suspect!',
        items: [],
        dockedItems: [{
            xtype: 'suspecttoolbar'
        }],
    },
    constructor: function (config) {
        var items = [];
        SuspectStore = Ext.getStore('Suspect');
        var count = SuspectStore.getCount();
        for (i = 0; i < count; i++) {
            var suspect = SuspectStore.getAt(i).raw;
            var html = "<div><img style=\"width: 75px; height: 71px; float: left;\" src=\"" + suspect.image + "\" /></div>";
            html += "<div style=\"float: right\"><h1>" + suspect.id.zeroPad(2) + "</h1></div>";
            html += "<div><h1>" + suspect.name + "</h1></div>";
            html += "<div>" + suspect.occupation + "</div>";
            html += "<div>" + suspect.bio + "</div>";
            html += "<div>" + suspect.handness + " handed</div>";

            var suspectInfo = Ext.create('Ext.container.Container', {
                width: 600,
                height: 71,
                html: html
            });
            var Scenario = app.getController("Scenario");
            var questions = [];
            if (Scenario.victim() === suspect.id) {
                questions.push(Ext.create('Ext.container.Container', {
                    html: '<h1>' + suspect.name + ' is DEAD!  Click the numbers above to interrogate suspects.</h1>'
                }));
            } else {
                questionsExploded = suspect.questions.split(",");
                var questionsStore = Ext.getStore('Questions');
                Ext.each(questionsExploded, function (key, value, array) {
                    questions.push(Ext.create('Ext.container.Container', {
                        layout: 'hbox',
                        width: 600,
                        items: [{
                            xtype: 'label',
                            text: questionsStore.getAt(key).raw.question,
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Ask',
                            flex: 0,
                            handler: function () {
                                debugger;
                                var answer = Scenario.getSuspectAnswer(suspect.id, key);
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
                        handler: function () {
                            Scenario.solve(suspect.id);
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
                id: 'suspectBox' + suspect.id,
                width: '600',
                flex: 1,
                items: [suspectInfo, suspectQuestions]
            });


            items.push(suspectBox);

        }
        this.setItems(items);
        this.callParent();
        return this.initConfig(config);

    }
});