const path = require('path');
const resolve = require('path').resolve;

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['webpack-hot-middleware/client?reload=true', resolve(path.join(__dirname, 'src', 'browser', 'App.tsx'))],
        vendor: ['webpack-hot-middleware/client?reload=true', 'react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: resolve(path.join(__dirname, 'build', 'public')),
        filename: 'js/[name].bundle.js'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader'
        },
        { 
            enforce: "pre", 
            test: /\.js$/,
            loader: "source-map-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'src', 'browser', 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}