const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const autoPrefixer = require('gulp-autoprefixer')
const liveReload = require('gulp-livereload')
const sourceMaps = require('gulp-sourcemaps')
const minify = require('gulp-minify')

gulp.task('html', () => (
  gulp.src('src/html/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'))
    .pipe(liveReload())
))

gulp.task('css', () => (
  gulp.src('src/sass/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(autoPrefixer())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(liveReload())
))

gulp.task('js', () => (
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
    .pipe(liveReload())
))

gulp.task('watch', () => {
  require('./server.js')
  liveReload.listen()
  gulp.watch('src/html/pug/*.pug', ['html'])
  gulp.watch('src/sass/**/*.scss', ['css'])
  gulp.watch('src/js/*.js', ['js'])
})