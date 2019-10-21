module.exports = {
  publicPath: '/',
  outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
  lintOnSave: process.env.NODE_ENV !== 'production', // 生产构建时禁用 eslint-loader
  devServer: {
    host: 'localhost',
    port: 8080, // 端口号
    https: false,
    open: true, //配置自动启动浏览器
    hotOnly: true, // 热更新
    overlay: {
      warnings: true,
      errors: true
    }
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      less: {
        // 向所有 Sass 样式传入共享的全局变量
        // 这里的选项会传递给 postcss-loader
        // 这样向所有 Sass 样式传入共享的全局变量
        // data: `@import "~@/variables.scss";`
      }
    }
  }
}