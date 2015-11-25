var path = require('path');
var webpack = require('webpack');

module.exports = {
    //插件项
    plugins: [new webpack.optimize.CommonsChunkPlugin('common.js')],
    //页面入口文件配置
    entry: {
        index : './public/user/js/index.js',
        common: './app/vendor.js'
    },
    //入口文件输出配置
    output: {
        filename: 'user/js/[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            // { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    externals: {
        'jquery': 'jQuery'
    },
    //其它解决方案配置
    resolve: {
        // root: 'E:/github/flux-example/src', //绝对路径
        // extensions: ['', '.js', '.json', '.scss'],
        // alias: {
        //     AppStore : 'js/stores/AppStores.js',
        //     ActionType : 'js/actions/ActionType.js',
        //     AppAction : 'js/actions/AppAction.js'
        // }
    }
};