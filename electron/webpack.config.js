const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
          // exclude: /node_modules/,
        }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [path.resolve(__dirname, './'), 'node_modules'],
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
        sourceMapFilename: 'main_electron.js.map',
        // devtoolModuleFilenameTemplate: info => {
        //   let path ='';
        //   if (info.resourcePath.startsWith('./')) {
        //     path = 'app:///' + info.resourcePath.slice(2);
        //   }
        //   return path;
        // }
      },
    }),
    Object.assign({}, common_config, {
      target: 'electron-renderer',
      entry: {
        // renderer
        renderer_main: './renderer_main.js',
        // main: './client/main.js',
        // renderer_assets: './renderer_assets.js',
        // renderer_bottom: './renderer_bottom.js',
        // renderer_hierarchy: './renderer_hierarchy.js',
        // renderer_inspector: './renderer_inspector.js',
        // renderer_timeline: './renderer_timeline.js',
        //
        // // command
        // Command: './client/src/Command/Command.js',
        // CommandManager: './client/src/Command/CommandManager.js',
        // NodePropertyCommand: './client/src/Command/NodePropertyCommand.js',
        // TransformCommand: './client/src/Command/TransformCommand.js',
        // UIImageViewCommand: './client/src/Command/UIImageViewCommand.js',
        // UILabelBMFontCommand: './client/src/Command/UILabelBMFontCommand.js',
        // UITextCommand: './client/src/Command/UITextCommand.js',
        //
        // // cocos comp
        // ArmatureComponent: './client/src/Components/Cocos/ArmatureComponent.js',
        // BoneComponent: './client/src/Components/Cocos/BoneComponent.js',
        // NodePropertyComponent: './client/src/Components/Cocos/NodePropertyComponent.js',
        // TransformComponent: './client/src/Components/Cocos/TransformComponent.js',
        // UIActionComponent: './client/src/Components/Cocos/UIActionComponent.js',
        // UIButtonComponent: './client/src/Components/Cocos/UIButtonComponent.js',
        // UIImageViewComponent: './client/src/Components/Cocos/UIImageViewComponent.js',
        // UILabelBMFontComponent: './client/src/Components/Cocos/UILabelBMFontComponent.js',
        // UIRootComponent: './client/src/Components/Cocos/UIRootComponent.js',
        // UIScrollViewComponent: './client/src/Components/Cocos/UIScrollViewComponent.js',
        // UITextComponent: './client/src/Components/Cocos/UITextComponent.js',
        //
        // // custom comp
        // ARGroupComponent: './client/src/Components/Custom/ARGroupComponent.js',
        // CodeComponent: './client/src/Components/Custom/CodeComponent.js',
        // EmptyComponent: './client/src/Components/Custom/EmptyComponent.js',
        // PopupComponent: './client/src/Components/Custom/PopupComponent.js',
        //
        // GenieComponent: './client/src/Components/GenieComponent.js',
        // InputComponent: './client/src/Components/InputComponent.js',
        //
        // // define
        // eventDefines: './client/src/Defines/eventDefines.js',
        // GenieDefines: './client/src/Defines/GenieDefines.js',
        //
        // // genie
        // DebugView: './client/src/Genie/DebugView/DebugView.js',
        // DebugViewNode: './client/src/Genie/DebugView/DebugViewNode.js',
        //
        // GizmoController: './client/src/Genie/Gizmo/GizmoController.js',
        // GizmoLayer: './client/src/Genie/Gizmo/GizmoLayer.js',
        // GizmoNode: './client/src/Genie/Gizmo/GizmoNode.js',
        //
        // PopupBaseNode: './client/src/Genie/Popup/PopupBaseNode.js',
        //
        // HierarchyProtectNode: './client/src/Genie/HierarchyProtectNode.js',
        // ToolController: './client/src/Genie/ToolController.js',
        //
        // GenieResourceLoader: './client/src/GenieResourceLoader/GenieResourceLoader.js',
        //
        // // tool layer
        // MainScene: './client/src/ToolLayer/MainScene.js',
        // MainViewLayer: './client/src/ToolLayer/MainViewLayer.js',
        // PreviewNode: './client/src/ToolLayer/PreviewNode.js',
        //
        // // utils
        // GenieARUtils: './client/src/Utils/GenieARUtils.js',
        // GenieUtils: './client/src/Utils/GenieUtils.js',
        // HtmlHelper: './client/src/Utils/HtmlHelper.js',
        // ScreenUtils: './client/src/Utils/ScreenUtils.js',
        //
        // // app
        // app: './client/src/app.js',
        // loader: './client/src/loader.js',
        // resource: './client/src/resource.js',
        // eventDispatcher: './client/src/eventDispatcher.js',
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/sourcemap'),
        sourceMapFilename: '[name].js.map',
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, './client/index.html'),

          minify: {
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
          },
          isBrowser: false,
          isDevelopment: false,
        })
      ],
    }),
];