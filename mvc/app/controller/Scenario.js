Ext.define('SeventiesDetective.controller.Scenario', {
    extend: 'Ext.app.Controller',
    config: {
        victimID: 0,
        weaponID: 0,
        murderLocationID: 0,
        population: [],
        populationMap: [],
        weaponLocationIDs: [],
        killerID: 0,
        questionCount: 0,
        questionLimit: 0,
        deadMessage: "( - - = = D E A D = = - - )",
        answers: []
    },



    // ---------------------- Some private methods ----------------------------------
    // Given a suspectID, where are they?
    suspectPopulationID: function (suspectID) {
        for (var i = 0; i < population.length; i++) {
            if (population[i].indexOf(suspectID, 0) > -1) {
                return i;
            }
        }
        // TODO HANDLE KURT SUSPECT 0 console.error("suspectID (" + suspectID + ") was not found in the population groups.");
    },

    suspectSceneID: function (suspectID) {
        var populationID = suspectPopulationID(suspectID);
        return populationMap[populationID].sceneID;
    },

    suspectWithWeapon: function (suspectID, weaponID) {
        var popID = suspectPopulationID(suspectID);
        var sceneID = populationMap[popID].sceneID;

        return (sceneID === weaponLocationIDs[weaponID]);
    },

    // 
    suspectAnswer: function (suspectID, questionID) {
        var answer = "I have no idea."; // This should only be returned IFF it's Q 13 or 14 and the suspect wasn't where the weapon was located.
        if (suspectID === this.victimID) {
            return "The dead have no answers.";
        }

        // General question about the murderer
        if (questionID < 9) {
            answer = this.answers[questionID];
        }
        debugger;
        // Questions specific to the person 
        if (questionID > 8) {
            switch (questionID) {
            case 9:
                debugger;
                answer = "I was on the " + this.populationMap[this.suspectPopulationID(suspectID)].eastWest + " side.";
                break;
            case 10:
                debugger;
                answer = "I was on the " + this.populationMap[this.suspectPopulationID(suspectID)].upMidDown;
                break;
            case 11:
                debugger;
                if (populationMap[suspectPopulationID(suspectID)].sceneID < 3) {
                    answer = "I was at (" + scenes[0].name + " or " + scenes[1].name + " or " + scenes[2].name + ")";
                } else {
                    answer = "I was at (" + scenes[3].name + " or " + scenes[4].name + " or " + scenes[5].name + ")";
                }
                break;
            case 12:
                debugger;
                if ((populationMap[suspectPopulationID(suspectID)].sceneID === weaponLocationIDs[0]) || (populationMap[suspectPopulationID(suspectID)].sceneID === weaponLocationIDs[0])) {
                    answer = "A weapon was found at my location."
                } else {
                    answer = "No weapon was found at my location."
                }
                break;
            case 13:
                debugger;
                if (suspectWithWeapon(suspectID, 0)) {
                    if (((killerID < 11) && (suspectID < 11)) || ((killerID > 10) && (suspectID > 10))) {
                        // suspect is where the weapon was and is the same gender as the killer.  TRUTH.
                        if (killerID % 2 == 0) {
                            answer = "The fingerprints on the " + weapons[0] + " were LEFT handed.";
                        } else {
                            answer = "The fingerprints on the " + weapons[0] + " were RIGHT handed.";
                        }
                    } else {
                        // suspect is where the weapon was but is a different gender.  LIE.
                        if (killerID % 2 == 0) {
                            answer = "The fingerprints on the " + weapons[0] + " were RIGHT handed.";
                        } else {
                            answer = "The fingerprints on the " + weapons[0] + " were LEFT handed.";
                        }
                    }
                }
                break;
            case 14:
                if (suspectWithWeapon(suspectID, 1)) {
                    if (((killerID < 11) && (suspectID < 11)) || ((killerID > 10) && (suspectID > 10))) {
                        // suspect is where the weapon was and is the same gender as the killer.  TRUTH.
                        if (killerID % 2 == 0) {
                            answer = "The fingerprints on the " + weapons[1] + " were LEFT handed.";
                        } else {
                            answer = "The fingerprints on the " + weapons[1] + " were RIGHT handed.";
                        }
                    } else {
                        // suspect is where the weapon was but is a different gender.  LIE.
                        if (killerID % 2 == 0) {
                            answer = "The fingerprints on the " + weapons[1] + " were RIGHT handed.";
                        } else {
                            answer = "The fingerprints on the " + weapons[1] + " were LEFT handed.";
                        }
                    }
                }
            } // end switch on question ID
        } // end if questionID > 8
        return answer;
    },
    // end suspectAnswer

    // If the given suspect is at a location with any other suspect that has the answer to Q 10
    withSomeoneWithUpMidDown: function (suspectID) {
        var retVal = false;
        var suspects = population[suspectPopulationID(suspectID)];
        for (var i = 0; i < suspects.length; i++) {
            // See if any suspect has Q 10 in their list.
            if (Suspect.getQuestions(suspects[i]).indexOf(10, 0)) {
                Ext.log("Suspect " + suspectID + " is with " + suspects[i] + " so no U/M/D");
                retVal = true;
            }
        }

        return retVal;
    },

    // If the given suspect is at a location with any other suspect that has the answer to Q 9
    withSomeoneWithEastWest: function (suspectID) {
        var retVal = false;
        // get the array of suspects that are together
        var suspects = population[suspectPopulationID(suspectID)];
        for (var i = 0; i < suspects.length; i++) {
            // See if any suspect has Q 9 in their list.
            if (Suspect.getQuestions(suspects[i]).indexOf(9, 0) > -1) {
                Ext.log("Suspect " + suspectID + " is with " + suspects[i] + " so no E/W");
                retVal = true;
            }
        }

        return retVal;
    },

    suspectAlibi: function (suspectID) {
        var popID = suspectPopulationID(suspectID);
        var indexID = population[popID].indexOf(suspectID, 0);
        var withSuspectIndex = population[popID][((indexID + population[popID].length - 1) % population[popID].length)]; // Mention the 'previous' suspect in the same group.
        var withName = Suspect.getName(withSuspectIndex) + " (" + withSuspectIndex + ")";
        var ewInfo = populationMap[popID].eastWest;
        var umdInfo = populationMap[popID].upMidDown;
        var locationName = scenes[populationMap[popID].sceneID].name;



        var reply = "I have nothing to say."

        switch ((popID + indexID) % 4) {
        case 0:
            if (Suspect.getQuestions(suspectID).indexOf(9, 0) > -1) {
                Ext.log("Suspect " + suspectID + " is with-holding E/W information.");
                reply = "I was with " + withName;
            } else {
                reply = "I was on the " + ewInfo + " side with " + withName;
            }
            break;
        case 1:
            if (Suspect.getQuestions(suspectID).indexOf(10, 0) > -1) {
                Ext.log("Suspect " + suspectID + " is with-holding U/M/D information.");
                reply = "I was with " + withName;
            } else {
                reply = "I was " + umdInfo + " with " + withName;
            }
            break;
        case 2:
            reply = "I was with " + withName;
            break;
        case 3:
            reply = "I was at " + locationName; // " with " + withName;
        }

        return reply;

    },
    // end suspectAlibi
    setAnswers: function () {
        debugger;
        this.answers[1] = "The murderer fled to the " + this.populationMap[this.suspectPopulationID(this.killerID)].eastWest + " side";
        if (this.killerID < 11) {
            this.answers[2] = "The murderer was MALE.";
        } else {
            this.answers[2] = "The murderer was FEMALE.";
        }
        this.answers[3] = "The murderer fled to " + this.populationMap[this.suspectPopulationID(this.killerID)].upMidDown;
        this.answers[4] = "The murder weapon was a " + Ext.getStore("weapon").getAt(this.weaponID);
        this.answers[5] = "The " + Ext.getStore("weapon").getAt(0) + " was found at " + Ext.getStore("Scene").getAt(this.weaponLocationIDs[0]).raw.name;
        this.answers[6] = "The " + Ext.getStore("weapon").getAt(1) + " was found at " + Ext.getStore("Scene").getAt(this.weaponLocationIDs[1]).raw.name;
        this.answers[7] = "There were only 3 suspects at " + scenes[this.populationMap[4].sceneID].name;
        if (this.populationMap[suspectPopulationID(killerID)].sceneID < 3) {
            this.answers[8] = "The murderer fled to (" + scenes[0].name + " or " + scenes[1].name + " or " + scenes[2].name + ")";
        } else {
            this.answers[8] = "The murderer fled to (" + scenes[3].name + " or " + scenes[4].name + " or " + scenes[5].name + ")";
        }

        // answers 9-> are unique to each suspect
    },


    // Return public interface
    // return {
    getDeadMessage: function () {
        return deadMessage;
    },
    getScenerioMessage: function () {
        var retVal;
        retVal = "A dead body was found at <b>" + scenes[murderLocationID].name + "</b>.<br />";
        retVal += "19 suspects have been rounded up and brought in for questioning.  <br/>Can you solve the case? ";
        return retVal;
    },
    solution: function () {
        var answer;
        answer = "\"" + Suspect.getName(killerID) + "\" killed \"" + Suspect.getName(victimID) + "\" with the " + weapons[weaponID];
        answer = answer + " at " + scenes[murderLocationID].name + " and fled " + populationMap[suspectPopulationID(killerID)].upMidDown;
        answer = answer + " to " + scenes[suspectSceneID(killerID)].name;
        answer = answer + " on the " + populationMap[suspectPopulationID(killerID)].eastWest + " side";
        console.groupCollapsed('Cheat');
        Ext.log(answer);
        console.groupEnd();
    },
    spam: function () {
        console.groupCollapsed("SPAM");
        Ext.log({
            dump: population
        }, "Population");
        Ext.log({
            dump: populationMap
        }, 'Population Map');
        Ext.log({
            dump: answers
        }, 'Answers');
        Ext.log("The Murder Location is " + murderLocationID);
        for (var i = 0; i < population.length; i++) {
            Ext.log("Population Group[" + i + "] consists of (" + population[i].join() + ") at " + populationMap[i].sceneID + " " + scenes[populationMap[i].sceneID].name);
        }
        console.groupEnd();
        /*
            Ext.log("The victim is " + victimID);
            Ext.log("The killer is " + killerID);
            Ext.log("The weapon is " + weaponID);
            Ext.log("The " + weapons[0] + " is at Location " + weaponLocationIDs[0]);
            Ext.log("The " + weapons[1] + " is at Location " + weaponLocationIDs[1]);
            */
    },
    victim: function () {
        return this.victimID;
    },
    solve: function (suspectID) {
        if (killerID === suspectID) {
            // Ext.Msg.show({ modal: true, msg: 'Book \'em!  Congratulations, you solved the case!' });
            Ext.Msg.alert("Screeching tires", "Book \'em!  Congratulations!  You have solved the case and another criminal pays for their crimes.");
        } else {
            // Ext.Msg.show({ modal: true, msg: this.suspectName(killerID) + ' murders you for being wrong.' }); 
            Ext.Msg.alert("(Sad Trombone)", "The desk sergeant has just finished ripping you a new one for accusing an innocent person of murder.  You are dejectedly walking to your vehicle when " + this.suspectName(killerID) + " steps out from the shadows and puts two bullets in your chest.");
        }
    },
    suspectName: function (suspectID) {
        return Suspect.getName(suspectID);
    },
    suspectQuestionIDs: function (suspectID) {
        if (suspectID === victimID) {
            return [];
        }
        return Suspect.getQuestions(suspectID);
    },
    questionText: function (questionID) {
        return questions[questionID];
    },
    setQuestionLimit: function (qLimit) {
        questionLimit = qLimit;
        return true;
    },
    getQuestionLimit: function () {
        return this.questionLimit;
    },
    getQuestionCount: function () {
        return this.questionCount;
    },
    getSuspectAnswer: function (suspectID, questionID) {
        if (this.questionCount > this.questionLimit) {
            return "I'm done answering questions. [Question Limit exceeded]";
        }
        this.questionCount++;
        Ext.log("Questions asked: " + this.questionCount + " / " + this.questionLimit);
        return this.suspectAnswer(suspectID, questionID);
    },
    getSuspectAlibi: function (suspectID) {
        if (killerID === 0) {
            // This condition can only be true if we are not initialized.
            Ext.log("Accessing getSuspectAlibi before init so returning an empty string.");
            return "";
        }
        if (suspectID === victimID) {
            return deadMessage;
        } else {
            return suspectAlibi(suspectID);
        }
    },
    init: function () {
        victimID = this.victimID;
        // First we kill someone
        victimID = Math.floor((Math.random() * 20) + 1);
        this.questionCount = 0;
        this.questionLimit = 20;

        var r_males = [];
        var l_males = [];
        var r_females = [];
        var l_females = [];

        // Push all available (non-dead) people into their respective places
        for (var i = 1; i < 11;) {
            if (i != victimID) {
                r_males.push(i);
            }
            i++;
            if (i != victimID) {
                l_males.push(i);
            }
            i++;
        }
        for (var i = 11; i < 21;) {
            if (i != victimID) {
                r_females.push(i);
            }
            i++;
            if (i != victimID) {
                l_females.push(i);
            }
            i++;
        }

        // Randomize the suspects.
        r_males.shuffle();
        l_males.shuffle();
        r_females.shuffle();
        l_females.shuffle();

        // We randomly group suspects together.  The filter is to get rid of the undefined from the missing victim.
        population = [];
        population[0] = [r_males.pop(), l_males.pop(), r_females.pop(), l_females.pop()].filter(function (val) {
            return val;
        });
        population[1] = [r_males.pop(), l_males.pop(), r_females.pop(), l_females.pop()].filter(function (val) {
            return val;
        });
        population[2] = [r_males.pop(), l_males.pop(), r_females.pop(), l_females.pop()].filter(function (val) {
            return val;
        });
        population[3] = [r_males.pop(), l_males.pop(), r_females.pop(), l_females.pop()].filter(function (val) {
            return val;
        });
        population[4] = [r_males.pop(), l_males.pop(), r_females.pop(), l_females.pop()].filter(function (val) {
            return val;
        });


        // Function used for sorting numbers.  This is used in the sort callback.


        function compareNumbers(a, b) {
            return ((a > b) - (a < b));
        }

        population[0].sort(compareNumbers);
        population[1].sort(compareNumbers);
        population[2].sort(compareNumbers);
        population[3].sort(compareNumbers);
        population[4].sort(compareNumbers);

        var sceneIDs = [0, 1, 2, 3, 4, 5]; // There are 5 scene ids.
        sceneIDs.shuffle(); // Randomize the scene IDs
        murderLocationID = sceneIDs.pop(); // This location is 'burned' off of the stack.  
        var eastWestArray = ['East', 'East', 'East', 'West', 'West', 'West'];
        eastWestArray.shuffle();
        var UpMidDownArray = ['Uptown', 'Uptown', 'Midtown', 'Midtown', 'Downtown', 'Downtown'];
        UpMidDownArray.shuffle();
        // This leaves 5 scene IDs left which we will map to the locations.
        this.populationMap = [];
        for (var i = 0; i < 5; i++) {
            this.populationMap.push({
                populationID: i,
                sceneID: sceneIDs[i],
                eastWest: eastWestArray.pop(),
                upMidDown: UpMidDownArray.pop()
            });
        }

        // Scenes have been assigned.  Populations have been assigned to every scene except murder location.
        // Now we randomly take two more IDs from the remaining available sceneIDs
        sceneIDs.shuffle(); // If we didn't do this, it'd always map to population IDs 3 and 4.
        this.weaponLocationIDs[0] = sceneIDs.pop(); // .38
        this.weaponLocationIDs[1] = sceneIDs.pop(); // .45
        // For each populationMap push suspects on there if the sceneID is still in the available sceneIDs array.
        // In other words.  Suspects come from locations other than the murder location or where a weapon was found.
        var shortlist = []; //shortlist will hold the remaining eligible suspects.  (can't be found where there is a weapon).
        for (var i = 0; i < this.populationMap.length; i++) {
            if (sceneIDs.indexOf(this.populationMap[i].sceneID, 0) > -1) {
                // Ext.log("No murder or weapon at location " + populationMap[i].sceneID + " so load suspects from this group in shortlist");
                for (var j = 0; j < population[i].length; j++) {
                    shortlist.push(population[i][j]);
                }
            }
        }
        // Randomize the shortlist
        shortlist.shuffle();

        killerID = shortlist.pop();

        weaponID = Math.floor((Math.random() * 2));


        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //START HERE
        //this.setAnswers(); // set up all the answers for the given scenerio.
    } // end init
    // } // end return of public object*/
})