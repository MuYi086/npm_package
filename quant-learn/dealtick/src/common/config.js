
// let isDev = process.env.NODE_ENV === 'development'
const token = '' // 浏览器自用token
const host = 'http://test.api.kdkdcn.com/'
const resourceHost = 'http://test.m.kdkdcn.com/'
const amapKey = '' // 高德地图的key
const tushareToken = ''
const appToken = ''
const appUserId = ''
const defaultCenter = [116.406315, 39.908775]
const currentXhrNum = 0 // 当前正在请求中的请求
const isInApp = false
const isIos = false
const isDev = true
const isTest = true
let staticHost = 'http://192.168.5.100:8666/'
if (isDev) {
  staticHost = 'http://192.168.5.100:8280/'
}
if (isTest) {
  staticHost = 'http://test.api.kdkdcn.com/'
}
const config = {
  token: token,
  host: host,
  resourceHost: resourceHost,
  amapKey: amapKey,
  staticHost: staticHost,
  defaultCenter: defaultCenter,
  currentXhrNum: currentXhrNum,
  isInApp: isInApp,
  isIos: isIos,
  appToken: appToken,
  appUserId: appUserId,
  tushareToken: tushareToken
}
// export { config }
module.exports = config
