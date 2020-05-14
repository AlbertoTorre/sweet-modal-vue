var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')

// Determine which env to use
// by having it overriden at runtime using `cross-env NODE_ENV=...`
// Possible envs: dev, production
var node_env

if (process.env.NODE_ENV) {
	node_env = process.env.NODE_ENV.toLowerCase()
} else {
	node_env = 'production'
}

console.log('ENV', node_env)

module.exports = {
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js',
		},

		extensions: ['.js', '.vue']
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', {
							targets: {
								browsers: ['last 2 versions', '>= 3%', 'not ie <= 10']
							},
							modules: false,
							forceAllTransforms: (node_env === 'production')
						}]]
					}
				}
			},
			{
				test: /\.svg$/,
				use: 'svg-inline-loader?classPrefix'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						query: {
							name: '[name].[ext]?[hash]'
						}
					}
				]
			}
		],
	},
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: 'all'
		},
		minimizer: [
		  // we specify a custom UglifyJsPlugin here to get source maps in production
		  new TerserPlugin({
			parallel: true,
			cache: true,
			sourceMap: true,
			terserOptions: {
			  parse: {
				// Let terser parse ecma 8 code but always output
				// ES5 compliant code for older browsers
				ecma: 8
			  },
			  compress: {
				ecma: 5,
				warnings: false,
				comparisons: false
			  },
			  mangle: {
				safari10: true
			  },
			  output: {
				ecma: 5,
				comments: false,
				ascii_only: true
			  }
			}
		  }),
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"' + node_env + '"'
			}
		}),
		new VueLoaderPlugin()
	],

	devtool: '#cheap-source-map',

	devServer: {
		historyApiFallback: true,
		noInfo: true,
		port: 8081
	}
}

if (node_env == 'production') {
	module.exports.devtool = '#source-map'
}
