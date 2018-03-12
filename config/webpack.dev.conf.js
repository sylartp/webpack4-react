const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

module.exports = {
    context: __dirname,
    mode: 'development',
    devtool: 'inline-source-map',
    entry:{
        app: [PATHS.src],
        vendor: ['babel-polyfill']
    },
    output:{
        filename: "bundle.js",
        path: PATHS.dist
    },
    module:{
        rules: [
            {
                test: /\.(less)$/,
                include: PATHS.src,
                use: ExtractTextPlugin.extract(
                    {
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'},{
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            )
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                include: PATHS.src
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                  chunks: 'initial',
                  minChunks: 2, maxInitialRequests: 5,
                  minSize: 0
                },
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  chunks: 'initial',
                  name: 'vendor',
                  priority: 10,
                  enforce: true
                }
            }
        },      
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(
            {
                title: 'social club',
                template: '../src/index.html'
            }),
        new ExtractTextPlugin('theme.css'),
    ],
    devServer: {
        contentBase: PATHS.dist,
        inline: true,
        compress: true,
        port: 9092,
        publicPath: '/',
        host: '0.0.0.0',
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: 'index.html' },
            ]
        }
    }
}