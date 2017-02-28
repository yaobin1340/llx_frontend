 var gulp = require('gulp');
 var rev = require('gulp-rev');
 var revReplace = require('gulp-rev-replace');
 var useref = require('gulp-useref');
 var filter = require('gulp-filter');
 var uglify = require('gulp-uglify');
 var jshint = require('gulp-jshint');
 var csso = require('gulp-csso');
 var debug = require('gulp-strip-debug');
 gulp.task('default',function() {
 	var jsFilter = filter('/resou/*.js',{restore:true});
 	var cssFilter = filter('**/*.css',{restore:true});
 	var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});
 	return gulp.src('index.html')
 		.pipe(jshint())
 		.pipe(useref())
 		.pipe(jsFilter)
		.pipe(debug())
 		.pipe(uglify())
 		.pipe(jsFilter.restore)
 		.pipe(cssFilter)
 		.pipe(csso())
 		.pipe(cssFilter.restore)
 		.pipe(indexHtmlFilter)
 		.pipe(rev())
 		.pipe(indexHtmlFilter.restore)
 		.pipe(revReplace())
 		.pipe(gulp.dest('../llx_frontend'));
 });

 gulp.task('controller',function() {
 	var jsFilters = filter('/contro/*.js',{restore:true});
 	var cssFilter = filter('**/*.css',{restore:true});
 	var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});
 	return gulp.src('index.html')
 		.pipe(jshint())
 		.pipe(useref())
 		.pipe(jsFilters)
		.pipe(debug())
 		.pipe(uglify())
 		.pipe(jsFilters.restore)
 		.pipe(cssFilter)
 		.pipe(csso())
 		.pipe(cssFilter.restore)
 		.pipe(indexHtmlFilter)
 		.pipe(rev())
 		.pipe(indexHtmlFilter.restore)
 		.pipe(revReplace())
 		.pipe(gulp.dest('../llx_frontend'));
 });