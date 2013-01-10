Ext.define('SeventiesDetective.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'SeventiesDetective.view.Main'
    ],

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Center Tab 1',
            xtype:'panel',
            items:[
            {
                xtype:'button',
                text:'loadview',
                height:'50px',
                width:'50px',
                listeners:{
                    click: function(){
                        Ext.Viewport.add(Ext.create('SeventiesDetective.view.Main'))
                    }
                }
            }]
        }]
    }]
});