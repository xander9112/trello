(function () {
	'use strict';

	angular
		.module('semantic.ui.components.progressBar', [])

		.directive('smProgressBar', smProgressBar);

	function smProgressBar () {
		return {
			restrict:   'E',
			require:    '?ngModel',
			transclude: true,
			replace:    true,
			template:   `
				<div class="ui active progress">
					<div class="bar">
						<div class="progress"></div>
					</div>
					<div class="label"></div>
				</div>`,

			link: function (scope, element, attrs, ngModel, transclude) {
				var bar = element.find('.bar');
				var progress = bar.find('.progress');

				transclude(scope, function (nodes) {
					element.find('label').append(nodes);
				});

				if (!ngModel) {
					throw new Error('Semantic-UI-Angular: The \'smProgressBar\' directive requires a \'ng-model\' value');
				}

				ngModel.$render = function () {
					bar.attr('style', `width: ${ngModel.$viewValue}%`);
					progress.text(`${ngModel.$viewValue}%`);
				};

				scope.$watch(ngModel.$viewValue, function (val) {
					bar.attr('style', `width: ${ngModel.$viewValue}%`);
					progress.text(`${ngModel.$viewValue}%`);
				});
			}
		};
	}
})();
