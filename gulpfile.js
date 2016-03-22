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
	item	: options._[0] == 'all' ? '**' : options._[0], //是启动所有目录还是针对一个目录
	port	: 3000
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
			gulp.start('js');
		}
		// exists ? webpack(require(gcf.wpkDir),bundle) : gulp.start('js');
	});
});
gulp.task('js',function(){
	return gulp.src([gcf.devDir + '/'+ gcf.item +'/js/*.js',gcf.devDir + '/'+ gcf.item +'/js/**/*.js'])
		// .pipe(plugins.watch([gcf.devDir + '/**/js/*.js',gcf.devDir + '/**/js/**/*.js']))
		.pipe(plugins.if(gcf.item != '**',plugins.changed(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/js/'),{extension : '.js'})))
		.pipe(plugins.plumber())
		// .pipe(plugins.jshint())
		// .pipe(plugins.jshint.reporter('default'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/js/')))
		.pipe(reload({stream: true}))
		.pipe(plugins.notify({message: "js task complete <%= file.relative %>"}));
});
// var isPartial = function (file) {
// 	console.log(/_/.test(file.relative),'isPartial');
//     return /_/.test(file.relative);
// };
var inheritanceCondition = function (file) {
    //as a result of this, only partials will trigger inheritance compiling
    //i.e. if a full file (not a partial) (1) is imported by another (2), changes to (1) will not trigger compilation in (2)
    var filepath = file.history[0];
    var filename = filepath.replace(/^.*[\\\/]/, '');
    console.log(/\/_/.test(filename) || /^_/.test(filename));
    return /\/_/.test(filename) || /^_/.test(filename); // check whether partial (starts with '_');
};
var filterCondition = function(file){
	var filename = file.path.replace(/^.*[\\\/]/, '');
	// console.log(file.relative,file.path,!(/\/_/.test(filename) || /^_/.test(filename)));
	console.log(!(/\/_/.test(filename) || /^_/.test(filename)));
	return !(/\/_/.test(filename) || /^_/.test(filename));
};
//将scss 文件生成css文件
gulp.task('sass',function(){
	var config = {};
	// console.log(global.isWatching);
	// if(gcf.env == 'dev'){config.sourceComments = 'map';config.errLogToConsole = true;config.outputStyle = 'compact';}
	config.outputStyle = 'compressed';
	// console.info(plugins.cached('sass'));
	return gulp.src([gcf.devDir + '/' + gcf.item + '/css/*.scss',gcf.devDir + '/' + gcf.item + '/css/**/*.scss'])
		.pipe(plugins.if(gcf.item != '**',plugins.changed(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/css/'),{extension: '.css'})))
		.pipe(plugins.plumber())
		// .pipe(plugins.watch([gcf.devDir + '/'+ gcf.item +'/css/*.scss']))
		// .pipe(plugins.if(global.isWatching,plugins.cached('sass')))
		// .pipe(plugins.sassInheritance({dir : gcf.devDir + '/' + gcf.item + '/css/'}))
		// .pipe(plugins.if(inheritanceCondition, plugins.sassInheritance({dir: gcf.devDir})))

		// .pipe(plugins.sassInheritance({dir: gcf.devDir + '/**/css/', debug: false}))
		// .pipe(plugins.filter(function (file) {
		// 	var filename = file.path.replace(/^.*[\\\/]/, '');
		// 	return !(/\/_/.test(filename) || /^_/.test(filename));
		// 	// console.log(file,!/\/_/.test(file.path) || !/^_/.test(file.relative));
		// 	// return !/\/_/.test(file.path) || !/^_/.test(file.relative);
		// }))
		// .pipe(plugins.watch([gcf.devDir + '/**/css/**.scss']))
		// .pipe(plugins.ifElse(filterCondition,function(stream){ return stream;},function(stream){return stream;} ))
		.pipe(plugins.sass(config).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/css/')))
		.pipe(reload({stream: true}))
		.pipe(plugins.notify({message: "<%= file.relative %> css complete"}));
});

//清空图片、样式、js
gulp.task('clean', function() {
	// console.log(gcf.item,gcf.outDir+'/'+ gcf.item +'/css/**');
	var clearDirs = [gcf.outDir+'/'+ gcf.item +'/css/*.css',gcf.outDir+'/'+ gcf.item +'/css/**/*.css',gcf.outDir+'/'+ gcf.item +'/html/*.html',gcf.outDir+'/'+ gcf.item +'/html/**/*.html', gcf.outDir+'/'+ gcf.item +'/js/*.js',gcf.outDir+'/'+ gcf.item +'/js/**/*.js', gcf.outDir+'/'+ gcf.item +'/img/*.@(png|jpg|jpeg|gif)',gcf.outDir+'/'+ gcf.item +'/img/**/*.@(png|jpg|jpeg|gif)'];
    return gulp.src(clearDirs, {read: false})
        .pipe(plugins.clean({force: true}));
});

gulp.task("fonts",function(){
	return gulp.src(gcf.devDir + '/**/fonts/*')
		.pipe(plugins.changed(gcf.outDir))
		.pipe(gulp.dest(gcf.outDir));
});

//将ejs 模块生成html
gulp.task('ejs',function(){
	// console.log(gcf.item);
	return gulp.src([gcf.devDir + '/' + gcf.item + '/html/[^_]*.ejs','!'+ gcf.devDir + '/' + gcf.item + '/html/?parts/[^_]*.ejs'])
		.pipe(plugins.if(gcf.item != '**',plugins.changed(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/html/'),{extension: '.html'})))
		.pipe(plugins.plumber())
		.pipe(plugins.ejs({},{ext: '.html'}))
		// .pipe(plugins.minifyHtml({
		// 	quotes:true,
		// 	conditionals:true
		// }))
		.pipe(gulp.dest(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/html/')))
		.pipe(reload({stream: true}))
		.pipe(plugins.notify({message: "<%= file.relative %> ejs complete"}));
});
// 图片处理
gulp.task('img', function(){
    gulp.src([gcf.devDir + '/'+ gcf.item +'/img/**'])
    	// .pipe(plugins.watch([gcf.devDir + '/'+ gcf.item +'/img/**/*',gcf.devDir + '/'+ gcf.item +'/img/*']))
    	// .pipe(plugins.if(gcf.item != '**',plugins.changed(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/img/'),{extension: '.@(png|jpg|jpeg|gif|ico)'})))
    	.pipe(plugins.if(gcf.item != '**',plugins.newer(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/img/'))))
        // .pipe(plugins.cached(plugins.imagemin({
        // 	progressive: true,//类型：Boolean 默认：false 无损压缩jpg图片
        // 	optimizationLevel:5,//类型：Number  默认：3  取值范围：0-7（优化等级）
        // 	interlaced : true,//类型：Boolean 默认：false 隔行扫描gif进行渲染
        // 	multipass : true //类型：Boolean 默认：false 多次优化svg直到完全优化
        // })))
        .pipe(gulp.dest(gcf.outDir + (gcf.item == '**' ? '' : '/' + gcf.item + '/img/')))
        .pipe(reload({stream: true}))
        .pipe(plugins.notify({message: "<%= file.relative %> img complete"}));
});
// gulp.task('setWatch', function() {
//     global.isWatching = true;
// });
gulp.task('serve',function(){
	browserSync({
		port: gcf.port,
		open: false,
		server:{
			baseDir:gcf.outDir,
			directory:true
		},
		online: true
	});
	gulp.watch([gcf.outDir + '/'+ gcf.item +'/fonts/**']).on('change', reload);

	fs.exists(gcf.wpkDir,function(exists){
		if(exists){
			gulp.watch(gcf.devDir + '/'+ gcf.item +'/js/**', ['webpack']);
		}else{
			gulp.watch(gcf.devDir + '/'+ gcf.item +'/js/**', ['js']);
		}
		// exists ? webpack(require(gcf.wpkDir),bundle) : gulp.start('js');
	});
	gulp.watch(gcf.devDir + '/'+ gcf.item +'/html/**',['ejs']);
	gulp.watch(gcf.devDir + '/'+ gcf.item +'/fonts/**',['fonts']);
	gulp.watch(gcf.devDir + '/'+ gcf.item +'/img/**',['img']);
 	gulp.watch(gcf.devDir + '/'+ gcf.item +'/css/**', ['sass']);

});


dirs.forEach(function(dir){
	gulp.task(dir,function(){
		if(gcf.env == 'dev'){
			// gulp.start('webpack','sass','ejs','img','fonts');
			gulp.start('serve');
		}else{
			gulp.start('sass','ejs','img','fonts','webpack');
		}
	});
});
gulp.task('all',function(){
		// gulp.start('webpack','sass','ejs','img','fonts');
		gulp.start('sass','ejs','img','fonts','webpack');
});
