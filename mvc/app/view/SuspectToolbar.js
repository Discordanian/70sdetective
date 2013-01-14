Ext.define('SeventiesDetective.view.SuspectToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'suspecttoolbar',
    config: {
        dock: 'top',
        columns: 4,
        title: 'Suspects',
        defaults: {
            align: 'center'
        },
        items: []
    },
    constructor: function (config) {
        tb_items = [{
            xtype: 'button',
            text: 'Get Assignment',
            id: 'init',
            width: '10px',
            handler: function () {
                app.reset_game();
            }
        }, {
            xtype: 'button',
            text: 'Register',
            id: 'register',
            width: '10px',
            // scope: this,
            handler: function () {
                Ext.getController('Detective').register();
            }
        }];
        for (var s = 1; s <= 20; s++) {
            tb_items.push({
                xtype: 'button',
                text: s,
                width: '10px',
                id: 'nav' + Number(s).zeroPad(2),
                handler: function () {
                    // TODO Ext.getCmp(getSuspectExtID(this.text)).setValue(Scenerio.getSuspectAlibi(this.text));
                    Ext.getCmp('theSuspectNav').getLayout().setActiveItem(this.text);
                }
            });
        }
        this.setItems(tb_items);
        this.initConfig(config);
        this.callParent();
    }
});