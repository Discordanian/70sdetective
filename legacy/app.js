Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false
});
Ext.Loader.setPath('Ext', 'extjs/src');
Ext.Loader.setPath('Ext.ux', 'extjs/examples/ux');

// Add shuffle function to all array objects
Array.prototype.shuffle = function (){ 
    for(var rnd, tmp, i=this.length; i; rnd=parseInt(Math.random()*i), tmp=this[--i], this[i]=this[rnd], this[rnd]=tmp);
};

// Add zeroPad to all numbers
Number.prototype.zeroPad = function (zeros){
    var str = String(this); for(var n = str.length; n < zeros; n++) {str = '0' + str;} return str;
};

// Application specific components and extensions
Ext.Loader.setPath('Edetect', 'app');

/* Define a 'console' object for IE */
if (typeof console !== 'object') {
    console = {
        log:            function() { },
        debug:          function() { },
        info:           function() { },
        warn:           function() { },
        error:          function() { },
        assert:         function() { },
        clear:          function() { },
        dir:            function() { },
        dirxml:         function() { },
        trace:          function() { },
        group:          function() { },
        groupCollapsed: function() { },
        groupEnd:       function() { },
        time:           function() { },
        timeEnd:        function() { },
        profile:        function() { },
        profileEnd:     function() { },
        count:          function() { },
        exception:      function() { },
        table:          function() { }
    };
}

