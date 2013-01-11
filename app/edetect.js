// index.js
//
Ext.Loader.setConfig({
    enabled: true
});

Ext.require('Ext.ux.Spotlight');
Ext.require('Edetect.card');


Ext.onReady(function () {
    // Hopefully fixes the non-secure warnings in IE
    Ext.BLANK_IMAGE_URL = 'resources/images/s.gif';


    var about_html = undefined;
    var rules_html = undefined;
    var suspect_cards = [{
        html: "Take an assignment already!"
    }];

    var tb_items = [
            {
                text: 'Get Assignment',
                id:  'init',
                handler: function() {
                    reset_game();
                }
            }, {
                text: 'Register',
                id:  'register',
                // scope: this,
                handler: function() {
                    registerDetective();
                }
            }
    ];

    for ( var s = 1; s <= 20; s++ ) {
        tb_items.push({
            text: s,
            id:  'nav' + Number(s).zeroPad(2),
            handler: function() {
                Ext.getCmp(getSuspectExtID(this.text)).setValue(Scenerio.getSuspectAlibi(this.text));
                suspect_picture.getLayout().setActiveItem(Number(this.text));
            }
        });

        suspect_cards.push(Ext.create('Edetect.card', {
            id: 'card' + Number(s).zeroPad(2),
            suspectId: s
        }));
    }

    // Easter Egg
    suspect_cards.push(Ext.create('Edetect.card', {
        id: 'KurtEaster',
        suspectId: 21
    }));
    suspect_cards.push(Ext.create('Edetect.card', {
        id: 'JonEaster',
        suspectId: 22
    }));
    suspect_cards.push(Ext.create('Edetect.card', {
        id: 'DanEaster',
        suspectId: 23
    }));
    suspect_cards.push(Ext.create('Edetect.card', {
        id: 'DavidEaster',
        suspectId: 24
    }));

    // Suspect Navigation, Alibi and Bio
    var suspect_picture = Ext.create('Ext.panel.Panel', {
        id: 'suspect_picture',
        layout: 'card',
        // title: 'suspect_picture',
        width: 510,
        height: 200,
        html: '<h1>Choose a suspect!</h1>',
        items: suspect_cards
    }); // end suspect_picture

    var suspect_nav = Ext.create('Ext.panel.Panel', {
        // title: 'suspect_nav',
        // width: 300,
        layout :'fit',
        // renderTo: document.body,
        // bodyPadding: 10,
        // html: 'HTML Panel Content',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            columns: 4,
            title: 'Suspects',
            defaults: { align: 'center' },
            items: tb_items
        }],
        items: [ suspect_picture ]
    }); // end suspect_nav

    var registerDetective = function() {
        Detective.register();
    }


    // Utility function to get ext-id based on a suspect id
    var getSuspectExtID = function(id) {
        if(id < 10) {
            id = '0' + id;
        }
        var suspect = 'suspect' + id;
        return suspect;
    }

    var getNavExtID = function(id) {
        if(id < 10) {
            id = '0' + id;
        }
        var suspect = 'nav' + id;
        return suspect;
    }


    // Function to convert difficulty Setting to a question count.
    var level2questions = function(level) {
        // At the EASIEST setting, you can ask EVERYONE EVERY question that they have.  So that's 20 people at 5 questions.   (less 1 person who's dead).
        // 95 -> total number of people/questions available
        // In the original game the levels were lowest (3 Qs per suspect) to highest (1 Q per suspect).  
        var questions = 60  - (level * 23);  // levels are 0,1,2
        return questions;
    }
    
    // Function to convert difficulty Setting to an alibi limit
    var level2alibis = function(level) {
        // At the EASIEST setting, you can ask EVERYONE EVERY question that they have.  So that's 20 people at 5 questions.   (less 1 person who's dead).
        // 95 -> total number of people/questions available
        // In the original game the levels were lowest (3 Qs per suspect) to highest (1 Q per suspect).  
        var alibis = 30 - (level * 9); 
        return questions;
    }

    // Kill off this suspect.  It will disable there statements box and have a small animation
    var kill_suspect = function(id) {
       var spot = Ext.create('Ext.ux.Spotlight', {
            easing: 'easeOut',
            duration: 300
            });

        var suspect = getSuspectExtID(id);

        spot.show(suspect);
        Ext.getCmp(suspect).setValue(Scenerio.getDeadMessage());
        Ext.get(suspect).fadeIn({ duration: 4000});
        /*
        Ext.get(suspect).highlight("fffffff", {
            attr: "backgroundColor", //can be any valid CSS property (attribute) that supports a color value
            // endColor: "ffffff",
            endColor: "ff0000",
            easing: 'easeIn',
            duration: 2000
        });
        */
        spot.show(suspect);
        Ext.getCmp(suspect).disable();
        Ext.getCmp(getNavExtID(id)).disable();
        spot.hide();
        
    }

    var reset_suspect = function(id) {
        var suspect = getSuspectExtID(id);
        var navbutt = getNavExtID(id);
        Ext.getCmp(suspect).setValue(''); // Clear  their alibi text field
        Ext.getCmp(suspect).enable(); // Re-enable their alibi text field
        Ext.getCmp(navbutt).enable(); // Re-enable their navigation button
    }

    // Utility function to make the field labels
    var suspectFieldLabel = function(id) {
        var retVal;
        var did; // 'display id' should have used 'smoke'
        if(id < 10) {
            did = '0' + id;
        } else {
            did = id;
        }
        retVal = did + " : " + Suspect.getName(id);
        return retVal;
    }

    var reset_game = function() {
        Scenerio.init();
        for (var i = 1; i < 21; i++) {
            reset_suspect(i);
            suspect_cards[i].reset();
        }

        kill_suspect(Scenerio.victim());
        suspect_picture.getLayout().setActiveItem(Scenerio.victim());
        Ext.Msg.alert("(ALERT)  Incoming SMS message for the Detective! (ALERT)", Scenerio.getScenerioMessage()); 
        Scenerio.solution();
        Scenerio.setQuestionLimit(level2questions(Detective.getDifficultySetting())); // set question limit
        Scenerio.setAlibiLimit(level2alibis(Detective.getDifficultySetting())); // set alibi limit
    }


    var statements_form = Ext.create('Ext.form.Panel', {
        fieldDefaults: {
            labelWidth: 110, // label settings here cascade unless overridden
        },
        frame: false,
        bodyStyle: 'padding:5px 5px 0',
        layout: 'column', // arrange fieldsets side by side
        defaults: {
            bodyPadding: 1
        },
        items: [{
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',
            columnWidth: 0.5,
            title: 'Men',
            collapsible: false,
            defaultType: 'textareafield',
            defaults: {height: 20, anchor: '100%'},
            layout: 'anchor',
            items :[{
                fieldLabel: suspectFieldLabel(1),
                name: 'suspect01',
                id: 'suspect01'
            }, {
                fieldLabel: suspectFieldLabel(2),
                name: 'suspect02',
                id: 'suspect02'
            }, {
                fieldLabel: suspectFieldLabel(3),
                name: 'suspect03',
                id: 'suspect03'
            }, {
                fieldLabel: suspectFieldLabel(4),
                name: 'suspect04',
                id: 'suspect04'
            }, {
                fieldLabel: suspectFieldLabel(5),
                name: 'suspect05',
                id: 'suspect05'
            }, {
                fieldLabel: suspectFieldLabel(6),
                name: 'suspect06',
                id: 'suspect06'
            }, {
                fieldLabel: suspectFieldLabel(7),
                name: 'suspect07',
                id: 'suspect07'
            }, {
                fieldLabel: suspectFieldLabel(8),
                name: 'suspect08',
                id: 'suspect08'
            }, {
                fieldLabel: suspectFieldLabel(9),
                name: 'suspect09',
                id: 'suspect09'
            }, {
                fieldLabel: suspectFieldLabel(10),
                name: 'suspect10',
                id: 'suspect10'
            } ]
        }, {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: 'Women',
            collapsible: false,
            defaultType: 'textareafield',
            defaults: {height: 20, anchor: '100%'},
            layout: 'anchor',
            xtype:'fieldset',
            items :[{
                fieldLabel: suspectFieldLabel(11),
                name: 'suspect11',
                id: 'suspect11'
            }, {
                fieldLabel: suspectFieldLabel(12),
                name: 'suspect12',
                id: 'suspect12'
            }, {
                fieldLabel: suspectFieldLabel(13),
                name: 'suspect13',
                id: 'suspect13'
            }, {
                fieldLabel: suspectFieldLabel(14),
                name: 'suspect14',
                id: 'suspect14'
            }, {
                fieldLabel: suspectFieldLabel(15),
                name: 'suspect15',
                id: 'suspect15'
            }, {
                fieldLabel: suspectFieldLabel(16),
                name: 'suspect16',
                id: 'suspect16'
            }, {
                fieldLabel: suspectFieldLabel(17),
                name: 'suspect17',
                id: 'suspect17'
            }, {
                fieldLabel: suspectFieldLabel(18),
                name: 'suspect18',
                id: 'suspect18'
            }, {
                fieldLabel: suspectFieldLabel(19),
                name: 'suspect19',
                id: 'suspect19'
            }, {
                fieldLabel: suspectFieldLabel(20),
                name: 'suspect20',
                id: 'suspect20'
            } ]
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            region: 'north',
            id: 'north',
            title: '70s Detective',
            xtype: 'panel',
            collapsed: true,
            collapsible: true,
            height: 340,
            bodyPadding: 10,
            html: about_html,
            autoScroll: true,
            autoHeight: true,
            border: true,
            margins: '0 0 5 0'
        }, {
            region: 'west',
            id: 'west',
            collapsible: true,
            collapsed: true,
            title: 'How to Play',
            bodyPadding: 10,
            html: rules_html,
            autoScroll: true,
            border: true,
            width: 450
            // could use a TreePanel or AccordionLayout for navigational items
        }, {
            region: 'south',
            title: 'Statements from Suspects',
            collapsible: true,
            items: [ statements_form ],
            layout: 'fit'
        }, {
            region: 'center',
            layout: 'fit',
            items: [  suspect_nav ]
        }]
    });

    // Load up the About panel with any relevant information
    Ext.Ajax.request({
        url: 'about.html',
        params: {
            id: 1
        },
        success: function (response) {
            about_html = response.responseText;
            Ext.getCmp('north').update(about_html);
        }
    });

    // Load up the rules panel
    Ext.Ajax.request({
        url: 'rules.html',
        params: {
            id: 1
        },
        success: function (response) {
            rules_html = response.responseText;
            Ext.getCmp('west').update(rules_html);
        }
    });

    registerDetective();

    // Test stuff.
    if(1===0) {
        console.groupCollapsed("Alibis");
        for (var suspectID = 1; suspectID < 21; suspectID++) {
            Ext.log("Get Alibi for " + suspectID);
            Ext.getCmp(getSuspectExtID(suspectID)).setValue(Scenerio.getSuspectAlibi(suspectID));
        }
        console.groupEnd(); // end Alibis
        console.groupCollapsed("Question Test");
        for (var i = 0; i < 5; i++) {
            var suspectID = Scenerio.victim();
            while (suspectID === Scenerio.victim()) {
                suspectID = Math.floor((Math.random() * 20) + 1); 
            }
            // We have a suspect who isn't dead.
            
            Ext.getCmp(getSuspectExtID(suspectID)).setValue(Scenerio.getSuspectAlibi(suspectID));
            var questions = Suspect.getQuestions(suspectID);
            Ext.log("Interview suspect " + Scenerio.suspectName(suspectID));
            for (var j = 0; j < questions.length; j++) {
                Ext.log("The answer to [" + Scenerio.questionText(questions[j]) + "] was [" + Scenerio.getSuspectAnswer(suspectID,questions[j]) + "]");
            } // for each question in their ID list
            
        } // for 5 suspects
        console.groupEnd(); // end Question Test
    }

    // window.setInterval(reset_game,5000);

});
