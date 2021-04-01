## webpack5.x + babel7实践

### package.json
```json
{
  "scripts": {
    "build:dev": "webpack --env development --progress",
    "build:pro": "webpack --env production --progress",
    "serve": "webpack serve --env development --progress"
  },
  "devDependencies": {
    "webpack": "^5.28.0",
    "webpack-cli": "^4.6.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

### webpack.config.js
```javascript
module.exports = env => ({
  mode: env.development ? "development" : "production",
  devtool: env.development && "cheap-module-source-map",
  target: "web", // 默认为 'web'，可省略
  stats: "errors-warnings", // 只在发生错误或有新的编译时输出 https://webpack.docschina.org/configuration/stats/
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash:8].js",
    publicPath: "/",
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
    new HtmlWebpackPlugin({
      title: "webpack5-demo",
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
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
})
```

### .babelrc
```json
// 不容错过的 Babel7 知识 
// https://juejin.cn/post/6844904008679686152?utm_source=gold_browser_extension%3Futm_source%3Dgold_browser_extension#heading-0
// Show me the code，babel 7 最佳实践！ 
// https://juejin.cn/post/6844903729188044814#heading-0
{
  "presets": [
    // 首先安装 npm i @babel/core @babel/preset-env babel-loader -D
    // 再安装 npm i core-js @babel/polyfill -S
    ["@babel/preset-env", {
      "modules": false, // 模块使用 es modules ，不使用 commonJS 规范
      "useBuiltIns": "usage", // 按需引入 polyfill
      "corejs": 3
    }],
    // 安装 npm i @babel/preset-react -D
    "@babel/preset-react"
  ],
  "plugins": [
    // 首先安装 npm i @babel/plugin-transform-runtime -D
    // 然后再安装 npm i @babel/runtime -S
    ["@babel/plugin-transform-runtime", {
      "corejs": false, // 如果要指定版本，例如填 3，就要安装 npm i @babel/runtime-corejs3 -S，配置了指定版本后，打包后，体积会变大
      "helpers": true, // 默认，可以不写
      "regenerator": false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
      "useESModules": true // 使用 es modules helpers, 减少 commonJS 语法代码
    }]
  ]
}
```