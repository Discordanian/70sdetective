Ext.define('SeventiesDetective.model.Scene',{
	extend: 'Ext.data.Model',
    requires:'Ext.data.proxy.Memory',
	config:{
		fields:[
			{ name:'id', 		 type:'number'},
			{ name:'name',       type:'string'}
		],
		idProperty: 'id',
		proxy:{
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'id'
            }
		}
	}

})

