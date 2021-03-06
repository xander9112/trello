'use strict';

(function () {
	'use strict';

	angular.module('semantic.ui.components.checkbox', []).directive('smCheckbox', smCheckbox);

	function smCheckbox() {
		return {
			restrict: 'E',
			require: '?ngModel',
			transclude: true,
			replace: true,
			template: '<div class="ui checkbox">' + '<input type="checkbox">' + '<label></label>' + '</div>',

			link: function link(scope, element, attrs, ngModel, transclude) {

				var checked = false;
				var disabled = false;
				var input = element.find('input');

				transclude(scope, function (nodes) {
					element.find('label').append(nodes);
				});

				element.on('click', toggleFn);

				if (!ngModel) {
					throw new Error('Semantic-UI-Angular: The \'smCheckbox\' directive requires a \'ng-model\' value');
				}

				ngModel.$render = function () {
					checked = ngModel.$viewValue;

					if (!angular.isDefined(checked)) {
						checked = false;
					}

					input.prop('checked', checked);

					if (angular.isDefined(attrs.name)) {
						input.attr('name', attrs.name);
					}
				};

				scope.$watch(attrs.ngDisabled, function (val) {
					disabled = val || false;
					input.attr('disabled', disabled);
				});

				if (attrs.toggle !== void 0) {
					element.addClass('toggle');
				} else if (attrs.slider !== void 0) {
					element.addClass('slider');
				}

				if (attrs.ariaLabel === void 0) {
					element.attr('aria-label', element[0].textContent.trim());
				}

				function toggleFn() {

					if (disabled) {
						return;
					}

					checked = !checked;
					input.prop('checked', checked);
					ngModel.$setViewValue(checked);
					scope.$apply();
				}
			}
		};
	}
})();
'use strict';

(function () {
	'use strict';

	angular.module('semantic.ui.components.progressBar', []).directive('smProgressBar', smProgressBar);

	function smProgressBar() {
		return {
			restrict: 'E',
			require: '?ngModel',
			transclude: true,
			replace: true,
			template: '\n\t\t\t\t<div class="ui inverted progress">\n\t\t\t\t\t<div class="bar">\n\t\t\t\t\t\t<div class="progress"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="label"></div>\n\t\t\t\t</div>',

			link: function link(scope, element, attrs, ngModel, transclude) {
				var bar = element.find('.bar');
				var progress = bar.find('.progress');

				transclude(scope, function (nodes) {
					element.find('.label').append(nodes);
				});

				if (!ngModel) {
					throw new Error('Semantic-UI-Angular: The \'smProgressBar\' directive requires a \'ng-model\' value');
				}

				ngModel.$render = function () {
					bar.attr('style', 'width: ' + ngModel.$viewValue + '%');
					progress.text(ngModel.$viewValue + '%');
				};

				scope.$watch(ngModel.$viewValue, function (val) {
					bar.attr('style', 'width: ' + ngModel.$viewValue + '%');
					progress.text(ngModel.$viewValue + '%');

					if (ngModel.$viewValue === 100) {
						element.addClass('success');
					} else {
						element.removeClass('success');
					}
				});
			}
		};
	}
})();
'use strict';

