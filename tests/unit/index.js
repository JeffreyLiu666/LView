/*
 * @Date: 2020-04-01 10:12:57
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-01 15:51:48
 * @LastEditors: junfeng.liu
 * @Description: des
 */
require('babel-regenerator-runtime')
require('packages/../lib/style/index.css')
require('view-design/dist/styles/iview.css')

// 获取specs文件夹下的所有.spec.js结尾的文件，包括子文件夹
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
