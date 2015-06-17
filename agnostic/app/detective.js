// Detective Singleton
Detective = function() {

    // Private vars
    var name;
    var difficultySetting;
    var wins = 0;
    var losses = 0;
    var exdays = 30; // Number of days to default cookie life span

    var difficultyStore = {
        fields: ['level', 'desc'],
        data: [{
            "level": "0",
            "desc": "Cadet"
        }, {
            "level": "1",
            "desc": "Detective"
        }, {
            "level": "2",
            "desc": "Master Sleuth"
        }]
    };


    // ---------------------- Some private methods ----------------------------------
    function setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }


    function clearCookies() {
        setCookie("Detective_Name", "");
        setCookie("Detective_DifficultySetting", "");
        setCookie("Detective_Wins", "");
        setCookie("Detective_Losses", "");

    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function getCookies() {
        name = getCookie("Detective_Name");
        console.log("Retrieved Cookie for name " + name);
        difficultySetting = getCookie("Detective_DifficultySetting");
        difficultySetting = (difficultySetting) ? difficultySetting : '0';
        console.log("Retrieved Cookie for difficulty " + difficultySetting);
        wins = getCookie("Detective_Wins");
        console.log("Retrieved Cookie for wins " + wins);
        losses = getCookie("Detective_Losses");
        console.log("Retrieved Cookie for losses " + losses);
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

    }; // end return of public object

}();
