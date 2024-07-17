/**
 * @Description: random some verify Codes
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 08:50
 */
class VerifyCode {
  private numArr: number[]
  private letterArrSm: string[]
  private letterArrBg: string[]
  private options: {
    len: number;
    width: number;
    height: number;
    slash: boolean;
    point: boolean;
    slachNum: number;
    pointNum: number;
  }
  constructor () {
    this.numArr = []
    this.letterArrSm = []
    this.letterArrBg = []
    this.options = {
      len: 4,
      width: 80,
      height: 40,
      slash: true,
      point: true,
      slachNum: 3,
      pointNum: 20
    }
    this.init()
  }
  /**
   * 初始化
   */
  private init(): void {  
    this.numArr = Array.from({ length: 10 }, (_, i) => i)
    this.letterArrBg = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
    this.letterArrSm = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))
  } 
  // 分发:类别，长度, 是否需要斜线, 是否需要点
  public random(type: number, len: number, slash = true, point = true): ( string | number )[] {
    // 解析传入的参数
    this.options.len = len
    this.options.width = len * 20 + 10
    this.options.slash = slash
    this.options.point = point
    let source: (number | string)[] = []
    switch (type) {
      // 纯数字
      case 1:
        source = [...this.numArr]
        break
      // 纯字母
      case 2:
        source = [...this.letterArrSm, ...this.letterArrBg]
        break
      // 数字+字母
      case 3:
        source = [...this.numArr, ...this.letterArrSm, ...this.letterArrBg]
        break;  
      default:  
        throw new Error('Invalid type specified')
    }
    return this.doRandom(source)
  } 
  /**
   * 随机出规定长度的验证码
   * @param source
   * @returns array
   */
  private doRandom(source: (number | string)[]): (number | string)[] {  
    const len = this.options.len
    if (len === 0) return []
    const codeArr = Array.from({ length: len }, () => source[this.newInt(source.length)])
    const dealArr = codeArr.map(code => (typeof code === 'number' ? code : code.toUpperCase()))
    return dealArr
  }
  /**
   * 某范围内随机取整:传俩参会限制最大最小值(用来限制字体大小)
   * @param len 
   * @param max 
   * @returns number
   */
  private newInt(len: number, max?: number): number {
    if (max === undefined) {
      return Math.floor(Math.random() * len)
    }
    return Math.floor(len + Math.random() * (max - len))
  }
  /**
   * 用canvas画图
   * @param codeArr 验证码数组
   * @param selector 选择器
   */
  private drawImg(codeArr: (number | string)[], selector: string = '#canvas'): void {
    const canvas = document.querySelector(selector) as HTMLCanvasElement
    const width = this.options.width
    const height = this.options.height
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Canvas context not found')
    }
    context.fillStyle = '#eee'
    // 清空画布
    context.fillRect(0, 0, width, height)
    codeArr.forEach((code, i) => {
      // 字体颜色
      context.fillStyle = `rgb(${this.newInt(256)}, ${this.newInt(256)}, ${this.newInt(256)})`
      // 设置字体
      context.font = `${this.newInt(15, 25)}px Arial`
      context.fillText(String(code), i * 20 + 10, this.newInt(20, 40))
    })
    // 画斜线
    if (this.options.slash) {
      for (let i = 0; i < this.options.slachNum; i++) {
        context.beginPath()
        context.strokeStyle = `rgb(${this.newInt(256)}, ${this.newInt(256)}, ${this.newInt(256)})`
        context.moveTo(this.newInt(0, width), this.newInt(0, height))
        context.lineTo(this.newInt(0, width), this.newInt(0, height))
        context.stroke()
      }
    }
    // 画虚点
    if (this.options.point) {
      for (let i = 0; i < this.options.pointNum; i++) {
        context.fillStyle = `rgb(${this.newInt(256)}, ${this.newInt(256)}, ${this.newInt(256)})`
        context.beginPath()
        context.arc(this.newInt(0, width), this.newInt(0, height), 1, 0, 2 * Math.PI)
        context.fill()
      }
    }
  }
}
// 使用本class需要页面创建一个canvas,且id为canvas
export const verifyCode = new VerifyCode()
