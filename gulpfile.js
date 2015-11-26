'use strict';
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var minimist = require('minimist');
var webpack = require('webpack');
var plugins = require('gulp-load-plugins')();
// var runSequence = require('run-sequence');
var options = minimist(process.argv.slice(2));
var gcf = {
	env : options.env || 'prod',
	prod: 'dist',
	dev : 'public',
	item: options._
};


var dirs = fs.readdirSync(path.join(__dirname,gcf.dev));

gulp.task('jshint', function () {
    return gulp.src(gcf.dev + '/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default')); //错误默认提示
        // .pipe(plugins.jshint.reporter(plugins.stylish)); //高亮提示
});
gulp.task('webpack', function (cb) {
	var bundle = function(err, stats){
		if(err) throw new plugins.util.PluginError("webpack", err);
        plugins.util.log("[webpack]", stats.toString({
            chunks: false,
        	colors: true
        }));
        cb();
	};
	var config = require( './'+gcf.dev + '/'+ gcf.item +'/webpack.config');
	var compiler = webpack(config);
	compiler.watch({},bundle);
});

//将scss 文件生成css文件
gulp.task('sass',function(){
	return gulp.src([gcf.dev + '/**/[^_]*.scss','!' + gcf.dev +'/**/?parts/[^_]*.scss'])
		.pipe(plugins.sass({outputStyle:"compressed"}).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist'))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({message: "css task complete"}));
});



//将ejs 模块生成html
gulp.task('ejs',function(){
	return gulp.src([gcf.dev + '/**/[^_]*.ejs','!'+ gcf.dev + '/**/?parts/[^_]*.ejs'])
		.pipe(plugins.ejs({},{ext: '.html'}))
		.pipe(plugins.if(gcf.env=='prod',plugins.minifyHtml({
			quotes:true,
			conditionals:true
		})))
		.pipe(gulp.dest(gcf.prod))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({message: "ejs task complete"}));
});

// 监视文件的变化
gulp.task('watch', function () {
	plugins.livereload.listen();
    gulp.watch(gcf.dev + '/**/*.js', ['jshint', 'webpack']);
    gulp.watch(gcf.dev + '/**/*.ejs',['ejs']);
 	gulp.watch(gcf.dev + '/**/*.scss', ['sass']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
  	plugins.connect.server({
    	root: gcf.prod,
    	livereload: true,
    	port:88
  	});
});

dirs.forEach(function(dir){
	gulp.task(dir,function(){
		gulp.start('connect');
		gulp.start('watch');
	})
})