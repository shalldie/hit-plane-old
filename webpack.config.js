// var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        "hitplane-source": "./src/img/hitplane-source",
        "hitplane": './src/hitplane'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                text: /\.ts?$/,
                exclude: /node_modules/,
                loader: 'ts'
            },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.jpg$|\.png$/, loader: 'url?limit=81920&name=[name].[ext]' }
        ]
    },
    resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.ts', '.js', '.json', '.less', '.jpg', '.png'],
        alias: { // 设置别名

        }
    },
    // eslint: {
    //     configFile: './.eslintrc'
    // },
    externals: {
        // 'jQuery': 'jQuery'
    }
};