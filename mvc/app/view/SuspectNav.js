Ext.define('SeventiesDetective.view.SuspectNav',{
	extend:'Ext.panel.Panel',
	requires: ['SeventiesDetective.view.Card','SeventiesDetective.view.SuspectToolbar'],
	xtype:'SuspectNav',
    layout :'fit',
	config:{
	    dockedItems: [
	    	{ xtype: 'suspecttoolbar'}
	    ],
	    items: [ 
	    	{
	    		xtype: 'panel',
	    		layout: 'card',
	            width: 510,
	            height: 200,
	            html: '<h1>Choose a suspect!</h1>',
	            items: [
	            	{
	            		xtype:'card'
	            		// html:"Take an assignment already!"
	            	}
	            ]
	    	}
	     ]
	},
	
})