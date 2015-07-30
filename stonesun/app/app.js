var Grapevine = function () {

    // Private vars
    var impaired = false;
    var maxitems = 12;
    var mastercount = 0;
    var items = [];  // Line items in 

    var classtypes = [
        "text-muted",
        "text-primary",
        "text-warning",
        "text-primary",
        "text-info",
        "text-warning",
        "text-danger",
        "text-success",
        "text-warning",
        "text-primary",
        "text-warning",
        "text-info",
        "text-danger",
        "text-success",
        "text-info"
    ];
    // ---------------------- Some private methods ----------------------------------
    // This function returns 'true' if the case was not solvable 
    function formatLine(str) {
        var retval = "<p class=\"" + classtypes[mastercount] + "\">" + str + "</p>";
        mastercount++;
        return mastercount;
    }

    // Return public interface
    return {
        addItem: function(str) {
                 items.push(formatLine(str));
                 if ( items.length > maxitems) {
                         items.shift();
                 }
            return true;
        },
        refreshItems: function() {
            var htmlstr;
            var i = 0;
            console.log("items length " + items.length);
            for ( ; i < items.length; i++) { htmlstr = htmlstr.concat(items[i]); }
            $("#ssglobal").html(htmlstr);
            return htmlstr;
        },
        clear: function() {
            items = [];
            refreshItems();
            return true;
        }
    }; // end return of public object

}();
