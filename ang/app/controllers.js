// Require suspects.js
var detectiveApp = angular.module('detectiveApp',['ngCookies']);

detectiveApp.filter('males', function() {
    return function(suspectArray) {
        var index = 0;
        var retVal = [];
        for (index = 0; index < suspectArray.length; index++) {
            if (suspectArray[index].id > 0 && suspectArray[index].id < 11) {
                retVal.push(suspectArray[index]);
            } // end if
        } // end for
        return retVal;
    }
});

detectiveApp.filter('females', function() {
    return function(suspectArray) {
        var index = 0;
        var retVal = [];
        for (index = 0; index < suspectArray.length; index++) {
            if (suspectArray[index].id > 10 && suspectArray[index].id < 21) {
                retVal.push(suspectArray[index]);
            } // end if
        } // end for
        return retVal;
    }
});

/* To manage who the detective is.  Name, level etc... */
detectiveApp.controller('detectiveCtrl', function($scope, $cookies) {
    $cookies.detective_name  = $cookies.detective_name  || "Kurt";
    $cookies.detective_level = $cookies.detective_level || "4";
    $scope.detective_name  = $cookies.detective_name;
    $scope.detective_level = $cookies.detective_level;
});

detectiveApp.controller('suspectCtrl', function($scope ) {
    window.suspectCtrl = $scope;
    
    $scope.suspects  = Suspect.getSuspectArray('all');
});

detectiveApp.controller('locationCtrl', function($scope) {
    $scope.locations  = Location.getLocations();
});

detectiveApp.controller('questionCtrl', function($scope) {
    $scope.questions  = Question.getQuestions([1,2,3,13,14]);
});
