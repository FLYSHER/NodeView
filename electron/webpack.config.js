const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
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
  //todo 'hidden-source-map', 소스맵으로 올릴 경우 sentry에서 모든 코드를 공개하기 때문에 추후 조치 필요
  devtool: 'source-map',
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "taegyunhan",
      project: "electron",
      sourcemaps: {
        filesToDeleteAfterUpload: '**/*.js.map' // 보안을 위해서 sentry에 올린 뒤에 소스맵을 삭제한다.
      },
    }),
  ],
};

module.exports = [
    Object.assign({}, common_config, {
      target: 'electron-main',
      entry: {
        index: './main_electron.js',
      },
      output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    }),
    Object.assign({}, common_config, {
      target: 'electron-renderer',
      entry: {
        index: './renderer_main.js',
      },
      output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    }),
];