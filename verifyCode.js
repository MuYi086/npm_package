class Obj {
    constructor () {
      this.numArr = []
      this.letterArrSm = []
      this.letterArrBg = []
      this.init()
    }
    // 初始化
    init () {
      for (let i = 0; i < 10; i++) { this.numArr.push(i) }
      for (let i = 65; i < 91; i++) { this.letterArrBg.push(String.fromCharCode(i)) }
      for (let i = 97; i < 123; i++) { this.letterArrSm.push(String.fromCharCode(i)) }
    }
    // 分发:类别，长度
    random (type, len) {
      let source = []
      // 纯数字
      if (type === 1) {
        source = [...this.numArr]
      }
      // 纯字母
      if (type === 2) {
        source = [...this.letterArrSm, ...this.letterArrBg]
      }
      // 数字+字母
      if (type === 3) {
        source = [...this.numArr, ...this.letterArrSm, ...this.letterArrBg]
      }
      let codeArr = this.doRandom(source, len)
      console.log(codeArr)
    }
    // 随机出规定长度的验证码
    doRandom (source, len) {
      if (len === 0) return false
      let codeArr = [] // 分大小写
      let dealArr = [] // 不分大小写
      let colorArr = []
      for (let i = 0; i < len; i++) {
        // 如果是字母统一处理成大写
        let code = source[this.newInt(source.length)]
        codeArr.push(code)
        code = typeof code === 'number' ? code : code.toUpperCase()
        dealArr.push(code)
        colorArr.push([this.newInt(256), this.newInt(256), this.newInt(256)])
      }
      console.log(codeArr)
      console.log(colorArr)
      return dealArr
    }
    // 某范围内随机取整
    newInt (len) {
      return Math.floor(Math.random() * len)
    }
  }
  let obj = new Obj()
  obj.random(3, 5)