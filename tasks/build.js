var gulp = require('gulp');
var del = require('del');

var build = require('../site/src/vendor/semantic/tasks/build');

gulp.task('build-ui', build);

gulp.task('clean', function (callback) {
	return del('site/assets/**/*', callback);
});

gulp.task('build', [ 'build-ui', 'scripts', 'styles', 'images', 'fonts', 'sprite' ]);

gulp.task('default', [ 'clean' ], function () {
	gulp.start('build');
});
