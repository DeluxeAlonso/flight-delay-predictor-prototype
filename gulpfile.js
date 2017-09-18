var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = {
    jsDir: './app/scripts/src/**/*.js',
    publicDir: './public/'
};

gulp.task('development', ['watch'], function(){
    console.log('running in development');
});

gulp.task('watch', function () {
  gulp.watch(paths.jsDir, ['scripts']);
});

gulp.task('scripts', function () {
    return gulp.src(paths.jsDir)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.publicDir));
});

gulp.task('default', ['development'])