const path = require('path');
const rootDir = process.cwd();

module.exports = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  // https://webpack.docschina.org/configuration/dev-server/#root
  devServer: {
    contentBase: path.resolve(rootDir, "dist"),
    port: 9000,
    host: "localhost",
    compress: true,
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    // stats: 'errors-only', // 终端仅打印 error
    // proxy: {}
  },
};