var TrelloFactory = function TrelloFactory($resource, $localStorage) {
	"use strict";

	var resource = function resource(action, params, method) {

		var method = method || {};

		var options = {
			key: $localStorage.key,
			token: $localStorage.token
		};

		_.assign(options, params);

		return $resource('https://api.trello.com/1/' + action, options, method);
	};

	return {
		/**
   /[id]
   /[id]/[field]
   /[id]/actions
   /[id]/boardBackgrounds
   /[id]/boardBackgrounds/[idBoardBackground]
   /[id]/boardStars
   /[id]/boardStars/[idBoardStar]
   /[id]/boards
   /[id]/boards/[filter]
   /[id]/boardsInvited
   /[id]/boardsInvited/[field]
   /[id]/cards
   /[id]/cards/[filter]
   /[id]/customBoardBackgrounds
   /[id]/customBoardBackgrounds/[idBoardBackground]
   /[id]/customEmoji
   /[id]/customEmoji/[idCustomEmoji]
   /[id]/customStickers
   /[id]/customStickers/[idCustomSticker]
   /[id]/deltas
   /[id]/notifications
   /[id]/notifications/[filter]
   /[id]/organizations
   /[id]/organizations/[filter]
   /[id]/organizationsInvited
   /[id]/organizationsInvited/[field]
   /[id]/savedSearches
   /[id]/savedSearches/[idSavedSearch]
   /[id]/tokens
   */

		members: {
			id: resource('members/:id'),
			field: resource('members/:id/:field'),
			actions: resource('members/:id/actions'),
			boards: resource('members/:id/boards')
		},

		/**
   /[id]
   /[id]/[field]
   /[id]/actions
   /[id]/boardStars
   /[id]/cards
   /[id]/cards/[filter]
   /[id]/cards/[idCard]
   /[id]/checklists
   /[id]/deltas
   /[id]/labels
   /[id]/labels/[idLabel]
   /[id]/lists
   /[id]/lists/[filter]
   /[id]/members
   /[id]/members/[filter]
   /[id]/members/[idMember]/cards
   /[id]/membersInvited
   /[id]/membersInvited/[field]
   /[id]/memberships
   /[id]/memberships/[idMembership]
   /[id]/myPrefs
   /[id]/organization
   /[id]/organization/[field]
   */

		boards: {
			self: $resource('testJson.json'),
			/*self:       resource('boards', {}, {
    method: 'POST'
    }),*/
			id: resource('boards/:id', { id: '@id' }),
			field: resource('boards/:id/:field'),
			actions: resource('boards/:id/actions'),
			lists: resource('boards/:id/lists', { id: '@id' }),
			labels: resource('boards/:id/labels', { id: '@id' }),
			labelsId: resource('boards/:id/labels/:idLabel', { id: '@id' }),
			labelNames: resource('boards/:id/labelNames/:labelName', {
				id: '@id', labelName: '@labelName'
			}, {
				'update': { method: 'PUT' }
			})

		},

		/**
   /lists/[idList]
   /lists/[idList]/[field]
   /lists/[idList]/actions
   /lists/[idList]/board
   /lists/[idList]/board/[field]
   /lists/[idList]/cards
   /lists/[idList]/cards/[filter]
   */

		lists: {
			id: resource('lists/:id'),
			field: resource('lists/:id/:field'),
			actions: resource('lists/:id/actions'),
			board: resource('lists/:id/board'),
			cards: resource('lists/:id/cards'),
			listsClosed: resource('/lists/:idList/closed', {
				idList: '@idList'
			}, {
				'update': { method: 'PUT' }
			})
		},

		/**
   /[id]
   /[id]/[field]
   /[id]/actions
   /[id]/attachments
   /[id]/attachments/[idAttachment]
   /[id]/board
   /[id]/board/[field]
   /[id]/checkItemStates
   /[id]/checklists
   /[id]/list
   /[id]/list/[field]
   /[id]/members
   /[id]/membersVoted
   /[id]/stickers
   /[id]/stickers/[idSticker]
   */

		cards: {
			id: resource('cards/:id'),
			field: resource('cards/:id/:field'),
			actions: resource('cards/:id/actions'),
			attachments: resource('cards/:id/attachments'),
			checkItemStates: resource('cards/:id/checkItemStates'),
			checklists: resource('cards/:id/checklists'),
			members: resource('cards/:id/members')
		},

		/**
   /[id]
   /[id]/[field]
   /[id]/board
   /[id]/board/[field]
   /[id]/card
   /[id]/card/[field]
   /[id]/display
   /[id]/entities
   /[id]/list
   /[id]/list/[field]
   /[id]/member
   /[id]/member/[field]
   /[id]/memberCreator
   /[id]/memberCreator/[field]
   /[id]/organization
   /[id]/organization/[field]
   */
		actions: {
			id: resource('actions/:id'),
			field: resource('actions/:id/:field'),
			board: resource('actions/:id/board')
		},

		labels: {
			id: resource('labels/:idLabel', { idLabel: '@idLabel' })
		}
	};
};
"use strict";

