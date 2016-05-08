var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
        // 'webpack-dev-server/client?http://localhost:8080',
        // 'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client',
    './src/frontend/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['src', 'node_modules']
  },
  output: {
    path: path.join(__dirname, 'dist/frontend'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  debug: true,
  devtool: 'source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
