Ext.define('SeventiesDetective.model.Suspect', {
	extend: 'Ext.data.Model',
	requires: 'Ext.data.proxy.Memory',
	config: {
		fields: [{
			name: 'id',
			type: 'number'
		}, {
			name: 'name',
			type: 'string'
		}, {
			name: 'occupation',
			type: 'string'
		}, {
			name: 'bio',
			type: 'string'
		}, {
			name: 'image',
			type: 'string'
		}, {
			name: 'handness',
			type: 'string'
		}, {
			name: 'questions',
			type: 'string'
		}],
		// hasMany:{ model:'Questions', name: 'questions'},
		idProperty: 'id',
		proxy: {
			type: 'memory',
			reader: {
				type: 'json',
				rootProperty: 'id'
			}
		}
	}
});