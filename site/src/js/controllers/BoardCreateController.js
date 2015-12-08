var BoardCreateController = function ($scope, $state, TrelloFactory, LabelNames, DefaultLists, $timeout) {
	"use strict";
	//$scope.CreateBoard = function (event) {
	//	event.preventDefault();

	angular
		.element('.js-modal-create')
		.modal('show')
		.modal({
			observeChanges: true,
			onHide:         function () {
				$state.go(`boards`);
			},
			onHidden:       function () {
				angular.element('.js-modal-create').remove();
			}

		});
	//};

	$scope.CreatingBoard = '';
	$scope.standartSettings = false;
	$scope.loading = 0;
	$scope.loadingText = 'Удаление стандартных лэйблов';


	$scope.successCreating = {
		created:   false,
		boardName: '',
		boardUrl:  ''
	};


	$scope.completed = {
		length: 0,
		count:  0,
		type:   'labels'
	};

	$scope.$watchCollection('completed', function (newValue) {
		$scope.updateProgressBar(newValue);
	});

	$scope.updateProgressBar = function (completed) {
		if (completed.length === 0) {
			$scope.loading = 0;
		} else {
			$scope.loading = parseInt(completed.count / completed.length) * 100;
		}

		if ($scope.loading === 100) {

			$timeout(function () {
				$scope.$emit(`loadingFinish-${completed.type}`);
			}, 500);
		}
	};

	$scope.SaveBoard = function (event) {
		var board = new TrelloFactory.boards.self();

		var form = $scope.CreatingBoard;

		if (form.$valid) {
			board.name = form.boardName.$viewValue;

			board.$save().then(function (data) {
				$scope.successCreating.boardName = data.name;
				$scope.successCreating.boardUrl = data.shortLink;

				if (form.standartSettings.$viewValue) {
					TrelloFactory.boards.labels.query({ id: data.id }).$promise.then(function (data) {
						if (data.length) {
							angular.forEach(data, function (value) {
								var NewLabel = new TrelloFactory.labels.id({ idLabel: value.id });

								NewLabel.$delete().then(function () {
									$scope.completed.length = data.length;
									$scope.completed.count++;
								});
							});
						} else {
							$scope.completed.length = 1;
							$scope.completed.count = 1;
						}
					});

					$scope.$on('loadingFinish-labels', function () {
						$scope.loadingText = 'Удаление стандартных листов';

						TrelloFactory.boards.lists.query({ id: data.id }).$promise.then(function (data) {
							$scope.completed.type = 'lists';

							if (data.length) {
								$scope.completed.length = data.length;
								$scope.completed.count = 0;

								angular.forEach(data, function (value) {
									var List = new TrelloFactory.lists.listsClosed({ idList: value.id });
									List.value = true;

									List.$update().then(function () {
										$scope.completed.length = data.length;
										$scope.completed.count++;
									});
								});
							} else {
								$scope.completed.length = 1;
								$scope.completed.count = 1;
							}
						});
					});

					$scope.$on('loadingFinish-lists', function () {
						$scope.loadingText = 'Создание лэйблов';
						$scope.completed.length = _.size(_.filter(LabelNames, function (n) {
							return n !== '';
						}));
						$scope.completed.count = 0;
						$scope.completed.type = 'CreateLabels';

						angular.forEach(LabelNames, function (value, key) {
							if (LabelNames[ key ] !== '') {
								var NewLabel = new TrelloFactory.boards.labels({ id: data.id });

								NewLabel.name = value;
								NewLabel.color = key;

								NewLabel.$save().then(function () {
									//$scope.completed.length = _.size(LabelNames);
									$scope.completed.count++;
								});
							}
						});
					});

					$scope.$on('loadingFinish-CreateLabels', function () {
						$scope.loadingText = 'Создание листов';
						$scope.completed.length = _.size(DefaultLists);
						$scope.completed.count = 0;
						$scope.completed.type = 'CreateLists';

						angular.forEach(DefaultLists, function (value) {
							var newList = new TrelloFactory.boards.lists({ id: data.id });
							newList.name = value.name;
							newList.pos = value.pos;

							newList.$save().then(function () {
								//$scope.completed.length = DefaultLists.length;
								$scope.completed.count++;
							});
						});
					});

					$scope.$on('loadingFinish-CreateLists', function () {
						$scope.loadingText = 'Завершено';
						$scope.successCreating.created = true;
					});
				} else {
					$scope.successCreating.created = true;
				}
			});
		} else {
		}
	};
};
