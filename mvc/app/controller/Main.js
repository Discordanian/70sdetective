Ext.define('SeventiesDetective.controller.Main', {
    extend: 'Ext.app.Controller',
    launch: function(){
        // Hopefully fixes the non-secure warnings in IE
        Ext.BLANK_IMAGE_URL = 'resources/images/s.gif';

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
            Scenerio.setQuestionLimit(level2questions(Detective.getDifficultySetting()));
        }


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

        // window.setInterval(reset_game,5000)
    }
});