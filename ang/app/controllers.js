// Require suspects.js
var detectiveApp = angular.module('detectiveApp',[]);

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

detectiveApp.controller('detectiveCtrl', function($scope) {
});

/*
detectiveApp.controller('maleSuspectCtrl', function($scope) {
    $scope.males    = Suspect.getSuspectArray('males');
});

detectiveApp.controller('femaleSuspectCtrl', function($scope) {
    $scope.females  = Suspect.getSuspectArray('females');
    // $('#alibi_18').html("Change");
});
*/

detectiveApp.controller('suspectCtrl', function($scope) {
    $scope.suspects  = Suspect.getSuspectArray('all');
});

detectiveApp.controller('locationCtrl', function($scope) {
    $scope.locations  = Location.getLocations();
});

detectiveApp.controller('questionCtrl', function($scope) {
    $scope.questions  = Question.getQuestions([1,2,3,13,14]);
});
