'use strict';
var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();
// var runSequence = require('run-sequence');
// console.log(__dirname);
// 语法检查
gulp.task('jshint', function () {
    return gulp.src('public/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default')); //错误默认提示
        // .pipe(plugins.jshint.reporter(plugins.stylish)); //高亮提示
});
var pathDir = 'user';
gulp.task('webpack', function () {
	var pathTemp;
    gulp.src('public/**/js/*.js')
        .pipe(plugins.rename(function(path){
        	// console.log(path.dirname);
			pathTemp = path.dirname;
			// config = require('./public/'+ path.dirname.slice(0,path.dirname.indexOf("\\")) +'/webpack.config.js');
			// path.dirname = path.dirname.replace(/(?!\\)scss/gi,'css');
		}))
        .pipe(plugins.webpack(require('./public/'+ pathDir +'/webpack.config')))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.rev())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.rev.manifest())
        .pipe(plugins.rename(function(path){
			path.dirname = pathTemp; 
		}))
		.pipe(gulp.dest('public'))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({message: "webpack task complete"}));
});

// gulp.task('webpack', function (callback) {
// 	var pathTemp,config;
// 	return gulp.src('public/**/js/*.js')
// 		.pipe(plugins.webpack({
// 			entry: {
// 		        index: './public/user/js/index.js',
// 		    },
// 		    output: {
// 		        filename: 'user/js/[name].js'
// 		    }
// 		}))
// 		// .pipe(plugins.uglify())
//     	.pipe(gulp.dest('dist'))
// });
// gulp.task('webpack', function (callback) {
// 	var pathTemp;
// 	// var myConfig = Object.create(webpackConfig);
// 	return gulp.src('public/**/js/*.js')
// 		.pipe(plugins.webpack(config))
// 		// .pipe(plugins.uglify())
//     	.pipe(gulp.dest('dist'))
// });



//将scss 文件生成css文件
gulp.task('sass',function(){
	var pathTemp;
	return gulp.src(['public/**/[^_]*.scss','!public/**/?parts/[^_]*.scss'])
		.pipe(plugins.sass({outputStyle:"compressed"}).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(plugins.rename(function(path){
			pathTemp = path.dirname;
			// path.dirname = path.dirname.replace(/(?!\\)scss/gi,'css');
		}))
		.pipe(plugins.rev())
		.pipe(gulp.dest('dist'))
		.pipe(plugins.rev.manifest())
		.pipe(plugins.rename(function(path){
			path.dirname = pathTemp; 
		}))
		.pipe(gulp.dest('public'))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({message: "css task complete"}));
});



//将ejs 模块生成html
gulp.task('ejs',function(){
	return gulp.src(['public/**/[^_]*.ejs','!public/**/?parts/[^_]*.ejs'])
		.pipe(plugins.ejs({},{ext: '.html'}))
		.pipe(plugins.rename(function(path){
			// console.log(path);
			// path.dirname = path.dirname.replace(/(?!\\)views/gi,'html');
			// path.basename += "-min";
		}))
		.pipe(gulp.dest("dist"))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({message: "ejs task complete"}));
});

//压缩Html/更新引入文件版本
gulp.task('miniHtml',function () {
  	return gulp.src(['public/**/rev\-*.json','public/**/*.ejs'])
    	.pipe(plugins.revCollector())
    	.pipe(gulp.dest('public'))
    	.pipe(plugins.notify({message: "miniHtml complete"}));
});
//CSS里更新引入文件版本号


// gulp.task('images',function(){
	
// });

// 监视文件的变化
gulp.task('watch', function () {
	plugins.livereload.listen();
    gulp.watch('public/**/*.js', ['jshint', 'webpack']);
    gulp.watch('public/**/*.ejs',['ejs']);
 	gulp.watch('public/**/*.scss', ['sass']);
});




//使用connect启动一个Web服务器
gulp.task('connect', function () {
  	plugins.connect.server({
    	root: 'dist',
    	livereload: true,
    	port:88
  	});
});

//开发构建
// gulp.task('dev', function (done) {
//   // condition = false;
//   runSequence(
//      ['sass'],
//      ['ejs'],
//      ['miniHtml'],
//   done);
// });

// 注册缺省任务
gulp.task('user', function(){
	gulp.start('connect','miniHtml');
	gulp.start('watch');
});
