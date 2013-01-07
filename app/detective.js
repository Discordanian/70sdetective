Detective = function() {

    // Private vars
    var name;
    var difficultySetting;
    var wins = 0;
    var losses = 0;
    // ---------------------- Some private methods ----------------------------------
    function clearCookies() {
        Ext.util.Cookies.clear("Detective_Name");
        Ext.util.Cookies.clear("Detective_DifficultySetting");
        Ext.util.Cookies.clear("Detective_Wins");
        Ext.util.Cookies.clear("Detective_Losses");
    
    }

    function getCookies() {
            name                = Ext.util.Cookies.get("Detective_Name");
            difficultySetting   = Ext.util.Cookies.get("Detective_DifficultySetting");
            wins                = Ext.util.Cookies.get("Detective_Wins");
            losses              = Ext.util.Cookies.get("Detective_Losses");
    }



    // ---------------------- Some public methods  ----------------------------------
    return {
        getGameCount: function() {
            return (wins + losses);
        },
        register: function() {
            // Pop up a window with registration.  
            getCookies();
        },
        getName: function() {
            return name;
        },
        setName: function(n) {
            name = n;
            Ext.util.Cookies.set("Detective_Name", name);
            return name;
        },
        setDifficultySetting: function(s) {
            difficultySetting = s;
            Ext.util.Cookies.set("Detective_DifficultySetting", difficultySetting);
            return difficultySetting;
        },
        getDifficultySetting: function() {
            return difficultySetting;
        },
        win: function() {
            wins++;
            Ext.util.Cookies.set("Detective_Wins", wins);
            return wins;
        },
        lose: function() {
            losses++;
            Ext.util.Cookies.set("Detective_Wins", losses);
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
