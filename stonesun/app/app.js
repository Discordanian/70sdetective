// Add shuffle function to all array objects
Array.prototype.shuffle = function (){ 
    for(var rnd, tmp, i=this.length; i; rnd=parseInt(Math.random()*i), tmp=this[--i], this[i]=this[rnd], this[rnd]=tmp);
};

function rot13(s) {
  return s.replace(/[A-Za-z]/g, function (c) {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
           "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)
    );
  } );
};

// Return random number 0 -> target
function random(target) {
        return Math.floor(Math.random() *target);
};

// Add zeroPad to all numbers
Number.prototype.zeroPad = function (zeros){
    var str = String(this); for(var n = str.length; n < zeros; n++) {str = '0' + str;} return str;
};

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

function setDiv(name,value) {
	if (document.getElementById(name)) {
		document.getElementById(name).innerHTML = value;
		return value;
	} else  { return ""; }
}
function getDiv(name) {
	if (document.getElementById(name)) {
		return document.getElementById(name).innerHTML;
	} else  { return ""; }
}

