var CardController = function ($scope, $state, TrelloFactory, moment) {
	"use strict";

	angular
		.element('.js-card-template')
		.modal('show')
		.modal({
			observeChanges: true,
			onHide:         function () {
				$state.go(`/:board.list`);
			},
			onHidden:       function () {
				//$scope.$parent.loadingPage = false;
				angular.element('.js-card-template').remove();
			}

		});

	TrelloFactory.cards.id.get({ id: $state.params.card }).$promise.then(function (data) {
		$scope.card = data;
		$scope.card.members = [];

		angular.forEach($scope.card.idMembers, function (idMember) {
			$scope.card.members.push(TrelloFactory.members.id.get({ id: idMember }));
		});

		return TrelloFactory.cards.attachments.query({ id: $state.params.card }).$promise;
	}).then(function (data) {
		$scope.cardAttachments = data;

		return TrelloFactory.cards.checklists.query({ id: $state.params.card }).$promise;
	}).then(function (data) {
		$scope.cardChecklists = data;

		return TrelloFactory.cards.actions.query({ id: $state.params.card }).$promise;
	}).then(function (data) {
		$scope.cardActions = _.where(data, { type: "commentCard" });
		$scope.comments = false;

		if ($scope.cardActions.length) {
			$scope.comments = [];

			angular.forEach($scope.cardActions, function (action) {
				TrelloFactory.actions.id.get({ id: action.id }, function (data) {
					$scope.comments.push(data);
				});

			});
		}

		$scope.$parent.loadingPage = false;
	});
};
