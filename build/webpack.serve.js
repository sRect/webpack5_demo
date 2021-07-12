const path = require('path');

module.exports = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  // https://webpack.docschina.org/configuration/dev-server/#root
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
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