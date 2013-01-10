Ext.define('SeventiesDetective.view.SuspectNav',{
	extend:'Ext.panel.Panel',
	xtype:'SuspectNav',
	requires:'SeventiesDetective.view.Card',
	config:{
	    layout :'fit',
	    dockedItems: [{
	        xtype: 'toolbar',
	        dock: 'top',
	        columns: 4,
	        title: 'Suspects',
	        defaults: { align: 'center' },
	        items: [
                {
                    text: 'Get Assignment',
                    id:  'init',
                    handler: function() {
                        app.reset_game();
                    }
                }, {
                    text: 'Register',
                    id:  'register',
                    // scope: this,
                    handler: function() {
                        Ext.getController('Detecive').register();
                    }
                }
       		]
	    }],
	    items: [ 
	    	{
	    		xtype: 'panel',
	    		layout: 'card',
	            width: 510,
	            height: 200,
	            html: '<h1>Choose a suspect!</h1>',
	            items: [
	            	{
	            		xtype:'card',
	            		html:"Take an assignment already!"
	            	}
	            ]
	    	}

	     ],
	     applyItems:function(){
	     	    for ( var s = 1; s <= 20; s++ ) {
            tb_items.push({
                text: s,
                id:  'nav' + Number(s).zeroPad(2),
                handler: function() {
                    Ext.getCmp(getSuspectExtID(this.text)).setValue(Scenerio.getSuspectAlibi(this.text));
                    suspect_picture.getLayout().setActiveItem(Number(this.text));
                }
            });

            suspect_cards.push(Ext.create('Edetect.card', {
                id: 'card' + Number(s).zeroPad(2),
                suspectId: s
            }));
        }


	     }	
	}
})