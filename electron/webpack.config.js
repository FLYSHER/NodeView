const path = require('path');
const fs = require('fs');

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
        }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
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
      },
    }),
    Object.assign({}, common_config, {
      target: 'electron-renderer',
      entry: {
        renderer_main: './renderer_main.js',
        renderer_assets: './renderer_assets.js',
        renderer_bottom: './renderer_bottom.js',
        renderer_hierarchy: './renderer_hierarchy.js',
        renderer_inspector: './renderer_inspector.js',
        renderer_timeline: './renderer_timeline.js',

        command: './client/src/Command/Command.js',
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/sourcemap'),
      },
    }),
];