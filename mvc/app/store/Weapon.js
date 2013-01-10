Ext.define('SeventiesDetective.store.Weapon',{
	extend: 'Ext.data.Store',
	requires: 'SeventiesDetective.model.Weapon',
	config:
           {
            model:'SeventiesDetective.model.Weapon'
        },
        data:[
        	{ name: ".38 revolver"},
            { name: ".45 automatic"}
        ]
})