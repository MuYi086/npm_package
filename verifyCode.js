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
      for (let i = 0; i < len; i++) {
        let code = source[this.newInt(source.length)]
        codeArr.push(code)
        // 如果是字母统一处理成大写
        code = typeof code === 'number' ? code : code.toUpperCase()
        dealArr.push(code)
      }
      console.log(codeArr)
      // canvas画图
      this.drawImg(codeArr)
      return dealArr
    }
    // 某范围内随机取整:传俩参会限制最大最小值(用来限制字体大小)
    newInt (len, max) {
      if (arguments.length === 1) {
        return Math.floor(Math.random() * len)
      }
      if (arguments.length === 2) {
        return Math.floor(len + Math.random() * (max - len))
      }
    }
    // 用canvas画图
    drawImg (codeArr) {
      let canvas = document.getElementById('canvas')
      canvas.width = codeArr.length * 20
      canvas.height = 40
      let content = canvas.getContext('2d')
      content.fillStyle = '#eee'
      // 清空画布
      content.fillRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < codeArr.length; i++) {
        // 字体颜色
        content.fillStyle = `rgb(${this.newInt(256)}, ${this.newInt(256)}, ${this.newInt(256)})`
        // 设置字体
        content.font = `${this.newInt(15, 25)}px Arial`
        content.fillText(codeArr[i], i * 20 + 10, this.newInt(20, canvas.height - 10))
        content.rotate(this.newInt(-30, 30) * Math.PI / 180)
      }
    }
  }
  let obj = new Obj()
  obj.random(3, 5)