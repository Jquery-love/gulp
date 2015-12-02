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
  // new webpack.ProvidePlugin({
  //   $: "jquery",
  //   jQuery: "jquery",
  //   "window.jQuery": "jquery"
  // })
];
console.log(DEBUG);
if(!DEBUG){
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compressor: true,
        output: {comments: false}
    }));
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// console.log(plugins,);



module.exports = {
    //插件项
    plugins: plugins,
    //页面入口文件配置
    entry: {
        demo : path.resolve(__dirname,'js/demo.js')
    },
    //入口文件输出配置
    output: {
        // path : path.resolve(__dirname, '../../dist/user/js'),
        // filename: 'index.js',
        // publicPath: path.resolve(__dirname, '../../dist/user/js/')
        path: path.resolve(distDir,'js'),
        filename: '[name].js',
        chunkFilename: '/[chunkhash:8].chunk.js',
        publicPath: '/'+ cmdDir +'/js'
    },
    module: {
        //加载器配置
        loaders: [
            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            // { test: /\.js$/, loader: 'jsx-loader?harmony' },
            // { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ],
        noParse : []
    },
    externals: {
        'jquery': 'jQuery'
    },
    //其它解决方案配置
    resolve: {
        // root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            ionic : path.resolve(__dirname,'js/ionic/ionic.bundle.js')
        }
        // alias: {
        //     AppStore : 'js/stores/AppStores.js',
        //     ActionType : 'js/actions/ActionType.js',
        //     AppAction : 'js/actions/AppAction.js'
        // }
    },
    debug: DEBUG,
    cache: DEBUG,
    devtool:DEBUG ? '#eval' : false
};