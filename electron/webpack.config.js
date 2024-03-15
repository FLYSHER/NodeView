const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = {
  // ... other options
  entry : 'main_electron.js',

  devtool: "hidden-source-map", // Source map generation must be turned on
  sourcemaps: {
    filesToDeleteAfterUpload: '**/*.js.map'
  },
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "taegyunhan",
      project: "electron",
    }),
  ],
}