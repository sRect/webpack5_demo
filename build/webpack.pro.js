const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css

module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    // 生成模式抽离css
    new MiniCssExtractPlugin({
      filename: `css/[name].[hash:8].css`
    })
  ],
  // https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
}