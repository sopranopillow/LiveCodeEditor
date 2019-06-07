const {
  webpackMerge,
  htmlOverlay,
  webpackServeConfig
} = require("just-scripts");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = webpackMerge(webpackServeConfig, htmlOverlay, {
  mode: "production",
  module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ],
    },
      node: {
      fs: 'empty',
      module: 'empty',
      net: 'empty'
    },
    externals: [
      {
        react: 'React'
      },
      {
        'react-dom': 'ReactDOM'
      }
    ],
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['typescript']
      })
    ]
});
