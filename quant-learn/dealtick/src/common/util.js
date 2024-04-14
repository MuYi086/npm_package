// 通用的方法
const config = require('./config')
const type = require('./type')

const util = {
  // 浅拷贝
  shallowCopy (obj) {
    if (type.isNull(obj)) {
      return null
    } else {
      return Object.create(
        Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
      )
    }
  },
  // 深拷贝
  deepCopy (obj) {
    const target = {}
    if (type.isNull(obj) || typeof obj !== 'object') {
      return obj
    }
    // 不要使用Object.keys遍历:不遍历可枚举的原型链属性
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object') {
          target[key] = this.deepCopy(obj[key])
        } else {
          target[key] = obj[key]
        }
      }
    }
    return target
  },
  // 数组去重:不带id普通数组去重;带id，数组对象去重
  arrDuplicateRemove (arr, id) {
    const temp = []
    const idArr = []
    if (!id) {
      arr.forEach(item => {
        if (!temp.includes(item)) {
          temp.push(item)
        }
      })
    } else {
      arr.forEach(item => {
        if (!idArr.includes(item[id])) {
          idArr.push(item[id])
          temp.push(item)
        }
      })
    }
    return temp
  },
  // 数组删除某项值
  arrRemoveByValue (arr, value, attr) {
    if (!type.isArray(arr)) {
      throw new Error('必须是数组')
    } else {
      // 不带attr，删除值;
      if (!attr) {
        arr.includes(value) && arr.splice(arr.indexOf(value), 1)
      } else { // 带attr，删除属性
        arr.filter(item => {
          if (item[attr] === value) return item
        })
      }
    }
    return arr
  },
  // 美式价格，隔三加逗号
  numToThousands (num) {
    num = (num || 0).toString()
    let decimal = '00'
    let result = ''
    if (num.includes('.')) {
      decimal = num.split('.')[1]
      num = num.split('.')[0]
    }
    if (num.length > 3) {
      let k = 0
      for (let i = num.length; i > 0; i--) {
        result += num.charAt(i - 1)
        k += 1
        if (k === 3 && i !== 1) {
          result += ','
          k = 0
        }
      }
      result = result.split('').reverse().join('')
    } else {
      result = num
    }
    return `${result}.${decimal}`
  },
  // 小于10加0处理
  addZero (e) {
    return Number(e) < 10 ? `0${e}` : e
  },
  // 时间格式化:同时将时间统一处理成斜杠
  // yyyy/MM/dd hh:mm:ss
  dateFormat (dateIn, fmt) {
    if (!fmt) return false
    const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn)
    const o = {
      'y+': newDate.getFullYear(), // 年份
      'M+': this.addZero(newDate.getMonth() + 1), // 月份
      'd+': this.addZero(newDate.getDate()), // 某一天
      'h+': this.addZero(newDate.getHours()), // 小时
      'm+': this.addZero(newDate.getMinutes()), // 分钟
      's+': this.addZero(newDate.getSeconds()) // 秒
    }
    for (const i in o) {
      if (new RegExp('(' + i + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, o[i])
      }
    }
    return fmt
  },
  // new 一个时间戳:无参返回当前时间戳,有参返回传入时间的时间戳
  newTimeStamp (dateIn) {
    if (!dateIn) {
      return new Date().getTime()
    } else {
      const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn)
      return newDate.getTime()
    }
  },
  // 生成独一无二的字符串:字符串转32进制
  createUniqueString () {
    const timestamp = this.newTimeStamp()
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(timestamp + randomNum)).toString(32)
  },
  // 生成UUID
  generateUUID () {
    let d = this.newTimeStamp()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  },
  // debounce:去抖就是连续多次delay内操作取最后一次操作真正执行
  // https://segmentfault.com/a/1190000014292298
  debounce (cb, delay, that) {
    if (!that.timeId) {
      that.timeId = setTimeout(() => {
        cb()
        that.timeId = null
      }, delay)
    }
  },
  // 匹配url的某个query值:无window对象则不可用
  getQueryStringByName (name) {
    const reg = new RegExp('(^|&)' + name + '=(\\w+|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    let context = ''
    if (r !== null) {
      context = r[2]
    }
    return context
  },
  // 参数去空
  paramsRemoveNull (obj) {
    if (type.isObject(obj)) {
      for (const item in obj) {
        if (type.isUndefined(obj[item]) || type.isNull(obj[item])) {
          delete obj[item]
        }
      }
    } else {
      throw new Error('args should be a object')
    }
    return obj
  },
  // api请求时，给params动态赋值
  objectAddAttr (obj, value, attr) {
    if (type.isObject(obj) && type.isString(attr) && value !== null) {
      const test = {}
      test[attr] = value
      Object.assign(obj, test)
    } else {
      throw new Error('参数有误')
    }
  },
  // 获取token
  getToken () {
    const token = config.appToken || localStorage.getItem('access_token')
    // const token = localStorage.getItem('access_token')
    return token
  },
  // 传入一个买卖obj，计算百分比
  calAskBidPercent (obj) {
    let sum = 0
    for (const i in obj) {
      sum += obj[i]
    }
    for (const j in obj) {
      obj[j] = (obj[j] / sum).toFixed(4)
    }
    return obj
  },
  // 查找俩个数组对象中唯一的项
  // {"date":"2019-07-16","action":"卖"}
  findOnlyValue (arr1, arr2, type) {
    const newArr = []
    const commonIdx = []
    const arr1Attr = []
    // 找出数组1目标属性值
    arr1.forEach(item => {
      arr1Attr.push(item[type])
    })
    // 找出2个数组中的公共部分
    arr2.forEach(item => {
      if (arr1Attr.includes(item[type])) {
        commonIdx.push(item[type])
      }
    })
    // 遍历数组1和数组2,拿到新数组
    arr1.forEach(item => {
      if (!commonIdx.includes(item[type])) {
        newArr.push(item)
      }
    })
    arr2.forEach(item => {
      if (!commonIdx.includes(item[type])) {
        newArr.push(item)
      }
    })
    return newArr
  },
  findSameValue (arr1, arr2, type) {
    const commonIdx = []
    const arr1Attr = []
    // 找出数组1目标属性值
    arr1.forEach(item => {
      arr1Attr.push(item[type])
    })
    // 找出2个数组中的公共部分
    arr2.forEach(item => {
      if (arr1Attr.includes(item[type])) {
        commonIdx.push(item[type])
      }
    })
    return commonIdx
  },
  // 比较买卖盘比例,简单标记‘卖', '买'
  compareAskBid (askObj, bidObj) {
    const arr = []
    for (let d = 0; d < new Array(4).length; d++) {
      if (Number(askObj['volume' + (d + 1)]) > Number(bidObj['volume' + (d + 1)])) {
        arr.push('卖')
      } else {
        arr.push('买')
      }
    }
    return arr
  },
  // 传入timeCut对象,生成符合固定时间段对象
  joinFixedTime (currentDate, hourCutArr) {
    let idx = 1
    const obj = {}
    hourCutArr.forEach(item => {
      obj['time' + idx + 'Start'] = this.newTimeStamp(currentDate + item.hourStart)
      obj['time' + idx + 'End'] = this.newTimeStamp(currentDate + item.hourEnd)
      idx++
    })
    return obj
  },
}

module.exports = util
