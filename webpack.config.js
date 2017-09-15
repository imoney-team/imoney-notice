var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [{
    name: "develop",
    entry: {
        notice:["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
        filename: "notice.js",
        library: 'Notice',
        libraryTarget: 'umd'
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]

            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },

        ]
    }
}, {
    name: "build",
    entry: {
        notice:["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
        filename: "notice.min.js",
        library: 'Notice',
        libraryTarget: 'umd'
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]

            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },

        ]
    }
}]
