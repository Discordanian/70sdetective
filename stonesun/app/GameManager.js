module.export = {
	GameManager : function () {
		var first = true;
		var impaired = false;
        var Band = require('./Band.js');
        var WGO = require('./WGO.js');
        var Grapevine = require('./Grapevine.js');

		var impairl = function(b) {
		    WGO.impair(!!b);
		    WGO.refresh();
		    Grapevine.impair(!!b);
		    Grapevine.refresh();
		    Band.impair(!!b);
		    Band.refresh();
		    return impaired;
		};

		var restart = function() {
		    Band.clear();
		    WGO.clear();
		    Grapevine.clear();

		    /* Only bind these events on first pass */
		    if (first) {
			first=false;
			$("#title").click(function()      { Band.incDate(); });
			$("#about").click(function()      { Band.drugoffer("lsd",true); });
			$("#new_game").click(function()   { restart(); });
			$("#tours").click(function()      { Grapevine.otherSong(); Grapevine.refresh(); });
			$("#charts").click(function()     { Grapevine.addItem("You are on the charts"); Grapevine.refresh(); });
			$("#how_to_play").click(function(){ impaired = !impaired; impairl(impaired); });
			$("#releases").click(function()   { WGO.addItem("Releases selected"); WGO.refresh(); });
			$("#drugs").click(function()      { Band.drugoffer("lsd",false); });
		    }

		    return true;
		};

	    // Return public interface
	    return {
		whatever: function() {
		    return true;
		},
		init: function() {
		    return restart();
		},
		impair: function(b) {
		    return impairl(b);
		}
	    }; // end return of public object

	}
};
