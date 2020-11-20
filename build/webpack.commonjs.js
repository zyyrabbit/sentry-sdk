const path = require('path');

module.exports = {
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
  }
}
