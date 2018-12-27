// enables using relative paths working on all OSes
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = {
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
            },
        ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.json']
    }
};


// merge the common config with the app-specific
module.exports = [
    Object.assign(
        {
            target: 'electron-renderer',
            devtool: 'inline-source-map',
            entry: { app: path.resolve(__dirname, 'src/app.ts') },
            mode: 'development',
            module: {
                rules: [
                    {
                        // css loader
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
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
            plugins: [
                // cleans up the webpack build artifacts on every run
                new CleanWebpackPlugin(['dist']),
                // generates the index.html file where the app is injected into
                new HtmlWebpackPlugin({
                    title: 'Sentinel',
                    template: 'src/index.html'
                }),
                // ensure hashes of chunks don't change when they don't need to
                new webpack.HashedModuleIdsPlugin()
            ]
        }, commonConfig),
    Object.assign({
        target: 'electron-main',
        mode: 'development',
        entry: { foo: path.resolve(__dirname, 'src/main.ts') }
    }, commonConfig)
];
