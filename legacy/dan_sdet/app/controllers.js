// Require suspects.js
var detectiveApp = angular.module('detectiveApp.controllers',[]);

/*detectiveApp.controller('detectiveCtrl', function($scope, Suspects) {
});*/

detectiveApp.controller('SuspectCtrl', function($scope, Suspects) {
	window.SuspectCtrl = $scope;
	$scope = Suspects.getAll();
	debugger
    $scope.males    = $scope.getSuspectArray('males');
    $scope.females  = $scope.getSuspectArray('females');

    $scope.sayAlibi = function(a,b){
    	debugger
    	for(var i=0; i < SuspectCtrl.males.length; i++) {
			console.log(SuspectCtrl.males[i])
		}
    }
    /*$scope.setAlibi = Suspects.setAlibi(0,'test');
    $scope.setAlibi = Suspects.getAlibi(0)*/
});
/*
detectiveApp.controller('femaleSuspectCtrl', function($scope, Suspects) {
    
    // $('#alibi_18').html("Change");
});
*/
/*detectiveApp.controller('allSuspectCtrl', function($scope, Suspects) {
    $scope.suspects  = Suspects.getSuspectArray('all');
});*/

detectiveApp.controller('locationCtrl', function($scope, Location) {
	window.locationCtrl = $scope;
    $scope.locations  = Location.getLocations();
});

detectiveApp.controller('questionCtrl', function($scope, Question) {
	window.questionCtrl = $scope;
    $scope.questions  = Question.getQuestions([1,2,3,13,14]);
});
