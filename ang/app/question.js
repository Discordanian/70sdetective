// Singleton 'Question'
Question = function() {
    var questions = [
                        { 
                          id: 0,
                          q : "What is the air-speed velocity of an unladen swallow?", 
                          a : "I do not know." },
                        { 
                          id: 1,
                          q : "Which side of town did the murderer flee to? (East/West)", 
                          a : "I do not know." },
                        { 
                          id: 2,
                          q : "What gender was the murderer? (Male/Female)", 
                          a : "I do not know." },
                        { 
                          id: 3,
                          q : "What part of town did the murderer flee to? (Uptown/Midtown/Downtown)", 
                          a : "I do not know." },
                        { 
                          id: 4,
                          q : "Was the murder weapon a .38? (Yes/No)", 
                          a : "I do not know." },
                        { 
                          id: 5,
                          q : "Where was the .38 hidden? (Location)", 
                          a : "I do not know." },
                        { 
                          id: 6,
                          q : "Where was the .45 hidden? (Location)", 
                          a : "I do not know." },
                        { 
                          id: 7,
                          q : "Which location has only 3 suspects? (Location)", 
                          a : "I do not know." },
                        { 
                          id: 8,
                          q : "Did the murderer flee to one of 3 locations? (Yes/No)",                  
                          a : "I do not know." },
                        { 
                          id: 9,
                          q : "What side of town were you on? (East/West)",                             
                          a : "I do not know." },
                        { 
                          id: 10,
                          q : "Which part of town were you in? (Uptown/Midtown/Downtown)",              
                          a : "I do not know." },
                        { 
                          id: 11,
                          q : "Were you in one of 3 locations? (Yes/No)",                               
                          a : "I do not know." },
                        { 
                          id: 12,
                          q : "Were you where a weapon was hidden? (Yes/No)",                           
                          a : "I do not know." },
                        { 
                          id: 13,
                          q : "Are the prints on the .38 left or right handed? (Left/Right)",           
                          a : "I do not know." },
                        { 
                          id: 14,
                          q : "Are the prints on the .45 left or right handed? (Left/Right)",           
                          a : "I do not know." }
                    ];

    // ---------------------- Some private methods ----------------------------------
    // safeID provides safe array bounds checking.
    function safeID(id) {
        if (typeof id === 'undefined') {
            return 0;
        } 
        if (id < 0) {
            return 0;
        }
        if (id > 14) {
            return 0;
        }
        return id;
    }

    function getQ(id) {
            return questions[safeID(id)];
    }


    // Return public interface
    return {
        /* Return the line with the question */
        getQuestion: function(id) {
            return getQ(id);
        },
        getQuestions: function(arr) {
            var retval = [];
            for (index = 0; index < arr.length; ++index) {
                retval.push(getQ(arr[index]));
            }
            return retval;
        }
    } // end return of public object

}();
