var GameManager = function () {
        var first = true;
        var restart = function() {
              console.log("Restart called " + first);
              Band.clear();
              WGO.clear();
              Grapevine.clear();
              if (first) {
                      first=false;
                      $("#title").click(function()    { Band.incDate(); });
                      $("#about").click(function()    { Band.drugoffer("lsd",true); });
                      $("#new_game").click(function() { restart(); });
                      $("#tours").click(function()    { Grapevine.otherSong(); Grapevine.refresh(); });
                      $("#charts").click(function()   { Grapevine.addItem("You are on the charts"); Grapevine.refresh(); });
                      $("#releases").click(function() { WGO.addItem("Releases selected"); WGO.refresh(); });
                      $("#drugs").click(function()    { Band.drugoffer("lsd",false); });
              }
            return true;
        }

    // Return public interface
    return {
        whatever: function() {
            return true;
        },
        init: function() {
                      return restart();
        }
    }; // end return of public object

}();
