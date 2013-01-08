Detective = function() {

    // Private vars
    var name;
    var difficultySetting;
    var wins = 0;
    var losses = 0;

    var NameLabel 


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
                {
                    fieldLabel: 'Detective Name',
                    name: 'detective_name',
                    allowBlank:false
                },{
                    fieldLabel: 'Difficulty Setting',
                    name: 'difficulty_setting',
                    xtype: 'numberfield'
                }
            ],
        buttons: [{
            text: 'Register',
            handler: function() {
                Ext.util.Cookies.set("Detective_Name", Ext.getCmp('detective_name'));
                Ext.Msg.alert("Information","Register Selected");
            }
        },{
            text: 'Clear',
            handler: function() {
                clearCookies();
                Ext.getCmp('detective_name').setValue("");
                Ext.getCmp('difficulty_setting').setValue("");
                Ext.Msg.alert("Information","Clear Selected");
                
            }
        },{
            text: 'Close',
            handler: function() {
                Ext.Msg.alert("Information","Close Selected");
                regWin.hide(); // 'Hide the window'
                
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
            console.log("Retrieved Cookie for name " + name);
            difficultySetting   = Ext.util.Cookies.get("Detective_DifficultySetting");
            wins                = Ext.util.Cookies.get("Detective_Wins");
            console.log("Retrieved Cookie for wins " + wins);
            losses              = Ext.util.Cookies.get("Detective_Losses");
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
