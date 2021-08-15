const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  target: 'electron-renderer',
  mode: isDevelopment ? 'development' : 'production',

  module: {
    rules: [
      ...require('./webpack.rules'),
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(\.webpack)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve('./renderer/tsconfig.json'),
              transpileOnly: true,
              onlyCompileBundledFiles: true
            }
          },
        ].filter(Boolean),
      }
    ],
  },
  plugins: [
    ...require('./webpack.plugins'),
  ].filter(Boolean),
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
      'node_modules',
    ],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css']
  },
};
