var App = angular.module('Application',
	[
		'ngResource',
		'ui.router',
		'ngStorage',
		'angularMoment',
		'hc.marked',
		'ngWebsocket'
	], function ($httpProvider) {
		"use strict";
		$httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
		$httpProvider.defaults.headers.put[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
		$httpProvider.defaults.transformRequest = [
			function (data) {
				var param = function (obj) {
					var query = '';
					var name, value, fullSubName, subValue, innerObj, i;

					for (name in obj) {
						value = obj[ name ];

						if (value instanceof Array) {
							for (i = 0; i < value.length; ++i) {
								subValue = value[ i ];
								fullSubName = name + '[' + i + ']';
								innerObj = {};
								innerObj[ fullSubName ] = subValue;
								query += param(innerObj) + '&';
							}
						}
						else if (value instanceof Object) {
							for (var subName in value) {
								if (value.hasOwnProperty(subName) && subName !== '$$hashKey') {
									subValue = value[ subName ];
									fullSubName = name + '[' + subName + ']';
									innerObj = {};
									innerObj[ fullSubName ] = subValue;
									query += param(innerObj) + '&';
								}
							}
						}
						else {
							query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
						}
					}

					return query.length ? query.substr(0, query.length - 1) : query;
				};

				return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
			}
		];
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
