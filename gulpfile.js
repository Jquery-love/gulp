'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// 语法检查
gulp.task('jshint', function () {
    return gulp.src('public/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});


// 合并文件之后压缩代码
gulp.task('minify', function (){
     return gulp.src('public/*/*.js')
        .pipe(plugins.concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename('all.min.js'))
        .pipe(gulp.dest('dist'));
});
//将ejs 模块生成html
gulp.task('ejs',function(){
	return gulp.src(['public/**/[^_]*.ejs','!public/**/?parts/[^_]*.ejs'])
		.pipe(plugins.ejs({},{ext: '.html'}))
		.pipe(plugins.rename(function(path){
			path.dirname = path.dirname.replace(/(?!\\)views/gi,'html');
		}))
		.pipe(gulp.dest("./public/"))
		.pipe(plugins.notify({message: "ejs task complete"}));
});
//将scss 文件生成css文件
gulp.task('sass',function(){
	return gulp.src(['public/**/[^_]*.scss','!public/**/?parts/[^_]*.scss'])
		.pipe(plugins.sass({style:"expanded"}).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(plugins.rename(function(path){
			path.dirname = path.dirname.replace(/(?!\\)scss/gi,'css');
		}))
		.pipe(plugins.minifyCss({keepSpecialComments: 0}))
		.pipe(gulp.dest('public/'))
		.pipe(plugins.notify({message: "css task complete"}));
});

// gulp.task('images',function(){
	
// });
// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch('public/*/*.js', ['jshint', 'minify']);
    gulp.watch('public/*/views/*.ejs',['ejs']);
 	gulp.watch('public/**/*.scss', ['sass']);
	
});




//使用connect启动一个Web服务器
gulp.task('connect', function () {
  	plugins.connect.server({
    	root: 'public',
    	livereload: true,
    	port:88
  	});
});

// 注册缺省任务
gulp.task('default', ["jshint"],function(){
	gulp.start("connect","watch");
});
