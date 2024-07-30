/**
 * @Description: do some useful validate
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 08:50
 */
class Validator {
  constructor () {
    // 常用的校验类型: 手机，座机，邮箱，密码，日期，身份证，网址，税号，普通字符串
    // 判断布尔类型: isNum, isImg, isVideo, isAudio, isLetter, isNumLetter, isHanzi
    // 不是常规的label名称，校验时直接输入label名称即可，例如: verify (value, '地区', limitLength)
    this.typeArr = ['phone', 'telPhone', 'email', 'password', 'dateTime', 'identityCard', 'website', 'taxnum', 'isNum', 'isImg', 'isVideo', 'isAudio', 'isLetter', 'isNumLetter', 'isHanzi', 'default']
    this.typeKeyValue = [
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
  }

  // key: 校验参数名,默认是default; value: 传入值; limitLength: 校验的长度
  verify (value, key = 'default', limitLength) {
    let msg = ''
    let result = 1
    const labelName = this.parseKeyValue(key)
    switch (key) {
      // 手机号
      case 'phone':
        if (value) {
          if (/^1(3|4|5|6|7|8|9)\d{9}$/g.test(value)) {
            if (!limitLength || value.length <= limitLength) {
              result = 1
              msg = ''
            } else {
              result = 0
              msg = this.autoComplementLabelName(labelName, 4, limitLength)
            }
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 座机
      case 'telPhone':
        if (value) {
          if (/^0\d{2,3}-?\d{7,8}$/g.test(value)) {
            if (!limitLength || value.length <= limitLength) {
              result = 1
              msg = ''
            } else {
              result = 0
              msg = this.autoComplementLabelName(labelName, 4, limitLength)
            }
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 邮箱:允许汉字,字母，数字,域名只允许英文域名
      // 参考:https://juejin.im/post/6844903574778937358
      case 'email':
        if (value) {
          if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g.test(value)) {
            if (!limitLength || value.length <= limitLength) {
              result = 1
              msg = ''
            } else {
              result = 0
              msg = this.autoComplementLabelName(labelName, 4, limitLength)
            }
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 密码:包含数字,字母,特殊字符字少俩种组合
      case 'password':
        if (value) {
          let sum = 0
          // 匹配数字
          if (/[0-9]+/g.test(value)) { sum++ }
          // 匹配字母
          if (/[a-zA-Z]+/g.test(value)) { sum++ }
          // 匹配特殊字符
          if (/(!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|-){1,}/g.test(value)) { sum++ }
          if (sum >= 2) {
            if (!limitLength || value.length <= limitLength) {
              result = 1
              msg = ''
            } else {
              result = 0
              msg = this.autoComplementLabelName(labelName, 4, limitLength)
            }
          } else {
            result = 0
            const modifyStr = '密码须包含数字,字母,特殊字符字少俩种组合'
            msg = this.autoComplementLabelName(labelName, 3, modifyStr)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 日期格式
      case 'dateTime':
        if (value) {
          // 可能是invalid date，所以改用getTime判断
          const timeStamp = new Date(value).getTime()
          if (!isNaN(timeStamp)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 身份证:16或18位:
      // 参考:https://juejin.im/post/6844903575877861390
      case 'identityCard':
        if (value) {
          if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      case 'website':
        if (value) {
          if (/^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 税号: 阿拉伯数字或英文字母,15或18个字符
      case 'taxnum':
        if (value) {
          if (/^\w{1,}$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 是否数字
      case 'isNum':
        if (value) {
          if (/^\d{1,}$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 是否能预览的图片格式:jpg|jpeg|png|webp|gif|svg
      // 参考:https://www.cnblogs.com/langqq/p/11671785.html
      case 'isImg':
        if (value) {
          if (/(jpg|jpeg|png|webp|gif|svg|bmp|JPG|JPEG|PNG|WEBP|GIF|SVG|bmp)$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 是否视频
      // 参考:https://product.pconline.com.cn/itbk/software/dnwt/1504/6324496.html?_t_t_t=0.8887045967858285
      case 'isVideo':
        if (value) {
          if (/(wmv|asf|asx|rm|rmvb|mpg|mpeg|mpe|3gp|mov|mp4|m4v|avi|dat|mkv|flv|vob)$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      // 是否音频
      // 参考:https://baijiahao.baidu.com/s?id=1727868624889700721&wfr=spider&for=pc
      case 'isAudio':
        if (value) {
          if (/(mp3|wav|wma|ogg|mp2|flac|midi|ra|ape|acc|cda|mov)$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      case 'isLetter':
        if (value) {
          if (/^[a-zA-Z]+$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      case 'isNumLetter':
        if (value) {
          if (/^\w{1,}$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      case 'isHanzi':
        if (value) {
          if (/^[\u4e00-\u9fa5]+$/g.test(value)) {
            result = 1
            msg = ''
          } else {
            result = 0
            msg = this.autoComplementLabelName(labelName, 2)
          }
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
        break
      default: 
        if (value) {
          result = 1
          msg = ''
        } else {
          result = 0
          msg = this.autoComplementLabelName(labelName, 1)
        }
    }
    return [result, msg]
  }

  // 根据labelName自动拼全提示语,type 1：不能为空; 2:输入正确的; 3: 自定义提示; 4:长度限制
  autoComplementLabelName (labelName, type, modifyStr) {
    if (type === 1) {
      return `${labelName}不能为空`
    }
    if (type === 2) {
      return `请输入正确的${labelName}`
    }
    if (type === 3) {
      return modifyStr
    }
    if (type === 4) {
      return `${labelName}的最大长度为${modifyStr}`
    }
  }

  // 根据key解析出对应的value:有就返回解的label，否则返回原始key
  parseKeyValue (key) {
    let value = key
    this.typeKeyValue.forEach(tkv => {
      if (key === tkv.key) {
        value = tkv.value
      }
    })
    return value
  }
}
module.exports = new Validator()
