var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    rollup = require('gulp-rollup'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    onError = function(err) {
        notify.onError({
            title:    "Gulp",
            subtitle: "Failure!",
            message:  "Error: <%= error.message %>",
            sound:    "Beep"
        })(err);

        this.emit('end');
    };


gulp.task('watch', function(){
    gulp.watch('./src/*.js', ['js']);
});

gulp.task('js', function() {
  return gulp.src('./src/app.js')
        .pipe(plumber({errorHandler: onError}))
        .pipe(rollup({ 
            sourceMap: true, 
            format: 'es6'
        }))
        .pipe(babel({
			presets: ['es2015']
		}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('serve', ['js'], function () {
      browserSync({
        notify: false,
        // https: true,
        server: ['./build'],
        tunnel: false
      });

      gulp.watch(['./src/*.js'], ['js', browserSync.reload]);
});