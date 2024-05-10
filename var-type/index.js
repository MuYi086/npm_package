/**
 * @Description: js变量类型判断
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 12:30
 */
class VarType {
  constructor () {
    this.typeList = ['Null', 'Undefined', 'Object', 'Array', 'ArrayBuffer', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'Date', 'FormData', 'File', 'Blob', 'URLSearchParams', 'Set', 'WeakSet', 'Map', 'WeakMap']
    this.init()
  }

  /**
   * 判断变量类型
   * @param {string} value
   * @returns lowercase string
   */
  type (value) {
    const s = Object.prototype.toString.call(value)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
  }

  /**
   * 增加判断类型数据方法
   */
  init () {
    this.typeList.forEach((t) => {
      this['is' + t] = (o) => {
        return this.type(o) === t.toLowerCase()
      }
    })
  }

  /**
   * isBuffer
   * @param {any} val
   * @returns boolean
   */
  isBuffer (val) {
    return val !== null && !this.isUndefined(val) && val.constructor !== null && !this.isUndefined(val.constructor) && this.isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val)
  }

  /**
   * isStream
   * @param {any} val
   * @returns boolean
   */
  isStream (val) {
    return this.isObject(val) && this.isFunction(val.pipe)
  }

  /**
   * proxy对象有俩个特性: reactive, readonly
   * @param {*} val
   * @returns boolean
   */
  // isProxy (val) {
  //   function shouldBeCloneable (o) {
  //     const type = typeof o
  //     return (
  //       o?.constructor === ({}).constructor ||
  //       type === 'undefined' ||
  //       o === null ||
  //       type === 'boolean' ||
  //       type === 'number' ||
  //       type === 'string' ||
  //       o instanceof Date ||
  //       o instanceof RegExp ||
  //       o instanceof Blob ||
  //       o instanceof File ||
  //       o instanceof FileList ||
  //       o instanceof ArrayBuffer ||
  //       o instanceof ImageData ||
  //       o instanceof ImageBitmap ||
  //       o instanceof Array ||
  //       o instanceof Map ||
  //       o instanceof Set
  //     )
  //   }
  //   function isCloneable (val) {
  //     try {
  //       postMessage(val, '*')
  //     } catch (error) {
  //       // 错误码25表示不能被clone
  //       if (error?.code === 25) return false
  //     }
  //     return true
  //   }
  //   const _shouldBeCloneable = shouldBeCloneable(val)
  //   const _isCloneable = isCloneable(val)
  //   return _shouldBeCloneable && !_isCloneable
  // }
}
// 使用 varType["isNull"](null)等
// export const varType = new VarType()
module.exports = new VarType()
