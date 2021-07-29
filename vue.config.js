/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-07-29 14:21:59
 * @LastEditors: 王敏
 * @LastEditTime: 2021-07-29 14:22:56
 */
module.exports = {
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false
  },
  devServer: {
    port: 7111, // 端口号
    https: false, // https:{type:Boolean}
    hot: true, // 配置热更新
    open: true // 配置自动启动浏览器
  }
}