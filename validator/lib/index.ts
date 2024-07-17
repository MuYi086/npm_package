/**
 * @Description: do some useful validate
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 08:50
 */
class Validator {
  // 判断布尔类型: isNum, isImg, isVideo, isAudio, isLetter, isNumLetter, isHanzi
  private typeArr: string[] = [
    'phone', 'telPhone', 'email', 'password', 'dateTime', 'identityCard',
    'website', 'taxnum', 'isNum', 'isImg', 'isVideo', 'isAudio',
    'isLetter', 'isNumLetter', 'isHanzi', 'default'
  ]
  // 常用的校验类型: 手机，座机，邮箱，密码，日期，身份证，网址，税号，普通字符串
  // 不是常规的label名称，校验时直接输入label名称即可，例如: verify (value, '地区', limitLength)
  private typeKeyValue: { key: string, value: string }[] = [
    { key: 'phone', value: '手机号' },
    { key: 'telPhone', value: '座机号' },
    { key: 'email', value: '邮箱' },
    { key: 'password', value: '密码' },
    { key: 'dateTime', value: '日期' },
    { key: 'identityCard', value: '身份证号' },
    { key: 'website', value: '网址' },
    { key: 'taxnum', value: '税号' },
    { key: 'isNum', value: '数字' },
    { key: 'isImg', value: '图片' },
    { key: 'isVideo', value: '视频' },
    { key: 'isAudio', value: '音频' },
    { key: 'isLetter', value: '字母' },
    { key: 'isNumLetter', value: '数字字母' },
    { key: 'isHanzi', value: '汉字' }
  ]
  private validators: { [key: string]: RegExp | ((value: string) => boolean) } = {
    // 手机号
    phone: /^(1[3-9])\d{9}$/,
    // 座机
    telPhone: /^0\d{2,3}-?\d{7,8}$/,
    // 邮箱:允许汉字,字母，数字,域名只允许英文域名
    // 参考:https://juejin.im/post/6844903574778937358
    email: /^[a-z0-9]+([._-]*[a-z0-9])*@[a-z0-9]+([-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    // 密码:包含数字,字母,特殊字符字少俩种组合
    password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?]).{8,}$/,
    // 日期格式
    dateTime: (value: string) => !isNaN(new Date(value).getTime()),
    // 身份证:16或18位:
    // 参考:https://juejin.im/post/6844903575877861390
    identityCard: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])([0-2][1-9]|10|20|30|31)\d{3}[\dXx]$/,
    website: /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/,
    // 税号: 阿拉伯数字或英文字母,15或18个字符
    taxnum: /^\w{15,18}$/,
    // 是否数字
    isNum: /^\d+$/,
    // 是否能预览的图片格式:jpg|jpeg|png|webp|gif|svg
    // 参考:https://www.cnblogs.com/langqq/p/11671785.html
    isImg: /\.(jpg|jpeg|png|webp|gif|svg)$/i,
    // 是否视频
    // 参考:https://product.pconline.com.cn/itbk/software/dnwt/1504/6324496.html?_t_t_t=0.8887045967858285
    isVideo: /\.(wmv|asf|asx|rm|rmvb|mpg|mpeg|mpe|3gp|mov|mp4|m4v|avi|dat|mkv|flv|vob)$/i,
    // 是否音频
    // 参考:https://baijiahao.baidu.com/s?id=1727868624889700721&wfr=spider&for=pc
    isAudio: /\.(mp3|wav|wma|ogg|mp2|flac|midi|ra|ape|acc|cda|mov)$/i,
    isLetter: /^[a-zA-Z]+$/,
    isNumLetter: /^\w+$/,
    isHanzi: /^[\u4e00-\u9fa5]+$/
  }
  /**
   * 校验值
   * @param value 传入值
   * @param key 校验参数名
   * @param limitLength 校验的长度
   * @returns boolean
   */
  verify (value: string, key: string = 'default', limitLength?: number): [number, string] {
    const labelName = this.parseKeyValue(key)
    let msg = ''
    let result = 1
    if (this.validators[key]) {
      const validator = this.validators[key]
      if (typeof validator === 'function') {
        if (validator(value)) {
          result = 1
          msg = ''
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 2)
        }
      } else {
        if (validator.test(value)) {
          result = 1
          msg = ''
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 2)
        }
      }
      if (limitLength && value.length > limitLength) {
        result = 0
        msg = this.autoComplementLabelName(labelName, 4, limitLength.toString())
      }
    } else {
      if (value) {
        result = 1
        msg = ''
      } else {  
        result = 0
        msg = this.autoComplementLabelName(labelName, 1);  
      }  
    }  
    return [result, msg]
  }
  /**
   * 返回校验结果提示语
   * @param labelName 标签名
   * @param type 类型 1：不能为空 2:输入正确的 3: 自定义提示; 4:长度限制
   * @param modifyStr 自定义字符串
   * @returns string
   */
  private autoComplementLabelName (labelName: string, type: number, modifyStr?: string): string {  
    switch (type) {
      case 1:
        return `${labelName}不能为空`
      case 2:
        return `请输入正确的${labelName}`
      case 3:
        return modifyStr || ''
      case 4:
        return `${labelName}的最大长度为${modifyStr}`
      default:
        return ''
    }
  }
  /**
   * 根据key解析出对应的value:有就返回解的label，否则返回原始key
   * @param key 键
   * @returns string
   */
  private parseKeyValue(key: string): string {
    const entry = this.typeKeyValue.find(entry => entry.key === key)
    return entry ? entry.value : key
  }
}
export const validator = new Validator()
