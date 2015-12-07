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