var CardTemplate = function CardTemplate() {
	"use strict";

	return {
		replace: true,
		templateUrl: '/views/boards/board/list/card/index.html',
		controller: CardController
	};
};
"use strict";

/*
var Tekpub = Tekpub || {};
Tekpub.Bootstrap = {};

Tekpub.Bootstrap.DeleteButton = function () {
	"use strict";

	return {
		replace:    true,
		transclude: true,
		scope:      {
			text:    '@',
			action:  '&',
			comment: '='
		},
		template:   '<button class="ui button" ng-click="action()"><i class="remove icon"></i> {{text}}</button>'
	}
};

Tekpub.Bootstrap.AddButton = function () {
	"use strict";

	return {
		replace:    true,
		transclude: true,
		scope:      {
			text:   '@',
			action: '&'
		},
		template:   '<button class="ui button" ng-click="action()">{{text}}</button>'
	}
};

Tekpub.Bootstrap.BreadCrumbs = function ($routeParams) {
	"use strict";

	return {
		replace:    true,
		transclude: true,
		controller: function ($scope) {
			var rootUrl = '#/';
			$scope.crumbs = [{ url: rootUrl, text: 'Database' }];
			var runningUrl = rootUrl;

			for (var param in $routeParams) {
				runningUrl += $routeParams[param];
				$scope.crumbs.push({ url: runningUrl, text: $routeParams[param] })
			}

			$scope.notLast = function (crumb) {
				return crumb !== _.last($scope.crumbs);
			}
		},
		template:   `
			<div class="ui breadcrumb">
				<span ng-repeat="crumb in crumbs">
					<a href="{{crumb.url}}" class="section" ng-show="notLast(crumb)">{{crumb.text}}</a>
					<div class="active section" ng-hide="notLast(crumb)">{{crumb.text}}</div>
					<i class="right angle icon divider" ng-show="notLast(crumb)"></i>
				</span>
			</div>`
	}
};
*/
"use strict";

var repeatDone = function repeatDone() {
	return function (scope, element, attrs) {
		if (scope.$last) {
			// all are rendered
			scope.$eval(attrs.repeatDone);
		}
	};
};
"use strict";

var Semantic = {};
"use strict";

var BoardController = function BoardController($scope, $state, TrelloFactory) {
	"use strict";

	$scope.board = TrelloFactory.boards.id.get({ id: $state.params.board }, function () {
		$scope.board.id = _.last($scope.board.shortUrl.split('/'));

		$scope.lists = TrelloFactory.boards.lists.query({ id: $state.params.board }, function () {
			$scope.$parent.loadingPage = false;
		});
	});
};
'use strict';

