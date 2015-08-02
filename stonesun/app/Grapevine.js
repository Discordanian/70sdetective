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


    var artists = [
            "The Bing Bangs",
            "Modern Shoe",
            "Team Gordon",
            "Corey Doctorow",
            "Kurt (not that one, the other one)",
            "My Underwear",
            "Internal Issues",
            "Cat Video Club",
            "Navi is my Spirit Guide",
            "Blue Chicken Nugget",
            "Yarn Pornography",
            "6 cylinder Makeup",
            "The Burlap Peanut",
            "Tequilla Mockingbird",
            "Anarkey in the Library",
            "Brother Tshober"
            ];

    var songtitles = [
            "This is a Tune",
            "Yodels make me happy",
            "It's a will roll dammit",
            "I like popcorn",
            "My Electrician Made me Sad",
            "RNG in Hearthstone, FTW",
            "My third belly button",
            "Watching YouTube at Work",
            "The Triforce is pointy",
            "They grow from spells",
            "I played a mage and I liked it",
            "I still play old games",
            "Java aint javascript",
            "50 reasons why Java is a fad",
            "The best part of me is left handed",
            "It takes a few years to listen to my playlist",
            "Tangential Cold",
            "Throwing a quarter and wishing you well",
            "My google calendar is ridiculous",
            "Remember when people lined up to buy Windows 95?  Crazy!",
            "Richard Stallman was my baby sitter",
            "Looking to Train?",
            "You do not have the proper stone",
            "I am not ready",
            "Buggy video games.  What's up with that?",
            "Is Call of Duty still a thing?",
            "I have a million balls and I am the size of a peanut",
            "Because, you know, the baby"
            ];

    // ---------------------- Some private methods ----------------------------------
    // This function returns 'true' if the case was not solvable 
    function formatLine(str) {
        var retval = "<p class=\"" + classtypes[(mastercount % classtypes.length)] + "\">" + str + "</p>";
        mastercount++;
        return retval;
    }

    // Return public interface
    return {
        otherSong: function() {
            var artist_index = mastercount % artists.length;
            var song_index = mastercount % songtitles.length;
            var release_notice = "New single released by '"+ artists[artist_index] +"' called '" + songtitles[song_index] + "'";
            return this.addItem(release_notice);
        },
        addItem: function(str) {
                 items.push(formatLine(str));
                 if ( items.length > maxitems) {
                         items.shift();
                 }
            return true;
        },
        refresh: function() {
            var htmlstr = "";
            var i = 0;
            console.log("items length " + items.length);
            for ( ; i < items.length; i++) { 
                // console.log("Preparing to write string to Grapevine : " + items[i]);
                    htmlstr = htmlstr.concat(items[i]); 
            }
            $("#ssglobal").html(htmlstr);
            return true;
        },
        clear: function() {
            items = [];
            artists.shuffle();
            songtitles.shuffle();
            this.refresh();
            return true;
        }
    }; // end return of public object

}();
