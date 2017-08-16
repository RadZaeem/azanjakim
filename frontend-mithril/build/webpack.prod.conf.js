var merge = require('webpack-merge')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.conf')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     sourceMap: false
        // }),

    new UglifyJSPlugin()
  
    ]
})
