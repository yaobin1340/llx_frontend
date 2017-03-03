var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var csso = require('gulp-csso');
var debug = require('gulp-strip-debug');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');

gulp.task('default',function() {
	gulp.run('img');  
    gulp.run('html');  
    gulp.run('js.css');  
});
//压缩图片
gulp.task('img',function(){
	gulp.src('assets/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/img'))
});

//压缩html代码
gulp.task('html',function(){
	var options = {
		collapseWhitespace:true,
		collapseBooleanAttributes:true,
		removeComments:true,
		removeEmptyAttributes:true,
		removeScriptTypeAttributes:true,
		removeStyleLinkTypeAttributes:true,
		minifyJS:true,
		minifyCSS:true
	};
	gulp.src('views/*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('views/'));
});

//压缩js、css文件
gulp.task('js.css',function() {
	var jsFilters = filter(['**/*.js'],{restore:true});
	var cssFilter = filter('**/*.css',{restore:true});
	var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});
	return gulp.src(['index.html'])
		.pipe(jshint())
		.pipe(useref())
		.pipe(jsFilters)
		.pipe(debug())
		.pipe(uglify({
			mangle: false //是否修改变量名
		}))
		.pipe(jsFilters.restore)
		.pipe(cssFilter)
		.pipe(csso())
		.pipe(cssFilter.restore)
		.pipe(indexHtmlFilter)
		.pipe(rev())
		.pipe(indexHtmlFilter.restore)
		.pipe(revReplace())
		.pipe(gulp.dest('../llx_frontend'))
});