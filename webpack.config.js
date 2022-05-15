const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: { "client": './src/client.ts', "server": './src/server.ts' },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: {
    'http': 'http',
    'fs': 'fs',

  },
  externalsType: "node-commonjs",
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};