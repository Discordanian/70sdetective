Ext.define('SeventiesDetective.controller.Suspect',{
    extend:'Ext.app.Controller',
    launch:function(){

        //validator on store
    function safeID(id) {
        if (typeof id === 'undefined') {
            return 0;
        } 
        if (id < 0) {
            return 0;
        }
        if (id > 20) {
            return 0;
        }
        return id;
    }




    // Return public interface
    return {
        getName: function(id) {
            return suspects[safeID(id)].name;
        },
        getQuestions: function (id) {
            return suspects[safeID(id)].questions;
            //questions array mayps to suspect[id]
            
            questionMap = [
                [],
                [1,2,9,13,14],
                [2,3,9,13,14],
                [3,4,5,13,14],
                [4,5,9,13,14],
                [1,4,9,13,14],
                [5,6,12,13,14],
                [2,5,12,13,14],
                [3,5,12,13,14],
                [1,5,12,13,14],
                [7,8,12,13,14],
                [6,7,11,13,14],
                [2,6,11,13,14],
                [3,7,11,13,14],
                [1,6,11,13,14],
                [4,7,11,13,14],
                [6,8,10,13,14],
                [2,7,10,13,14],
                [1,8,10,13,14],
                [3,8,10,13,14],
                [4,8,10,13,14]
            ]



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
    } // end return of public object
    }
})