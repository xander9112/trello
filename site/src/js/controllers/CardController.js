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
				angular.element('.js-card-template').remove();
			}

		});

	TrelloFactory.cards.id.get({ id: $state.params.card }, function (data) {
		$scope.card = data;
		$scope.card.members = [];
		//console.log(data);


		//console.log('Разница в ', dateB.diff(dateC), 'миллисекунд');
		//console.log('Разница в ', dateB.diff(dateC, 'hours'), 'часов');

		//console.log(amMoment.preprocessDate(data.due));
		angular.forEach($scope.card.idMembers, function (idMember) {
			$scope.card.members.push(TrelloFactory.members.id.get({ id: idMember }));
		});
	});

	$scope.cardAttachments = TrelloFactory.cards.attachments.query({ id: $state.params.card });
	$scope.cardChecklists = TrelloFactory.cards.checklists.query({ id: $state.params.card });

	TrelloFactory.cards.actions.query({ id: $state.params.card }, function (data) {
		$scope.cardActions = _.where(data, { type: "commentCard" });

		$scope.comments = [];

		angular.forEach($scope.cardActions, function (action) {
			TrelloFactory.actions.id.get({ id: action.id }, function (data) {
				$scope.comments.push(data);
			});

		});
	});
};
