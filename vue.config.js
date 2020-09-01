const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',

  // baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
  outputDir: 'dist',

  assetsDir: 'assets',
  productionSourceMap: false,
  lintOnSave: true,

  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '58.133.87.190',
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/activity': {
        /* 目标代理服务器地址 */
        target: 'https://jk.meetyuu.com',
        // target: 'http://58.133.87.118:9001',
        ws: true,
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          '^activity': '/activity'
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
}
