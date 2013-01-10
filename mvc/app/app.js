Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});
Ext.Loader.setPath('Ext', 'ext/src');
Ext.Loader.setPath('Ext.ux', 'ext/examples/ux');

var app; //global
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
    // controllers: ["Main", "Card", "Detective", "Main", "Scenario", "Suspect" ],
    // models: ["Answer","Questions","Scene","Suspect","Weapon"],
    // stores: ["Answer","Questions","Scene","Suspect","Weapon"],
    views: ["Main","Card","Viewport", "About", "Rules"],
    autoCreateViewport: true,
    launch: function(){
        app = this;
    }
});
