/*
 * @Author: Heyafeng
 * @Date: 2022-07-10 07:46:22
 * @LastEditors: Heyafeng
 * @LastEditTime: 2022-07-10 07:46:31
 * @Description: 配置 Babel 使其能够兼容当前的 Node 版本
 */
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
}
