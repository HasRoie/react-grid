var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('themes/**', ['styles']);
	gulp.watch('lib/**', ['browserify']);
	gulp.watch('grids/**', ['browserify']);
	// Note: The browserify task handles js recompiling with watchify
});
