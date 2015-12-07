var ListController = function ($scope, $state, TrelloFactory, moment) {
	"use strict";

	TrelloFactory.lists.cards.query({ id: $state.params.list }, function (data) {
		$scope.cards = false;

		if (data.length) {
			$scope.cards = data;

			angular.forEach($scope.cards, function (card) {
				card.members = [];

				if (card.due !== '') {
					var DataDue = moment(card.due);
					var CurrentDate = moment(new Date());

					if (DataDue.diff(CurrentDate, 'hours') > 0) {
						card.color = 'red';
					}
				}

				angular.forEach(card.idMembers, function (idMember) {
					card.members.push(TrelloFactory.members.id.get({ id: idMember }));
				});
			});
		}
	});
};
