var BoardsController = function ($scope, TrelloFactory) {
	"use strict";
	$scope.showClosed = false;

	TrelloFactory.members.boards.query({ id: 'me' }, function (data) {
		$scope.boards = _.where(data, { closed: false });
		$scope.$parent.loadingPage = false;
		/*angular.forEach($scope.boards, function (board) {
		 board.members = [];

		 angular.forEach(board.memberships, function (membership) {
		 board.members.push(TrelloFactory.members.get({ id: membership.idMember }));
		 });
		 });*/
	});
};
