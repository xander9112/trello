var UserController = function ($rootScope, $scope, $localStorage, $state, TrelloFactory) {
	"use strict";
console.log($state.params);
	TrelloFactory.members.id.get({ id: $state.params.id }, function (data) {
		$scope.user = data;

		console.log($scope.user);
	});
};
