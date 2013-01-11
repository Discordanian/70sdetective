Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});
Ext.Loader.setPath('Ext', 'ext/src');
Ext.Loader.setPath('Ext.ux', 'ext/examples/ux');

app = 1; //global
debug = (window.location.search.indexOf('debug') ==1) ? true : false;

// Add shuffle function to all array objects
Array.prototype.shuffle = function (){ 
    for(var rnd, tmp, i=this.length; i; rnd=parseInt(Math.random()*i), tmp=this[--i], this[i]=this[rnd], this[rnd]=tmp);
};

// Add zeroPad to all numbers
Number.prototype.zeroPad = function (zeros){
    var str = String(this); for(var n = str.length; n < zeros; n++) {str = '0' + str;} return str;
};

Ext.application({
    name: 'SeventiesDetective',
    views: [
        "Main",
        "Card",
        "About", 
        "Rules",
        "StatementsForm",
        "SuspectNav"
    ],
    stores: [
        // "Answer",
        // "Questions",
        // "Scene",
        "Suspect",
        "Weapon"
    ], 
    models: [
        // "Answer",
        // "Questions",
        // "Scene",
        "SuspectToolbar",
        "Suspect",
        "Weapon"
    ],
    controllers: [
        // "Main", 
        // "Card", 
        // "Detective", 
        "Scenario", 
        // "Suspect" 
    ],
     
  
    // autoCreateViewport: true,
    launch: function(){
        app = this;
        Ext.create('SeventiesDetective.view.Main');
    }
});
