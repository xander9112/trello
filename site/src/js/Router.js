var Router = function ($stateProvider, $urlRouterProvider, $locationProvider) {
	"use strict";

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
	$stateProvider
		.state('/', {
			url:         '/',
			templateUrl: '/views/MainPage.html'
		})
		.state('/user/:id', {
			url:         '/user/:id',
			templateUrl: '/views/UserPage.html',
			controller:  'UserController'
		})
		.state('boards-create', {
			url:         '/boards-create',
			templateUrl: '/views/boards/create.html',
			controller:  'BoardCreateController'
		})
		.state('boards', {
			url:   '/boards',
			views: {
				'':              {
					templateUrl: '/views/boards/index.html',
					controller:  'BoardsController'
				},
				'create@boards': {
					templateUrl: '/views/boards/create.html',
					controller:  'BoardCreateController'
				}
			}
		})
		.state('/:board', {
			url:         '/boards/:board',
			templateUrl: '/views/boards/board/index.html',
			controller:  'BoardController'
		})
		.state('/:board.list', {
			url:         '/:list',
			templateUrl: '/views/boards/board/list/index.html',
			controller:  'ListController'
		})
		.state('/:board.list.card', {
			url:      '/:card',
			template: '<card-template></card-template>'
		})
		.state('logout', {
			url:        '/logout',
			controller: function () {
				Trello.deauthorize();
			}
		});
};
