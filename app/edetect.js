// index.js
//
Ext.Loader.setConfig({
    enabled: true
});

Ext.require('Ext.ux.Spotlight');



Ext.onReady(function () {
    // Hopefully fixes the non-secure warnings in IE
    Ext.BLANK_IMAGE_URL = 'resources/images/s.gif';


    var about_html = undefined;
    var rules_html = undefined;


    // Suspect Navigation, Alibi and Bio
    var suspect_picture = Ext.create('Ext.panel.Panel', {
        title: 'suspect_picture',
        width: 510,
        height: 200,
        html: '<img src="resources/images/male_silhouette_x.png"></img>'
    }); // end suspect_picture

    var suspect_nav = Ext.create('Ext.panel.Panel', {
        title: 'suspect_nav',
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
            items: [{
                text: '1',
                id:  'nav01',
                // scope: this,
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(1)).setValue(Scenerio.getSuspectAlibi(1));
                    }
            },{
                text: '2',
                id:  'nav02',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(2)).setValue(Scenerio.getSuspectAlibi(2));
                    }
            },{
                text: '3',
                id:  'nav03',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(3)).setValue(Scenerio.getSuspectAlibi(3));
                    }
            },{
                text: '4',
                id:  'nav04',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(4)).setValue(Scenerio.getSuspectAlibi(4));
                    }
            },{
                text: '5',
                id:  'nav05',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(5)).setValue(Scenerio.getSuspectAlibi(5));
                    }
            },{
                text: '6',
                id:  'nav06',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(6)).setValue(Scenerio.getSuspectAlibi(6));
                    }
            },{
                text: '7',
                id:  'nav07',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(7)).setValue(Scenerio.getSuspectAlibi(7));
                    }
            },{
                text: '8',
                id:  'nav08',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(8)).setValue(Scenerio.getSuspectAlibi(8));
                    }
            },{
                text: '9',
                id:  'nav09',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(9)).setValue(Scenerio.getSuspectAlibi(9));
                    }
            },{
                text: '10',
                id:  'nav10',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(10)).setValue(Scenerio.getSuspectAlibi(10));
                    }
            },{
                text: '11',
                id:  'nav11',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(11)).setValue(Scenerio.getSuspectAlibi(11));
                    }
            },{
                text: '12',
                id:  'nav12',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(12)).setValue(Scenerio.getSuspectAlibi(12));
                    }
            },{
                text: '13',
                id:  'nav13',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(13)).setValue(Scenerio.getSuspectAlibi(13));
                    }
            },{
                text: '14',
                id:  'nav14',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(14)).setValue(Scenerio.getSuspectAlibi(14));
                    }
            },{
                text: '15',
                id:  'nav15',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(15)).setValue(Scenerio.getSuspectAlibi(15));
                    }
            },{
                text: '16',
                id:  'nav16',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(16)).setValue(Scenerio.getSuspectAlibi(16));
                    }
            },{
                text: '17',
                id:  'nav17',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(17)).setValue(Scenerio.getSuspectAlibi(17));
                    }
            },{
                text: '18',
                id:  'nav18',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(18)).setValue(Scenerio.getSuspectAlibi(18));
                    }
            },{
                text: '19',
                id:  'nav19',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(19)).setValue(Scenerio.getSuspectAlibi(19));
                    }
            },{
                text: '20',
                id:  'nav20',
                handler: function() { 
                    Ext.getCmp(getSuspectExtID(20)).setValue(Scenerio.getSuspectAlibi(20));
                    }
            }]
        }], 
        items: [ suspect_picture ]
    }); // end suspect_nav



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
        // console.dir(spot);
        
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
        for (var i = 1; i < 21; i++) {
            reset_suspect(i);
        }

        Scenerio.init();
        kill_suspect(Scenerio.victim());
        Ext.Msg.alert("(ALERT)  Incoming SMS message for the Detective! (ALERT)", Scenerio.getScenerioMessage()); 
        Scenerio.solution();
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
            region: 'east',
            title: 'East Panel',
            collapsible: true,
            split: true,
            width: 150
        }, {
            region: 'center',
            layout: 'fit',
            items: [  suspect_nav 
            ]
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

    // Scenerio.spam();
    reset_game();

    



    // Test stuff.
    if(1===0) {
        console.groupCollapsed("Alibis");
        for (var suspectID = 1; suspectID < 21; suspectID++) {
            console.log("Get Alibi for " + suspectID);
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
            console.log("Interview suspect " + Scenerio.suspectName(suspectID));
            for (var j = 0; j < questions.length; j++) {
                console.log("The answer to [" + Scenerio.questionText(questions[j]) + "] was [" + Scenerio.getSuspectAnswer(suspectID,questions[j]) + "]");
            } // for each question in their ID list
            
        } // for 5 suspects
        console.groupEnd(); // end Question Test
    }

    // window.setInterval(reset_game,5000);

});
