var BoardsController = function ($scope, TrelloFactory) {
	"use strict";
	$scope.showClosed = false;

	$scope.CreateBoard = function (event) {
		event.preventDefault();

		angular
			.element('.js-modal-create')
			.modal('show')
			.modal({
				observeChanges: true,
				onHide:         function () {
					//$state.go(`/:board.list`);
				},
				onHidden:       function () {
					//angular.element('.js-modal-create').remove();
				}

			});

		/*var board = new TrelloFactory.boards.self();
		 board.name = 'Тестовая таблицы';
		 console.log(board.$save());*/
	};

	$scope.SaveBoard = function (event) {
		var board = new TrelloFactory.boards.self();

		console.log(board);
	};

	TrelloFactory.members.boards.query({ id: 'me' }, function (data) {
		$scope.boards = _.where(data, { closed: false });

		/*angular.forEach($scope.boards, function (board) {
		 board.members = [];

		 angular.forEach(board.memberships, function (membership) {
		 board.members.push(TrelloFactory.members.get({ id: membership.idMember }));
		 });
		 });*/
	});
};
