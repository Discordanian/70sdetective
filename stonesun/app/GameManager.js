var GameManager = function () {

    // Return public interface
    return {
        whatever: function() {
            return true;
        },
        init: function() {
                      Band.clear();
                      WGO.clear();
                      Grapevine.clear();
            return true;
        }
    }; // end return of public object

}();
