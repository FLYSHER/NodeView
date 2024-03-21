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
  devtool: 'source-map',
  // plugins: [
  //   // Put the Sentry Webpack plugin after all other plugins
  //   sentryWebpackPlugin({
  //     authToken: process.env.SENTRY_AUTH_TOKEN,
  //     org: "taegyunhan",
  //     project: "electron",
  //     // sourcemaps: {
  //     //   filesToDeleteAfterUpload: '**/*.js.map' // 보안을 위해서 sentry에 올린 뒤에 소스맵을 삭제한다.
  //     // },
  //     release: {
  //       name: "NodeView-flysher-@1.0.0",
  //       dist: "test dist",
  //     },
  //     include: './dist',
  //     ignore: ['node_modules'],
  //     debug: true,
  //     //filename: '[name]-[contenthash].js.map',
  //   }),
  // ],
};

module.exports = [
    Object.assign({}, common_config, {
      target: 'electron-main',
      entry: {
        index: './main_electron.js',
      },
      output: {
        filename: '[name]-main-bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    }),
    Object.assign({}, common_config, {
      target: 'electron-renderer',
      entry: {
        index: './renderer_main.js',
      },
      output: {
        filename: '[name]-renderer-bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    }),
];