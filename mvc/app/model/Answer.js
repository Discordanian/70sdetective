Ext.define('SeventiesDetective.model.Answer',{
	extend: 'Ext.data.Model',
    requires:'Ext.data.proxy.Memory',
	config:{
		fields:[
			{ name:'answer', type:'string'}
		],
		idProperty: 'answer',
		proxy:{
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'answer'
            }
		}
	}

})

