var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

gulp.task('html', function(){
	return gulp.src([
		'./src/*.html'
		]).pipe(gulp.dest('./distro/'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function () {
   return gulp.src([
        './src/*.js'
        ])
      .pipe(concat('scripts.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./distro/js'))
      .pipe(browserSync.reload({
	      stream: true
	    })); // It will create folder client.min.js
});

gulp.task('sass', function(){
  return gulp.src('./src/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./distro/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('default',gulp.series('html','js','sass'),function(done){
	return '';
})

gulp.task('browserSync',function() {
  browserSync.init({
    server: {
      baseDir: './distro'
    },
  })
})

gulp.task('browserreload',function(){
	browserSync.reload();
});

gulp.task('watch', gulp.series('sass','js','html'), function(){
	return gulp.parallel(gulp.watch("./src/**/*.js",gulp.series('js')),
	gulp.watch("./src/**/*.html",gulp.series('html')),
	gulp.watch("./src/**/*.scss",gulp.series('sass'))
	
	);
});



