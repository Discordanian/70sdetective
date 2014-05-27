// Require suspects.js
var detectiveApp = angular.module('detectiveApp',[]);

detectiveApp.controller('detectiveCtrl', function($scope) {
});

detectiveApp.controller('maleSuspectCtrl', function($scope) {
    $scope.males    = Suspect.getSuspectArray('male');
});

detectiveApp.controller('femaleSuspectCtrl', function($scope) {
    $scope.females  = Suspect.getSuspectArray('female');
});

detectiveApp.controller('allSuspectCtrl', function($scope) {
    $scope.suspects  = Suspect.getSuspectArray('all');
});

