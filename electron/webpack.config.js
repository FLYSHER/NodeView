const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
// const fs = require('fs');

// webpack 적용 시에도 main, renderer 따로 적용이 필요함.
console.log("[taegyun][webpack] __dirname : ", __dirname);

const common_config = {
  node: {
    __dirname: true,
  },
  mode: 'production',
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          include: [
              path.resolve(__dirname, ''),
              path.resolve(__dirname, 'client'),
              path.resolve(__dirname, 'client/src/*'),
          ]
          // exclude: /node_modules/,
        }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [path.resolve(__dirname, ''), 'node_modules'],
  },
  devtool: 'source-map',
  // plugins: [
  //   sentryWebpackPlugin({
  //     authToken: process.env.SENTRY_AUTH_TOKEN,
  //     org: "taegyunhan",
  //     project: "electron",
  //   }),
  // ],
};

module.exports = [
    Object.assign({}, common_config, {
      target: 'electron-main',
      entry: {
        main_electron: './main_electron.js',
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/sourcemap'),
        // sourceMapFilename: 'main_electron.js.map',
      },
    }),
    Object.assign({}, common_config, {
      target: 'electron-renderer',
      entry: {
        // renderer
        renderer_main: './renderer_main.js',
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/sourcemap'),
        // sourceMapFilename: '[name].js.map',
      },
    }),
];