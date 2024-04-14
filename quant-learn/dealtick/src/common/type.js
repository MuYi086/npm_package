// 封装的判断js变量类型的class
class Type {
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
  isProxy (val) {
    /**
     * 判断是否其他类型
     * @param {*} o 
     * @returns boolean
     */
    function shouldBeCloneable (o) {
      const type = typeof o
      return (
        o?.constructor === ({}).constructor ||
        type === 'undefined' ||
        o === null ||
        type === 'boolean' ||
        type === 'number' ||
        type === 'string' ||
        o instanceof Date ||
        o instanceof RegExp ||
        o instanceof Blob ||
        o instanceof File ||
        o instanceof FileList ||
        o instanceof ArrayBuffer ||
        o instanceof ImageData ||
        o instanceof ImageBitmap ||
        o instanceof Array ||
        o instanceof Map ||
        o instanceof Set
      )
    }
    /**
     * 判断是否能被clone
     * @param {*} val 
     * @returns boolean
     */
    function isCloneable (val) {
      try {
        postMessage(val, '*')
      } catch (error) {
        // 错误码25表示不能被clone
        if (error?.code === 25) return false
      }
      return true
    }
    const _shouldBeCloneable = shouldBeCloneable(val)
    const _isCloneable = isCloneable(val)
    return _shouldBeCloneable && !_isCloneable
  }
}

const type = new Type()
// 使用 type["isNull"](null)等
module.exports = type
