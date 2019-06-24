const path = require('path');

module.exports = {
    context: __dirname + '/src',
    entry: {
        index: './index.js',
    },
    output: {
        path: __dirname + '/src',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                exclude: /node_modules|svelte/,
                loader: 'html-loader',
            },
            {
                test: /\.(jpe?g|png|webp|gif|otf|ttf|woff2?|ani)$/,
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    limit: 10000,
                    publicPath: '/'
                }
            },
        ],
    },
};