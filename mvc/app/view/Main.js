Ext.define('SeventiesDetective.view.Main', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'SeventiesDetective.view.StatementsForm',
        'SeventiesDetective.view.SuspectNav',
        'SeventiesDetective.view.Rules',
        'SeventiesDetective.view.About'
    ],
    layout: 'border',
    items: [{
        region: 'north',
        id: 'north',
        title: '70s Detective',
        xtype: 'panel',
        collapsed: true,
        collapsible: true,
        height: 340,
        bodyPadding: 10,
        items: [
            { xtype: 'about'}
        ],
        autoScroll: true,
        autoHeight: true,
        border: true,
        margins: '0 0 5 0'
    }, {
        region: 'west',
        id: 'west',
        collapsible: true,
        collapsed: true,
        title: 'How to Play',
        bodyPadding: 10,
          items: [
            { xtype: 'rules'}
        ],
        autoScroll: true,
        border: true,
        width: 450
        // could use a TreePanel or AccordionLayout for navigational items
    }, {
        region: 'south',
        title: 'Statements from Suspects',
        collapsible: true,
        items: [ 
            {
                xtype: 'StatementsForm' 
            }
        ],
        layout: 'fit'
    }, {
        region: 'center',
        layout: 'fit',
        items: [  
            { 
                xtype: 'SuspectNav'
            }
        ]
    }]
});