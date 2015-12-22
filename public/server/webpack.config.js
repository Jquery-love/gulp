var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, '../../node_modules');
var distDir = __dirname.replace('public','dist');
var cmdDir = __dirname.replace(process.cwd()+'\\public\\','');
var argv = require('minimist')(process.argv.slice(2));
var DEBUG = argv.env == 'dev';
// console.log(process.cwd(),__dirname,distDir);
// console.log(path.join(__dirname, '../../dist/user/js'));
// console.log(__dirname,process.cwd(),cmdDir);
// console.log(process.chdir());
// console.log(path.resolve(distDir,'js'));
var plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  })
];

if(!DEBUG){
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compressor: true,
        output: {comments: false}
    }));
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// console.log(__dirname,process.cwd(),path.resolve(process.cwd(),'public','common/js/jquery-1.11.3.min.js'));



module.exports = {
    //插件项
    plugins: plugins,
    //页面入口文件配置
    entry: {
        login   :path.resolve(__dirname,'js/login.js'),
        plugins :path.resolve(__dirname,'js/plugins.js')
    },
    //入口文件输出配置
    output: {
        path: path.resolve(distDir,'js'),
        filename: '[name].js',
        chunkFilename: '/[chunkhash:8].chunk.js',
        publicPath: '/'+ cmdDir +'/js'
    },
    module: {
        //加载器配置
        loaders: [
            // { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
    },
    externals: {
        // 'jquery': 'jQuery'
    },
    //其它解决方案配置
    resolve: {
        // root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json'],
        alias: {
            // root : process.cwd()+'/public',
            jquery: path.resolve(process.cwd(),'public','common/js/jquery-1.11.3.min.js'),
            weixin : path.resolve(process.cwd(),'public','common/js/jweixin-1.0.0.js'),
            ionic : path.resolve(process.cwd(),'public','lib/js/ionic/ionic.bundle.min.js')
        }
    },
    noParse:['/ionic/','common'],
    debug: DEBUG,
    cache: DEBUG,
    devtool:DEBUG ? '#eval' : false
};