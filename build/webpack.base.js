const path = require("path");
const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const chalk = require("chalk");
const isDev = process.env.NODE_ENV === "development" ? true : false;

console.log("isDev===>", isDev);

const rootDir = process.cwd();

module.exports = {
  target: "web", // 默认为 'web'，可省略
  stats: "errors-warnings", // https://webpack.docschina.org/configuration/stats/
  entry: path.resolve(rootDir, "src/index.js"),
  output: {
    path: path.resolve(rootDir, "dist"),
    filename: "[name].[fullhash:8].js",
    publicPath: "/",
    // webpack5.20.0+已经不需要使用clean-webpack-plugin了，output.clean可以清除输出目录
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css"],
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.jsx?$/, // /\.(jsx|js)$/
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // 开发模式下用style-loader
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // 解决 css 命名混乱和冲突
            options: isDev
              ? {
                  importLoaders: 2,
                }
              : {
                  // 意思是，如果在css中引入(@import)了其他文件css,而这个css文件中引入了less,将用less-loader处理
                  importLoaders: 2,
                  modules: {
                    compileType: "module",
                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  },
                },
          },
          "postcss-loader",
          "less-loader",
        ],
        exclude: /node_modules/,
      },
      // https://webpack.docschina.org/guides/asset-modules/
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    // env.development && new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack5-demo",
      filename: "index.html",
      template: path.resolve(rootDir, "public/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(rootDir, "public/static"), //要打包的静态资源目录地址
          to: path.resolve(rootDir, "dist/static"),
        },
      ],
    }),
    ,
    new ProgressBarPlugin({
      format:
        "  build [:bar] " +
        chalk.green.bold(":percent") +
        " (:elapsed seconds)",
      clear: false,
    }), // 优化进度显示
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build!!",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true,
    }),
  ].filter(Boolean),
};
