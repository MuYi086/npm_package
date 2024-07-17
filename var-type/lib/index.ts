/**
 * @Description: js变量类型判断
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 12:30
 */
class VarType {
  private typeList: string[]
  private static _instance: VarType | null = null
  constructor() {  
    this.typeList = ['Null', 'Undefined', 'Object', 'Array', 'ArrayBuffer', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'Date', 'FormData', 'File', 'Blob', 'URLSearchParams', 'Set', 'WeakSet', 'Map', 'WeakMap']
    this.init()
  }
  static get instance(): VarType {  
    if (!VarType._instance) {
      VarType._instance = new VarType()
    }
    return VarType._instance
  }
  /**
   * 判断变量类型
   * @param {string} value
   * @returns lowercase string
   */
  private type (value: any): string {
    const s = Object.prototype.toString.call(value)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
  }

  /**
   * 增加判断类型数据方法
   */
  private init(): void {
    const self = this
    this.typeList.forEach((t: string) => {
      Object.defineProperty(VarType.prototype, `is${t}`, {
        value: function (o: any) {
          return self.type(o) === t.toLowerCase()
        },
        writable: true,
        configurable: true
      })
    })
  }
  /**
   * isBuffer
   * @param {any} val
   * @returns boolean
   */
  static isBuffer(val: any): boolean {  
    return val !== null && (VarType as any).isUndefined(val) && val.constructor !== null && (VarType as any).isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val)
  }

  /**
   * isStream
   * @param {any} val
   * @returns boolean
   */
  static isStream(val: any): boolean {  
    return (VarType as any).isObject(val) && (VarType as any).isFunction(val.pipe)
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
export const varType = VarType.instance
