// enables using relative paths working on all OSes
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
    {
        target: 'electron-renderer',
        devtool: 'inline-source-map',
        entry: { app: path.resolve(__dirname, 'src/app.tsx') },
        mode: 'development',
        module: {
            rules: [ 
                {
                    // check typescript style before the build
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                    options: {
                        typeCheck: true,
                        emitErrors: true
                    }
                },
                {
                    // transpile typescript to js
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                },
                {
                    // scss loader
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    // image file loader
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    // font file loader
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        optimization: {
            // split out a chunk that is needed to runtime
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    // split out a chunk of external dependencies (easy to cache)
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        output: {
            // output to dist folder and include a content hash for correct caching behaviour
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            // cleans up the webpack build artifacts on every run
            new CleanWebpackPlugin(['dist'], {exclude: ['vendor.js']}),
            // generates the index.html file where the app is injected into
            new HtmlWebpackPlugin({
                title: 'Sentinel',
                template: 'src/index.html'
            }),
            // minify CSS
            new MiniCssExtractPlugin(),
            // ensure hashes of chunks don't change when they don't need to
            new webpack.HashedModuleIdsPlugin()
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        }
    },
    {
        target: 'electron-main',
        mode: 'development',
        entry: { main: path.resolve(__dirname, 'src/main.ts') },
        output: {
            // output to dist folder and include a content hash for correct caching behaviour
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    // check typescript style before the build
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                    options: {
                        typeCheck: true,
                        emitErrors: true
                    }
                },
                {
                    // transpile typescript to js
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }
            ]
        },
        resolve: {
          extensions: ['.js', '.ts', '.json']
        }
    },
];
