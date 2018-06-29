const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { globEntries, MultipleBundlesPlugin } = require('multiple-bundles-webpack-plugin');

const entryPatterns = {
	js: './js/[a-z]*.js',
	sass: './sass/[a-z]*.scss'
};
const entries = {
	...globEntries([entryPatterns.js]),
	...globEntries([entryPatterns.sass], { sass: true }),
  };

module.exports = (options) => {
	const config = {
		entry: entries,
		output: {
			path: path.resolve(__dirname, './dist'),
			publicPath: '/dist/',
			filename: '[name].js'
		},
		devtool: 'cheap-source-map',
		devServer: {
			inline: true,
			historyApiFallback: true,
			stats: 'errors-only',
			port: 3000,
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					include: path.resolve(__dirname, './js/'),
					use: [{
						loader: options.mode === 'production' ? 'happypack/loader?id=js' : 'babel-loader?cacheDirectory=./buildCache/babel/'
					}],
				},
				{
					test: /\.scss$/,
					include: path.resolve(__dirname, './sass/'),
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					use: 'file-loader?name=[name].[ext]&publicPath=assets/&outputPath=dist/assets/'
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new MultipleBundlesPlugin({
				test: /\.js$/,
				entries: globEntries([entryPatterns.sass], { sass: true }),
			}),
		],
	}
	return config;
}