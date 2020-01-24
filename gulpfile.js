var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var sass = require('gulp-sass');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var fancy_log = require('fancy-log');

sass.compiler = require('node-sass');

// Paths to the various project files
var paths = {
	pages: ['src/html/**/*.html'],
	styles: ['src/css/**/*.css'],
	js: ['src/js/**/*.js'], // Static JS resources (I.E. jQuery, Bootstrap, etc.)
	scripts: [
		'src/js/main.ts'
	],
};

// The meat of the watch task
var watched = watchify(browserify({
	basedir: '.',
	debug: true,
	entries: paths.scripts,
	cache: {},
	packageCache: {}
}).on('error', function(err) {
	console.log(err.message);
	this.emit('end');
})).plugin(tsify).transform('babelify', {
	presets: ['es2015'],
	extensions: ['.ts']
});

// Copies all html resources to the final distribution directory
gulp.task('copy-html', function() {
	return gulp.src(paths.pages)
		.pipe(gulp.dest('dist'));
});

// Copies static JS resources (I.E. bootstrap and jQuery)
gulp.task('copy-js', function() {
	return gulp.src(paths.js)
		.pipe(gulp.dest('dist/js'));
});

// Performs the full copy 
gulp.task('copy', gulp.series(gulp.parallel('copy-html'), gulp.parallel('copy-js'), function () {
	return gulp.src(paths.styles)
		.pipe(gulp.dest('dist/css'));
}));

// Compiles the SASS resources
gulp.task('sass', function() {
	return gulp.src('src/css/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});

// Bundles the JS resources
function bundle() {
	return watched.bundle()
		.pipe(source('mapit.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js'));
}

// Watches for changes to watched files
gulp.task('watch', function() {
	gulp.watch(['src/css/**/*.scss'], gulp.parallel('sass'));
	gulp.watch(['src/js/**/*.ts'], bundle);
	gulp.watch(['src/html/**/*.html'], gulp.parallel('copy-html'));
});

// Set up the default and watch tasks
gulp.task('default', gulp.series(gulp.parallel('copy'), bundle, gulp.parallel('watch')));
watched.on('update', bundle);
watched.on('log', fancy_log);