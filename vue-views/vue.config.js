module.exports = {
  publicPath: './',
  transpileDependencies: [
    /\bvue-echarts\b/,
    /\bresize-detector\b/,
    /\bbetter-scroll\b/,
    /\bjsplumb\b/
  ],
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {
    externals: {
      "BMap": "BMap",
    },
  },
  chainWebpack: config => {
    config.optimization.minimize(true);  // 优化app.js
    // 分割代码 分割代码是, 将某一些相关的文件放入到相应的文件中. 我们先设置一下.
    config.optimization.splitChunks({
      chunks: 'all'
    })

    // 改压缩图片限制
    const imagesRule = config.module.rule("images")
    imagesRule.use('url-loader').loader('url-loader').tap(options => Object.assign(options, { limit: 10000 }))
  },
  productionSourceMap: false, // 构建时，取消map 缩小压缩体积
  lintOnSave: false,
  // outputDir: 'manage'
  // outputDir: 'protal'
}
