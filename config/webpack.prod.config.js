const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.common.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    optimization: {

        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
        ]
      }
});