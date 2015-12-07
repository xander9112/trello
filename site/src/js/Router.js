var Router = function ($stateProvider, $urlRouterProvider, $locationProvider) {
	"use strict";

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
	$stateProvider
		.state('/', {
			url:         '/',
			templateUrl: '/views/MainPage.html'
		})
		.state('boards', {
			url:   '/boards',
			views: {
				'':              {
					templateUrl: '/views/boards/template.html',
					controller:  'BoardsController'
				},
				'create@boards': {
					templateUrl: '/views/boards/create.html'
					//controller:  'BoardsController'
				}
			}
		})
		.state('/:board', {
			url:         '/boards/:board',
			templateUrl: '/views/boards/board/template.html',
			controller:  'BoardController'
		})
		.state('/:board.list', {
			url:         '/:list',
			templateUrl: '/views/boards/board/list/template.html',
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
