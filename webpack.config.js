const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

module.exports = (env) => ({
  mode: env.development ? "development" : "production",
  devtool: env.development && "cheap-module-source-map",
  target: "web", // 默认为 'web'，可省略
  stats: "errors-warnings", // https://webpack.docschina.org/configuration/stats/
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash:8].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".less", ".css"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // env.development && new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack5-demo",
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }), // 优化进度显示
  ].filter(Boolean),
  // https://webpack.docschina.org/configuration/dev-server/#root
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 9000,
    host: "localhost",
    compress: true,
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
});