'use strict';

var gulp = require("gulp"),
	wiredep = require('wiredep').stream,
    browserSync = require('browser-sync'),
    jade = require('jade');

// Следим за bower
	gulp.task('wiredep', function () {
	  gulp.src('app/*.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('app/'))
	});

var jadePath = './app/jade/*.jade';

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(jadePath)
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: '\t',
    }))
    .pipe(gulp.dest('./app'))
});

// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('watch', function(){
	gulp.watch('jadePath', ['jade']);
});

// Переносим HTML, CSS, JS в папку dist 
	gulp.task('useref', function () {
	  return gulp.src('app/*.html')
	    .pipe(useref())
	    .pipe(gulpif('*.js', uglify()))
	    .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
	    .pipe(gulp.dest('dist'));
	});

	// Очистка
		gulp.task('clean', function() {
			return gulp.src('dist', { read: false }) 
		  	.pipe(rimraf());
		});
