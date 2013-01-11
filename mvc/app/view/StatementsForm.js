Ext.define('SeventiesDetective.view.StatementsForm',{
	extend:'Ext.form.Panel',
	requires:'Ext.layout.container.Column',
	xtype:'StatementsForm',
    layout: 'column', // layout is NOT on conifg anymore??!
	config:{
        fieldDefaults: {
            labelWidth: 110, // label settings here cascade unless overridden
        },
        items:[],
        frame: false,
        bodyStyle: 'padding:5px 5px 0',
        defaults: {
            bodyPadding: 1
        }
	},
    constructor: function(config) {
    	//for loop get name create textfield
		getItems=function(c){
			var items=[];
			var from = c ? 1 : 11;
			var to = c ? 11 : 21;
			for (var i=from;i<to;i++){
				items.push(
				 	{
				 		xtype:'textareafield',
				 		name: 'suspect'+i,
		                id: 'suspect'+i,
		                fieldLabel: i + " " + Ext.getStore('Suspect').getAt(i).raw['name']
			 		}
		      	)
			}
			return items;
		};

    	columns=[];
    	for (var c=0; c<2; c++){
    		var gender=c ? 'Men' : 'Women';
			columns.unshift(
				{
				 	xtype:'fieldset',
		            columnWidth: 0.5,
		            title: gender,
		            collapsible: false,
		            defaultType: 'textareafield',
		            defaults: {height: 20, anchor: '100%'},
		            layout: 'anchor',
		            items: getItems(c)
		        }
			)
		}	
    	this.setItems(columns);
        this.callParent(); 
       	return this.initConfig(config);
    }
})