var BoardCreateController = function BoardCreateController($scope, $state, TrelloFactory, LabelNames, DefaultLists, $timeout) {
	"use strict";
	angular.element('.js-modal-create').modal('show').modal({
		observeChanges: true,
		onHide: function onHide() {
			$state.go('boards');
		},
		onHidden: function onHidden() {
			angular.element('.js-modal-create').remove();
		}

	});

	/**
  * FormName
  * @type {string}
  */
	$scope.CreatingBoard = '';

	$scope.progressBar = {
		loading: 0,
		loadingText: ''
	};

	$scope.successCreating = {
		created: false,
		boardName: '',
		boardUrl: ''
	};

	$scope.completed = {
		length: 0,
		count: 0,
		type: 'labels'
	};

	$scope.$watchCollection('completed', function (newValue) {
		$scope.updateProgressBar(newValue);
	});

	$scope.updateProgressBar = function (completed) {
		$scope.progressBar.loading === 0 ? 0 : parseInt(completed.count / completed.length) * 100;

		if ($scope.loading === 100) {
			$timeout(function () {
				$scope.$emit('loadingFinish-' + completed.type);
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

						var notEmptyLabelNames = _.filter(LabelNames, function (n) {
							return n !== '';
						});

						$scope.completed.length = _.size(notEmptyLabelNames);
						$scope.completed.count = 0;
						$scope.completed.type = 'CreateLabels';

						angular.forEach(LabelNames, function (value, key) {
							if (LabelNames[key] !== '') {
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
"use strict";

var BoardsController = function BoardsController($scope, TrelloFactory) {
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
'use strict';

var CardController = function CardController($scope, $state, TrelloFactory, moment) {
	"use strict";

	angular.element('.js-card-template').modal('show').modal({
		observeChanges: true,
		onHide: function onHide() {
			$state.go('/:board.list');
		},
		onHidden: function onHidden() {
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
'use strict';

var ListController = function ListController($scope, $state, TrelloFactory, moment) {
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

		$scope.$parent.loadingPage = false;
	});
};
'use strict';

var MainController = function MainController($rootScope, $scope, $localStorage, $websocket, TrelloFactory) {
	"use strict";

	$rootScope.$on('$stateChangeStart', function (ev) {
		$scope.loadingPage = true;
	});

	$rootScope.$on('$stateChangeSuccess', function (ev) {
		$scope.loadingPage = false;
	});

	var authenticationSuccess = function authenticationSuccess() {
		console.log("Successful authentication");
	};

	var authenticationFailure = function authenticationFailure() {
		console.log("Failed authentication");
	};

	Trello.authorize({
		type: "redirect",
		name: "Getting Started Application",
		scope: {
			read: true,
			write: true
		},
		'function': function _function() {
			console.log('afsfsa');
		},
		'function': function _function() {
			console.log('sffsa');
		}
	});

	if (!angular.isDefined($localStorage.key)) {
		$localStorage.key = Trello.key();
	} else {
		if ($localStorage.key !== Trello.key()) {
			$localStorage.key = Trello.key();
		}
	}

	if (!angular.isDefined($localStorage.token)) {
		$localStorage.token = Trello.token();
	} else {
		if ($localStorage.token !== Trello.token()) {
			$localStorage.token = Trello.token();
		}
	}

	TrelloFactory.members.id.get({ id: 'me' }, function (data) {
		$scope.me = data;
	});

	/*var ws = $websocket.$new(`wss://api.trello.com/1/sessions/socket?token=${$localStorage.token}`); // instance of ngWebsocket, handled by $websocket service
 
  ws.$on('$open', function () {
  console.log('Oh my gosh, websocket is really open! Fukken awesome!');
 
  /!*var data = {
  status:  'active',
  idBoard: '5625fcbf62c01e6aaa0a4a10'
  };
 
  //ws.$emit('POST', 'hi listening websocket server'); // send a message to the websocket server
 
  ws.$emit('POST', data);*!/
  });
 
  ws.$on('$error', function (data) {
  console.log(data);
  });
 
  ws.$on('$message', function (data) {
  console.log(data);
  });
 
  ws.$on('POST', function (data) {
  console.log('The websocket server has sent the following data:');
  console.log(data);
 
  ws.$close();
  });
 
  ws.$on('$close', function () {
  console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
  });*/
};
"use strict";

var UserController = function UserController($rootScope, $scope, $localStorage, $state, TrelloFactory) {
	"use strict";
	console.log($state.params);
	TrelloFactory.members.id.get({ id: $state.params.id }, function (data) {
		$scope.user = data;

		console.log($scope.user);
	});
};
'use strict';

var Router = function Router($stateProvider, $urlRouterProvider, $locationProvider) {
	"use strict";

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
	$stateProvider.state('/', {
		url: '/',
		templateUrl: '/views/MainPage.html'
	}).state('/user/:id', {
		url: '/user/:id',
		templateUrl: '/views/UserPage.html',
		controller: 'UserController'
	}).state('boards-create', {
		url: '/boards-create',
		templateUrl: '/views/boards/create.html',
		controller: 'BoardCreateController'
	}).state('boards', {
		url: '/boards',
		views: {
			'': {
				templateUrl: '/views/boards/index.html',
				controller: 'BoardsController'
			},
			'create@boards': {
				templateUrl: '/views/boards/create.html',
				controller: 'BoardCreateController'
			}
		}
	}).state('/:board', {
		url: '/boards/:board',
		templateUrl: '/views/boards/board/index.html',
		controller: 'BoardController'
	}).state('/:board.list', {
		url: '/:list',
		templateUrl: '/views/boards/board/list/index.html',
		controller: 'ListController'
	}).state('/:board.list.card', {
		url: '/:card',
		template: '<card-template></card-template>'
	}).state('logout', {
		url: '/logout',
		controller: function controller() {
			Trello.deauthorize();
		}
	});
};
/**
 * green - Backend
 * yellow - Общие задачи
 * orange - Frontend
 * red - Design
 * purple - Проверено
 * blue
 * sky
 * lime - Сделано
 * pink
 * black - Баг
 */

'use strict';

var LabelNames = {
	green: 'Backend',
	yellow: 'Общие задачи',
	orange: 'Frontend',
	red: 'Design',
	purple: 'Проверено',
	blue: '',
	sky: '',
	lime: 'Сделано',
	pink: '',
	black: 'Баг'
};

var DefaultLists = [{
	name: 'Задачи',
	pos: 1
}, {
	name: 'В работе',
	pos: 2
}, {
	name: 'Баги',
	pos: 3
}, {
	name: 'На тестовом',
	pos: 4
}, {
	name: 'На продакшене',
	pos: 5
}, {
	name: 'Информация',
	pos: 6
}];
'use strict';

var App = angular.module('Application', ['ngResource', 'ui.router', 'ngStorage', 'angularMoment', 'hc.marked', 'ngWebsocket', 'semantic.ui.components.checkbox', 'semantic.ui.components.progressBar'], function ($httpProvider) {
	"use strict";
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [function (data) {
		var param = function param(obj) {
			var query = '';
			var name, value, fullSubName, subValue, innerObj, i;

			for (name in obj) {
				value = obj[name];

				if (value instanceof Array) {
					for (i = 0; i < value.length; ++i) {
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if (value instanceof Object) {
					for (var subName in value) {
						if (value.hasOwnProperty(subName) && subName !== '$$hashKey') {
							subValue = value[subName];
							fullSubName = name + '[' + subName + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					}
				} else {
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
				}
			}

			return query.length ? query.substr(0, query.length - 1) : query;
		};

		return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
});

App.config(Router);
App.config(function ($localStorageProvider) {
	$localStorageProvider.setKeyPrefix('trello_api_');
});

App.config(function ($resourceProvider) {
	// Don't strip trailing slashes from calculated URLs
	//console.log($resourceProvider);
	$resourceProvider.defaults.stripTrailingSlashes = false;
});

/**
 * green - Backend
 * yellow - Общие задачи
 * orange - Frontend
 * red - Design
 * purple - Проверено
 * blue
 * sky
 * lime - Сделано
 * pink
 * black - Баг
 *
 * @param event
 * @constructor
 */

App.constant('LabelNames', LabelNames);
App.constant('DefaultLists', DefaultLists);

App.controller('MainController', MainController);
App.controller('UserController', UserController);
App.controller('BoardsController', BoardsController);
App.controller('BoardController', BoardController);
App.controller('BoardCreateController', BoardCreateController);
App.controller('ListController', ListController);
App.controller('CardController', CardController);

App.factory("TrelloFactory", TrelloFactory);

App.directive('repeatDone', repeatDone);

App.directive('cardTemplate', CardTemplate);
//# sourceMappingURL=app.js.map
