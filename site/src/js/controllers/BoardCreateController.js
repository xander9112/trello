var BoardCreateController = function ($scope, $state, TrelloFactory, LabelNames, DefaultLists) {
	"use strict";

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
	};

	$scope.SaveBoard = function (event) {
		var board = new TrelloFactory.boards.self();

		var form = $scope.CreatingBoard;

		if (form.$valid) {
			board.name = form.boardName.$viewValue;

			board.$save().then(function (data) {
				TrelloFactory.boards.labels.query({ id: data.id }).$promise.then(function (data) {
					angular.forEach(data, function (value) {
						var NewLabel = new TrelloFactory.labels.id({ idLabel: value.id });
						NewLabel.$delete();
					});
				});

				TrelloFactory.boards.lists.query({ id: data.id }).$promise.then(function (data) {
					angular.forEach(data, function (value) {
						var List = new TrelloFactory.lists.listsClosed({ idList: value.id });
						List.value = true;
						List.$update();
					});
				});


				angular.forEach(LabelNames, function (value, key) {
					if (LabelNames[ key ] !== '') {
						var NewLabel = new TrelloFactory.boards.labels({ id: data.id });

						NewLabel.name = value;
						NewLabel.color = key;

						NewLabel.$save();
					}
				});

				angular.forEach(DefaultLists, function (value) {
					var newList = new TrelloFactory.boards.lists({ id: data.id });
					newList.name = value.name;
					newList.pos = value.pos;

					newList.$save();
				});
			});
		} else {
		}

		/*if (FormName.name.$viewValue.length < 3) {
		 FormName.name.$valid = false;
		 }*/
		//console.log(board);
	};

};