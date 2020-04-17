/*
 * @Date: 2020-04-17 16:30:52
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-17 16:40:39
 * @LastEditors: junfeng.liu
 * @Description: des
 */
exports.versionToInt =  function versionToInt (ver) {
    if (!ver) return 0
    let arr = ver.split('.').map(item => {
        return item.padStart(3, '0')
    })
    return arr.join('')
}
