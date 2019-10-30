const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImagesConfigWebpackPlugin = require("image-config-webpack-plugin");
const ScssConfigWebpackPlugin = require("scss-config-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, '../dist'),

  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
    new HtmlWebpackPlugin({
        template: './src/privacy.html',
        filename: 'privacy.html',
        inject: 'head'
    }),
    new CleanWebpackPlugin(),
    new ImagesConfigWebpackPlugin(),
    new ScssConfigWebpackPlugin(),
    new CopyPlugin([
        { from: 'src/assets/', to: 'assets/' },
        { from: 'post_receiver.php', to: 'post_receiver.php'},
    ])
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
