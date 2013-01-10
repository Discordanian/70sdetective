Ext.define('SeventiesDetective.view.StatementsForm',{
	extend:'Ext.form.Panel',
	xtype:'StatementsForm',
	/*constructor:{
		   // Utility function to make the field labels
		   //TODO
        this.suspectFieldLabel = function(id) {
            var retVal;
            var did; // 'display id' should have used 'smoke'
            if(id < 10) {
                did = '0' + id;
            } else {
                did = id;
            }
            retVal = did + " : " + Suspect.getName(id);
            return retVal;
        }
	}*/
	config:{
        fieldDefaults: {
            labelWidth: 110, // label settings here cascade unless overridden
        },
        frame: false,
        bodyStyle: 'padding:5px 5px 0',
        layout: 'column', // arrange fieldsets side by side
        defaults: {
            bodyPadding: 1
        },
        items: [{
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',
            columnWidth: 0.5,
            title: 'Men',
            collapsible: false,
            defaultType: 'textareafield',
            defaults: {height: 20, anchor: '100%'},
            layout: 'anchor',
            items :[{
                fieldLabel: suspectFieldLabel(1),
                name: 'suspect01',
                id: 'suspect01'
            }, {
                fieldLabel: suspectFieldLabel(2),
                name: 'suspect02',
                id: 'suspect02'
            }, {
                fieldLabel: suspectFieldLabel(3),
                name: 'suspect03',
                id: 'suspect03'
            }, {
                fieldLabel: suspectFieldLabel(4),
                name: 'suspect04',
                id: 'suspect04'
            }, {
                fieldLabel: suspectFieldLabel(5),
                name: 'suspect05',
                id: 'suspect05'
            }, {
                fieldLabel: suspectFieldLabel(6),
                name: 'suspect06',
                id: 'suspect06'
            }, {
                fieldLabel: suspectFieldLabel(7),
                name: 'suspect07',
                id: 'suspect07'
            }, {
                fieldLabel: suspectFieldLabel(8),
                name: 'suspect08',
                id: 'suspect08'
            }, {
                fieldLabel: suspectFieldLabel(9),
                name: 'suspect09',
                id: 'suspect09'
            }, {
                fieldLabel: suspectFieldLabel(10),
                name: 'suspect10',
                id: 'suspect10'
            } ]
        }, {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: 'Women',
            collapsible: false,
            defaultType: 'textareafield',
            defaults: {height: 20, anchor: '100%'},
            layout: 'anchor',
            xtype:'fieldset',
            items :[{
                fieldLabel: suspectFieldLabel(11),
                name: 'suspect11',
                id: 'suspect11'
            }, {
                fieldLabel: suspectFieldLabel(12),
                name: 'suspect12',
                id: 'suspect12'
            }, {
                fieldLabel: suspectFieldLabel(13),
                name: 'suspect13',
                id: 'suspect13'
            }, {
                fieldLabel: suspectFieldLabel(14),
                name: 'suspect14',
                id: 'suspect14'
            }, {
                fieldLabel: suspectFieldLabel(15),
                name: 'suspect15',
                id: 'suspect15'
            }, {
                fieldLabel: suspectFieldLabel(16),
                name: 'suspect16',
                id: 'suspect16'
            }, {
                fieldLabel: suspectFieldLabel(17),
                name: 'suspect17',
                id: 'suspect17'
            }, {
                fieldLabel: suspectFieldLabel(18),
                name: 'suspect18',
                id: 'suspect18'
            }, {
                fieldLabel: suspectFieldLabel(19),
                name: 'suspect19',
                id: 'suspect19'
            }, {
                fieldLabel: suspectFieldLabel(20),
                name: 'suspect20',
                id: 'suspect20'
            } ]
        }]
	}
})




