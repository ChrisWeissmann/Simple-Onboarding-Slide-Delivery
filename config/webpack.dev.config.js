const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.common.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8081
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "head",
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
});
