var gulp = require('gulp');

var watch = require('../site/src/vendor/semantic/tasks/watch');

gulp.task('watch-ui', watch);

gulp.task('watch', function () {
	gulp.watch('site/src/js/**/*.js', [ 'scripts.app' ]);
	gulp.watch('site/src/vendor/**/*.js', [ 'scripts.vendor' ]);
	gulp.watch('site/src/images/**/*', [ 'images' ]);
	gulp.watch('site/src/images/sprite/*', [ 'sprite' ]);
	gulp.watch('site/src/styles/**/*', [ 'styles' ]);
});
