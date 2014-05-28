// Require suspects.js
var detectiveApp = angular.module('detectiveApp',[]);

detectiveApp.controller('detectiveCtrl', function($scope) {
});

detectiveApp.controller('maleSuspectCtrl', function($scope) {
    $scope.males    = Suspect.getSuspectArray('males');
});

detectiveApp.controller('femaleSuspectCtrl', function($scope) {
    $scope.females  = Suspect.getSuspectArray('females');
});

detectiveApp.controller('allSuspectCtrl', function($scope) {
    $scope.suspects  = Suspect.getSuspectArray('all');
});

detectiveApp.controller('locationCtrl', function($scope) {
    $scope.locations  = Location.getLocations();
});

detectiveApp.controller('questionCtrl', function($scope) {
    $scope.questions  = Question.getQuestions([1,2,3,13,14]);
});
