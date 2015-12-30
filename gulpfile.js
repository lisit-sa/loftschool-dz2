/* -------- плагины ------- */

var
    gulp        = require('gulp'),
    compass     = require('gulp-compass'),
    jade        = require('gulp-jade'),
    browserSync = require('browser-sync').create(),
    plumber     = require('gulp-plumber');

/* --------- пути --------- */

var
    paths = {
        jade : {
            location    : 'app/jade/**/*.jade',
            compiled    : 'app/jade/*.jade',
            destination : 'app/jade'
        },

        scss : {
            location    : 'app/scss/**/*.scss',
            entryPoint  : 'app/css/main.css'
        },

        compass : {
            configFile  : 'config.rb',
            cssFolder   : 'app/css',
            scssFolder  : 'app/scss',
            imgFolder   : 'app/img'
        },

        browserSync : {
            baseDir : 'app',
            watchPaths : ['index.html', 'css/*.css', 'js/*.js']
        }
    };

/* --------- jade компиляция и пламбер--------- */
gulp.task('jade', function(){
    gulp.src(paths.jade.compiled)
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.jade.destination))
});

/* --------- scss-compass --------- */

gulp.task('compass', function() {
    gulp.src(paths.scss.location)
        .pipe(plumber())
        .pipe(compass({
            config_file: paths.compass.configFile,
            css: paths.compass.cssFolder,
            sass: paths.compass.scssFolder,
            image: paths.compass.imgFolder
        }));
});

/* --------- browser sync --------- */

gulp.task('sync', function() {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
});


/* --------- слежка --------- */

gulp.task("watch", function () {
    gulp.watch(paths.jade.location, ['jade']);
    gulp.watch(paths.scss.location, ['compass']);
    gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
    gulp.watch([
        "app/*.html",
        "app/css/*.css",
        "app/js/*.js"
    ]).on("change", browserSync.reload);
});

/* --------- итог --------- */

gulp.task('default', ['jade', 'compass', 'sync', 'watch']);