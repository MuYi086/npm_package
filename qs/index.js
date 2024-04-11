/**
 * @Description: Implementing qs.Stringify and qs.Parse in native JavaScript
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 12:53
 */

/**
 * 原生js实现qs.Stringify函数
 * @param {object} obj
 * @param {string} sep1 =
 * @param {string} sep2 &
 * @returns string
 */
const stringify = (obj, sep1 = '=', sep2 = '&') => {
  return Object.keys(obj).map(key => key + sep1 + obj[key]).join(sep2)
}

/**
 * 原生js实现qs.Parse函数
 * @param {string} str
 * @param {string} pre ?
 * @param {string} sep1 &
 * @param {string} sep2 =
 * @returns object
 */
const parse = (str, pre = '?', sep1 = '&', sep2 = '=') => {
  const result = {}
  if (str.includes(pre)) {
    // 处理字符串?和=
    const s = str.split(pre)[1].split(sep1)
    // 循环遍历
    s.forEach((item) => {
      // 解构赋值
      const [k, v] = item.split(sep2)
      if (v.includes(',')) {
        result[k] = v.split(',')
      } else {
        result[k] = v
      }
    })
  }
  return result
}
module.exports = {
  stringify,
  parse
}