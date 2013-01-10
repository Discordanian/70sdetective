Ext.define('SeventiesDetective.model.Weapon',{
	extend: 'Ext.data.Model',
    requires:'Ext.data.proxy.Memory',
	config:{
		fields:[
			{ name:'name', 		 type:'string'}
		]
		idProperty: 'name',
		proxy:{
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'name'
            }
		}
	}

})

