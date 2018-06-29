const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const HappyPack = require('happypack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const base = require('./webpack.common')({
    mode: 'production'
});
module.exports = Object.assign(
    {},
    base,
    {
        mode: 'production',
        plugins: [
            ...base.plugins,
            new HardSourceWebpackPlugin({
                cacheDirectory: './buildCache/.cache/hard-source/[confighash]',
                recordsPath: './buildCache/.cache/hard-source/[confighash]/records.json',
            }),
            new HappyPack({
                id: 'js',
                threads: 4,
                loaders: ['babel-loader?cacheDirectory=./buildCache/babel/']
            })
        ],
        devtool: 'none',
        optimization: {
            mangleWasmImports: true,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: {
                        name: 'dist/vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        ecma: 6,
                        mangle: true,
                    },
                }),
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: cssnano,
                    cssProcessorOptions: {
                        discardComments: {
                            removeAll: false,
                        },
                    },
                    canPrint: true,
                }),
            ],
        }
    }
);
