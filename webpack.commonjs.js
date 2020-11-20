const webpack = require('webpack')
const path = require('path')

const webpackConfig = {
  mode: 'production',
  entry: {
    index: './index.js',
  },
  output: {
    path: path.join(process.cwd(), 'lib'),
    filename: 'index.commonjs2.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    '@sentry/browser': '@sentry/browser',
    '@sentry/integrations': '@sentry/integrations',
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

module.exports = webpackConfig
