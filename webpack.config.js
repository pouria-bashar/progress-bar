const path = require('path');
const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      use: ['react-hot-loader', 'babel-loader'],
      include: path.join(__dirname, 'src')
    },
    {
       test: /\.css$/,
       loaders: [
         'style-loader',
         'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
       ]
     }]
  }
};
