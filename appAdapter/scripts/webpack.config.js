const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        singleSpaEntry: '../src/singleSpaEntry.js',
        store: '../src/store.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../release'),
        libraryTarget: 'umd',
        library: 'app1'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/app1/',
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        "extensions": [
            ".js"
        ],
        modules: [
            __dirname,
            '../node_modules',
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                parallel: true,
                uglifyOptions: {
                    ecma: 6,
                    warnings: false,
                    ie8: false,
                    mangle: true,
                    compress: {
                        pure_getters: true,
                        passes: 2
                    },
                    output: {
                        ascii_only: true,
                        comments: false
                    }
                }
            })
        ]
    },
    mode: 'development',

    // devtool: 'eval-source-map',
    devtool: 'none',

};
