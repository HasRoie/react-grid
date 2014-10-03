var gulp = require("gulp");
var less = require("gulp-less");

// task
gulp.task('styles', function () {
    return gulp.src('./grids/base.less')
    .pipe(less())
    //compile into our examples folder
    .pipe(gulp.dest('./grids/build'));
});
