// Detective Singleton
Detective = function() {

    // Private vars
    var name = "Jane Gumshoe";
    var difficultySetting;
    var wins = 0;
    var losses = 0;

    function clearCookies() {
        console.log("Clear cookies");
    }

    // change Ext stores to simple objects
    var difficultyStore = {
        fields : [ 'id','desc' ],
        data: [
            {"id": "0", "desc": "Cadet"},
            {"id": "1", "desc": "Detective"},
            {"id": "2", "desc": "Master Sleuth"}
        ]
    };


    // ---------------------- Some public methods  ----------------------------------
    return {
        getGameCount: function() {
            return (wins + losses);
        },
        register: function() {
            // Pop up a window with registration.  
            getCookies();
            regWin.show();
            
        },
        getName: function() {
            return name;
        },
        setName: function(n) {
            name = n;
            // TODO: set Cookie with Detective Name
            return name;
        },
        setDifficultySetting: function(s) {
            difficultySetting = s;
            // TODO: set cookie with difficultSetting
            return difficultySetting;
        },
        getDifficultySetting: function() {
            return difficultySetting;
        },
        win: function() {
            wins++;
            // TODO: set cookie with win count
            return wins;
        },
        lose: function() {
            losses++;
            // TODO: set cookie with loss count
            return losses;
        },
        clear: function() {
            // whack related cookies
            clearCookies();
            wins = 0;
            losses = 0;
            name = "";
            difficultySetting = 0;
        }
        
    } // end return of public object

}();
