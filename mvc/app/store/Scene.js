Ext.define('SeventiesDetective.store.Scene',{
    extend: 'Ext.data.Store',
    requires: 'SeventiesDetective.model.Scene',
    model:'SeventiesDetective.model.Scene',
    data:[
                    {
                        id : 0,
                        name: 'the Art Show'
                    },
                    {
                        id : 1,
                        name: 'a Box at Theatre'
                    },
                    {
                        id : 2,
                        name: 'a Card Party'
                    },
                    {
                        id : 3,
                        name: 'the Docks'
                    },
                    {
                        id : 4,
                        name: 'the Embassy'
                    },
                    {
                        id : 5,
                        name: 'a Factory'
                    }
                    
    ]
})