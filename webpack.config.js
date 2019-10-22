const path = require("path");

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode:'development',
  entry: "./app.js",
  output: {
    //公共路径设置
    //publicPath: "https://cdn.baidu.com",
    path: path.resolve(__dirname, "./build"),
    filename: "index.js" // 打包后文件的名字
  },
}
