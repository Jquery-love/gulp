'use strict';
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var minimist = require('minimist');
var webpack = require('webpack');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var options = minimist(process.argv.slice(2));
var gcf = {
	env 	: options.env || 'dev',
	outDir	: 'dist',
	devDir 	: 'public',
	item	: options._[0],
	port	: 88
};
gcf.wpkDir = './'+gcf.devDir + '/'+ gcf.item +'/webpack.config.js';
var dirs = fs.readdirSync(path.join(__dirname,gcf.devDir));
gulp.task('webpack', function (cb) {
	var bundle = function(err, stats){
		if(err) throw new plugins.util.PluginError("webpack", err);
		plugins.util.log("[webpack]", stats.toString({
			chunks: false,
			colors: true
		}));
		cb();
	};
	fs.exists(gcf.wpkDir,function(exists){
		if(exists){
			webpack(require(gcf.wpkDir),bundle);
			gulp.watch([gcf.outDir + '/**/js/*.js']).on('change', reload);
		}else{
			gulp.start('js')
		}
		// exists ? webpack(require(gcf.wpkDir),bundle) : gulp.start('js');
	});
});
gulp.task('js',function(){
	return gulp.src([gcf.devDir + '/**/js/*.js',gcf.devDir + '/**/js/**/*.js'])
		.pipe(plugins.changed(gcf.outDir,{extension : '.js'}))
		.pipe(plugins.if(gcf.env!='dev',plugins.uglify()))
		.pipe(gulp.dest(gcf.outDir))
		.pipe(reload({stream: true}))
		.pipe(plugins.notify({message: "js task complete <%= file.relative %>"}));
});
//将scss 文件生成css文件
gulp.task('sass',function(){
	var config = {};
	// if(gcf.env == 'dev'){config.sourceComments = 'map';config.errLogToConsole = true;config.outputStyle = 'compact';}
	config.outputStyle = 'compact';
	return gulp.src([gcf.devDir + '/**/css/[^_]*.scss','!' + gcf.devDir +'/**/?parts/[^_]*.scss'])
		.pipe(plugins.changed(gcf.outDir,{extension : '.css'}))
		.pipe(plugins.sass(config).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(gcf.outDir))
		.pipe(reload({stream: true}))
		.pipe(plugins.notify({message: "css task complete"}));
});

// 清空图片、样式、js
gulp.task('clean', function() {
	var clearDirs = [gcf.outDir+'/'+ gcf.item +'/css/',gcf.outDir+'/'+ gcf.item +'/html/', gcf.outDir+'/'+ gcf.item +'/js/', gcf.outDir+'/'+ gcf.item +'/img/'];
    return gulp.src(clearDirs, {read: false})
        .pipe(plugins.clean({force: true}));
});

gulp.task("fonts",function(){
	return gulp.src(gcf.devDir + '/**/fonts/*')
		.pipe(plugins.changed(gcf.outDir))
		.pipe(gulp.dest(gcf.outDir));
})

//将ejs 模块生成html
gulp.task('ejs',function(){
	return gulp.src([gcf.devDir + '/**/[^_]*.ejs','!'+ gcf.devDir + '/**/?parts/[^_]*.ejs'])
		.pipe(plugins.changed(gcf.outDir,{extension: '.html'}))
		.pipe(plugins.ejs({},{ext: '.html'}))
		.pipe(plugins.if(gcf.env!='dev',plugins.minifyHtml({
			quotes:true,
			conditionals:true
		})))
		.pipe(gulp.dest(gcf.outDir))
		.pipe(reload({stream: true}))
		.pipe(plugins.notify({message: "ejs task complete"}));
});
// 图片处理
gulp.task('img', function(){
    gulp.src([gcf.devDir + '/**/img/**/*.@(png|jpg|jpeg|gif)',gcf.devDir + '/**/img/*.@(png|jpg|jpeg|gif)'])
    	.pipe(plugins.changed(gcf.outDir))
        // .pipe(plugins.imagemin())
        .pipe(gulp.dest(gcf.outDir))
        .pipe(reload({stream: true}))
        .pipe(plugins.notify({message: "img task complete"}));
})
gulp.task('serve',['sass','ejs'],function(){
	browserSync({
		port: gcf.port,
		open: false,
		server:{
			baseDir:gcf.outDir,
			directory:true
		},
		online: true
	});
	gulp.watch([gcf.outDir + '/**/fonts/**']).on('change', reload);

	fs.exists(gcf.wpkDir,function(exists){
		if(exists){
			gulp.watch(gcf.devDir + '/**/js/**', ['webpack']);
		}else{
			gulp.watch(gcf.devDir + '/**/js/**', ['js']);
		}
		// exists ? webpack(require(gcf.wpkDir),bundle) : gulp.start('js');
	});
	gulp.watch(gcf.devDir + '/**/html/**',['ejs']);
	gulp.watch(gcf.devDir + '/**/fonts/**',['fonts']);
	gulp.watch(gcf.devDir + '/**/img/**',['img']);
 	gulp.watch(gcf.devDir + '/**/css/**', ['sass']);
	
});


dirs.forEach(function(dir){
	gulp.task(dir,['clean'],function(){
		if(gcf.env == 'dev'){
			gulp.start('webpack','sass','ejs','img','fonts');
			gulp.start('serve');
		}else{
			gulp.start('sass','ejs','img','fonts','webpack')
		}
	})
})