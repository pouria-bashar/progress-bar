const path = require('path');
const webpack = require('webpack');
const { resolve } = require('path');
const isProduction = process.env.NODE_ENV === 'production';

const entry = isProduction ? ['./src/index'] : [
  'webpack-hot-middleware/client',
  './src/index'
]

const devtool = isProduction ? '' : 'cheap-module-eval-source-map';
module.exports = {
  devtool,
  entry,
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: isProduction ? [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  })
  ] :
  [
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
