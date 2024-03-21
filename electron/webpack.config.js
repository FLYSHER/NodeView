const path = require('path');

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
              path.resolve(__dirname, 'client')
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
        index: './main_electron.js',
      },
      output: {
        filename: 'main_electron.js',
        path: path.resolve(__dirname, 'dist'),
      },
    }),
    Object.assign({}, common_config, {
      target: 'electron-renderer',
      entry: {
        index: './renderer_main.js',
      },
      output: {
        filename: 'renderer_main.js',
        path: path.resolve(__dirname, 'dist'),
      },
    }),
];