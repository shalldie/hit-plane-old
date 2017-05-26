const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // "hitplane-loading": "./src/hitplane-loading",
        "hitplane": './src/app'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.jpg$|\.png$/,
                use: ['url-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body',
            hash: true,
            minify: { removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true }
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json', '.scss', '.jpg', '.png']
    }
};