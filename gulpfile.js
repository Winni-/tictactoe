var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload')
    http = require('http'),
    ecstatic = require('ecstatic');

gulp.task('jade', function() {
  gulp.src('*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
    livereload.reload()
});
// gulp.task('coffee', function() {
//   gulp.src('*.coffee')
//     .pipe(coffee())
//     .pipe(gulp.dest('./dist/js'))
//     .pipe(livereload());
// });
gulp.task("js", function() {
	gulp.src("script.js")
	.pipe(gulp.dest('./dist/js'))
     .pipe(livereload());
});
gulp.task('sass', function() {
  gulp.src('*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('server', function(done) {
  http.createServer(
    ecstatic({ root: __dirname + '/dist' })
  ).listen(8080, done);
});

gulp.task('default',["server", "js","jade", "sass"], function() {
  livereload.listen();
  gulp.watch('*.jade', ['jade']);
  gulp.watch('script.js', ['js']);
  gulp.watch('*.scss', ['sass']);  
});