var BoardCreateController = function ($scope, $state, TrelloFactory, LabelNames, DefaultLists, $timeout) {
	"use strict";
	angular.element('.js-modal-create')
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


	/**
	 * FormName
	 * @type {string}
	 */
	$scope.CreatingBoard = '';

	$scope.progressBar = {
		loading:     0,
		loadingText: ''
	};

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
		$scope.progressBar.loading === 0 ? 0 : parseInt(completed.count / completed.length) * 100;

		if ($scope.loading === 100) {
			$timeout(function () {
				$scope.$emit(`loadingFinish-${completed.type}`);
			}, 500);
		}
	};

	$scope.SaveBoard = function (event) {
		event.preventDefault();

		var NewBoard = new TrelloFactory.boards.self();
		var form = $scope.CreatingBoard;

		if (form.$valid) {
			NewBoard.name = form.boardName.$viewValue;

			NewBoard.$save().then(function (data) {
				$scope.successCreating.boardName = data.name;
				$scope.successCreating.boardUrl = data.shortLink;

				if (form.standartSettings.$viewValue) {
					$scope.progressBar.loadingText = 'Удаление стандартных лэйблов';

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
						$scope.progressBar.loadingText = 'Удаление стандартных листов';

						TrelloFactory.boards.lists.query({ id: data.id }).$promise.then(function (data) {
							$scope.completed.type = 'lists';

							if (data.length) {
								$scope.completed.length = data.length;
								$scope.completed.count = 0;

								angular.forEach(data, function (value) {
									var NewList = new TrelloFactory.lists.listsClosed({ idList: value.id });
									NewList.value = true;

									NewList.$update().then(function () {
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
						$scope.progressBar.loadingText = 'Создание лэйблов';

						let notEmptyLabelNames = _.filter(LabelNames, function (n) {
							return n !== '';
						});

						$scope.completed.length = _.size(notEmptyLabelNames);
						$scope.completed.count = 0;
						$scope.completed.type = 'CreateLabels';

						angular.forEach(LabelNames, function (value, key) {
							if (LabelNames[ key ] !== '') {
								var NewLabel = new TrelloFactory.boards.labels({ id: data.id });

								NewLabel.name = value;
								NewLabel.color = key;

								NewLabel.$save().then(function () {
									$scope.completed.count++;
								});
							}
						});
					});

					$scope.$on('loadingFinish-CreateLabels', function () {
						$scope.progressBar.loadingText = 'Создание листов';
						$scope.completed.length = _.size(DefaultLists);
						$scope.completed.count = 0;
						$scope.completed.type = 'CreateLists';

						angular.forEach(DefaultLists, function (value) {
							var NewList = new TrelloFactory.boards.lists({ id: data.id });
							NewList.name = value.name;
							NewList.pos = value.pos;

							NewList.$save().then(function () {
								$scope.completed.count++;
							});
						});
					});

					$scope.$on('loadingFinish-CreateLists', function () {
						$scope.progressBar.loadingText = 'Завершено';
						$scope.successCreating.created = true;
					});
				} else {
					$scope.successCreating.created = true;
				}
			});
		}
	};
};
