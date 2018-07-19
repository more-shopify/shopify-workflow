const gulp     = require('gulp')

// Estilos
const sass     = require('gulp-sass')
const prefix   = require('gulp-autoprefixer')

// Scripts
const babel    = require('gulp-babel')
const concat   = require('gulp-concat');

// Imágenes
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')

// Otras
const merge    = require('merge-stream');

// src / dest
const input = 'sass/**/*.scss'
const output = '../assets/'


gulp.task('sass', () => {
  gulp.src('sass/main.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(output))
})

gulp.task('scripts', () => {

  var babel = 
    gulp.src('js/main.js')
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(gulp.dest(output));

  var concat = 
    gulp.src(['js/lib/*.js', 'js/main.js'])
      .pipe(concat('scripts.all.js'))
      .pipe(gulp.dest(output));

  return merge(babel, concat);
})

gulp.task('imagemin', () => {
  gulp.src('./src/img/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./assets/'))
})

gulp.task('default', () => {
  gulp.watch('sass/**/*.scss', ['sass'])
  gulp.watch('js/**/*.js', ['scripts'])
})