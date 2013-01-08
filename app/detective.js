Detective = function() {

    // Private vars
    var name;
    var difficultySetting;
    var wins = 0;
    var losses = 0;

    var difficultyStore = Ext.create('Ext.data.Store', {
        fields : [ 'level','desc' ],
        data: [
            {"level": "0", "desc": "Cadet"},
            {"level": "1", "desc": "Detective"},
            {"level": "2", "desc": "Master Sleuth"}
        ]
    });

    var difficultyCombo = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Choose Difficulty',
        store: difficultyStore,
        queryMode: 'local',
        displayField: 'desc',
        valueField: 'level',
        emptyValue: 0
    });

    // Being a bit pedantic here and declaring the field
    var nameField = Ext.create('Ext.form.field.Text', {
        name: 'detective_name',
        fieldLabel: 'Detective Name',
        allowBlank: false,
        defaultText: 'Enter Your Name Here, Gumshoe'
    });

    // Create a registration form
    var registerForm = Ext.create('Ext.form.Panel', {
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [
                nameField, difficultyCombo
            ],
        buttons: [{
            text: 'Register/Close',
            handler: function() {
                if (nameField.isValid()) {
                    Ext.util.Cookies.set("Detective_Name", nameField.getValue());
                    Ext.util.Cookies.set("Detective_DifficultySetting", difficultyCombo.getValue());
                    regWin.hide();
                } else {
                    var msg = "The desk sergant bellows, \"I'm not sure how they do things where you're from, but here we do it by the book!  Sign your name and get your assignment.\"";
                    Ext.Msg.alert("GUMSHOE!", msg);
                }
            }
        },{
            text: 'Clear',
            handler: function() {
                clearCookies();
                nameField.setValue("");
            }
        }]
    });

    var regWin = Ext.create('widget.window', {
        height: 400,
        width: 400,
        x: 550,
        y: 550,
        title: 'Detective Registration',
        closable: false,
        plain: true,
        layout: 'fit',
        border: true,
        items: [ registerForm ]
    });
    
    // ---------------------- Some private methods ----------------------------------
    function clearCookies() {
        Ext.util.Cookies.clear("Detective_Name");
        Ext.util.Cookies.clear("Detective_DifficultySetting");
        Ext.util.Cookies.clear("Detective_Wins");
        Ext.util.Cookies.clear("Detective_Losses");
    
    }

    function getCookies() {
            name                = Ext.util.Cookies.get("Detective_Name");
            nameField.setValue(name);
            Ext.log("Retrieved Cookie for name " + name);
            difficultySetting   = Ext.util.Cookies.get("Detective_DifficultySetting");
            difficultySetting   = (difficultySetting)? difficultySetting : 0;
            Ext.log("Retrieved Cookie for difficulty " + difficultySetting);
            difficultyCombo.setValue(difficultySetting);
            wins                = Ext.util.Cookies.get("Detective_Wins");
            Ext.log("Retrieved Cookie for wins " + wins);
            losses              = Ext.util.Cookies.get("Detective_Losses");
            Ext.log("Retrieved Cookie for losses " + losses);
    }



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
