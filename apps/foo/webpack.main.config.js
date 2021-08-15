const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './main/src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: [
      ...require('./webpack.rules'),
      {
        test: /\.ts?$/,
        exclude: /(\.webpack)/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve('./main/tsconfig.json'),
            transpileOnly: true,
            onlyCompileBundledFiles: true
          }
        },
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
      'node_modules',
    ],
    extensions: ['.js', '.ts', '.json']
  },
};
