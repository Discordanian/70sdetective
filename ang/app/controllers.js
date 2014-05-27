// Require suspects.js
var detectiveApp = angular.module('detectiveApp',[]);

detectiveApp.controller('detectiveCtrl', function($scope) {
    $scope.males    = Suspect.getSuspectArray('male');
    $scope.females  = Suspect.getSuspectArray('male');
    $scope.suspects = Suspect.getSuspectArray('all');
});
