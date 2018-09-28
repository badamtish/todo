import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import bodyParser from 'body-parser';
import TodoRoutes from './todo-routes';

const APP_PORT = 3001;

const compiler = webpack({
	mode: 'development',
	entry: ['whatwg-fetch', path.resolve(__dirname, '../frontend', 'app.js')],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /\/node_modules\//,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			}
		],
	},
	devServer: {
		contentBase: '../frontend',
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hot Module Replacement'
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	output: {
		filename: 'app.js',
		path: '/',
	},
});

const app = new WebpackDevServer(compiler, {
	contentBase: '/public/',
	publicPath: '/frontend/',
	stats: { colors: true },
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(TodoRoutes);

app.listen(APP_PORT, () => { console.log(`App is now running on http://localhost:${APP_PORT}`); });
