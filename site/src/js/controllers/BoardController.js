var BoardController = function ($scope, $state, TrelloFactory) {
	"use strict";

	$scope.board = TrelloFactory.boards.id.get({ id: $state.params.board }, function () {
		$scope.board.id = _.last($scope.board.shortUrl.split('/'));
	});

	$scope.lists = TrelloFactory.boards.lists.query({ id: $state.params.board });
};
