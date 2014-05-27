// Singleton 'Question'
Question = function() {
    var questions = [
                        { 
                          q : "What is the air-speed velocity of an unladen swallow?", 
                          a : "I do not know." },
                        { 
                          q : "Which side of town did the murderer flee to? (East/West)", 
                          a : "I do not know." },
                        { 
                          q : "What gender was the murderer? (Male/Female)", 
                          a : "I do not know." },
                        { 
                          q : "What part of town did the murderer flee to? (Uptown/Midtown/Downtown)", 
                          a : "I do not know." },
                        { 
                          q : "Was the murder weapon a .38? (Yes/No)", 
                          a : "I do not know." },
                        { 
                          q : "Where was the .38 hidden? (Location)", 
                          a : "I do not know." },
                        { 
                          q : "Where was the .45 hidden? (Location)", 
                          a : "I do not know." },
                        { 
                          q : "Which location has only 3 suspects? (Location)", 
                          a : "I do not know." },
                        { 
                          q : "Did the murderer flee to one of 3 locations? (Yes/No)",                  
                          a : "I do not know." },
                        { 
                          q : "What side of town were you on? (East/West)",                             
                          a : "I do not know." },
                        { 
                          q : "Which part of town were you in? (Uptown/Midtown/Downtown)",              
                          a : "I do not know." },
                        { 
                          q : "Were you in one of 3 locations? (Yes/No)",                               
                          a : "I do not know." },
                        { 
                          q : "Were you where a weapon was hidden? (Yes/No)",                           
                          a : "I do not know." },
                        { 
                          q : "Are the prints on the .38 left or right handed? (Left/Right)",           
                          a : "I do not know." },
                        { 
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


    // Return public interface
    return {
        /* Return the line with the question */
        getQuestion: function(id) {
            return questions[safeID(id)];
        },
        getQuestions: function(arr) {
            var retval = [];
            for (index = 0; index < arr.length; ++index) {
                retval.push(getQuestion(arr[index]));
            }
            return retval;
        }
    } // end return of public object

}();
